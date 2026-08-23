let provider;
let signer;
let readContract;
let writeContract;
let currentAccount = "";

const els = {
    connectWalletBtn: document.getElementById("connectWalletBtn"),
    connectContractBtn: document.getElementById("connectContractBtn"),
    refreshIdeasBtn: document.getElementById("refreshIdeasBtn"),
    contractAddress: document.getElementById("contractAddress"),
    networkStatus: document.getElementById("networkStatus"),
    walletStatus: document.getElementById("walletStatus"),
    contractStatus: document.getElementById("contractStatus"),
    txStatus: document.getElementById("txStatus"),
    ideaForm: document.getElementById("ideaForm"),
    ideaTitle: document.getElementById("ideaTitle"),
    ideaDescription: document.getElementById("ideaDescription"),
    ideasList: document.getElementById("ideasList")
};

// We centralize status rendering so beginners can clearly see app feedback.
function setStatus(element, message, type = "muted") {
    element.textContent = message;
    element.classList.remove("muted", "success", "error");
    element.classList.add(type);
}

function shortAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function txLink(hash) {
    return `${CONFIG.explorerUrl}/tx/${hash}`;
}

function addressLink(address) {
    return `${CONFIG.explorerUrl}/address/${address}`;
}

function isSepolia(chainId) {
    return chainId?.toLowerCase() === CONFIG.chainId;
}

function formatTimestamp(unixSeconds) {
    return new Date(Number(unixSeconds) * 1000).toLocaleString();
}

function setTxMessage(message, type = "muted", hash = "") {
    if (!hash) {
        setStatus(els.txStatus, message, type);
        return;
    }
    els.txStatus.innerHTML = `${message} <a href="${txLink(hash)}" target="_blank" rel="noopener noreferrer">View on Etherscan</a>`;
    els.txStatus.classList.remove("muted", "success", "error");
    els.txStatus.classList.add(type);
}

async function ensureProvider() {
    if (!window.ethereum) {
        setStatus(els.walletStatus, "MetaMask not found. Please install MetaMask to continue.", "error");
        return false;
    }

    // BrowserProvider is required because MetaMask injects window.ethereum in the browser.
    provider = new ethers.BrowserProvider(window.ethereum);
    return true;
}

async function refreshNetworkStatus() {
    if (!provider) {
        setStatus(els.networkStatus, "Network: Not connected", "muted");
        return false;
    }

    const network = await provider.getNetwork();
    const chainHex = `0x${network.chainId.toString(16)}`;
    if (!isSepolia(chainHex)) {
        setStatus(els.networkStatus, "Please switch MetaMask to Sepolia.", "error");
        return false;
    }

    setStatus(els.networkStatus, `Network: ${CONFIG.networkName}`, "success");
    return true;
}

async function connectWallet() {
    const hasProvider = await ensureProvider();
    if (!hasProvider) return;

    try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        signer = await provider.getSigner();
        currentAccount = await signer.getAddress();
        setStatus(els.walletStatus, `Wallet: ${shortAddress(currentAccount)} connected`, "success");

        const onCorrectNetwork = await refreshNetworkStatus();
        if (onCorrectNetwork && readContract) {
            writeContract = readContract.connect(signer);
        }
    } catch (_error) {
        setStatus(els.walletStatus, "Wallet connection was rejected or failed.", "error");
    }
}

async function connectContract() {
    const hasProvider = await ensureProvider();
    if (!hasProvider) return;

    const inputAddress = els.contractAddress.value.trim();
    if (!ethers.isAddress(inputAddress)) {
        setStatus(els.contractStatus, "Please enter a valid contract address.", "error");
        return;
    }

    const onCorrectNetwork = await refreshNetworkStatus();
    if (!onCorrectNetwork) return;

    try {
        readContract = new ethers.Contract(inputAddress, IDEAFLOW_ABI, provider);

        // Read operation: this call does not change blockchain state or require gas.
        // We use it to verify that the address behaves like an IdeaFlow contract.
        await readContract.ideaCount();

        if (signer) {
            writeContract = readContract.connect(signer);
        }

        localStorage.setItem("ideaflow_contract_address", inputAddress);
        setStatus(els.contractStatus, `Contract connected: ${shortAddress(inputAddress)}`, "success");
        await loadIdeas();
    } catch (_error) {
        setStatus(els.contractStatus, "Could not connect contract. Confirm address and ABI/network.", "error");
    }
}

async function loadIdeas() {
    if (!readContract) {
        els.ideasList.innerHTML = "<p class='muted'>Enter your deployed IdeaFlow contract address.</p>";
        return;
    }

    try {
        const count = Number(await readContract.ideaCount());
        if (count === 0) {
            els.ideasList.innerHTML = "<p class='muted'>No ideas yet. Be the first to submit one.</p>";
            return;
        }

        const cards = [];
        for (let id = count; id >= 1; id -= 1) {
            const idea = await readContract.ideas(id);

            let userHasVoted = false;
            if (currentAccount && readContract) {
                userHasVoted = await readContract.hasVoted(id, currentAccount);
            }

            cards.push(`
                <article class="idea-card">
                    <h4>${escapeHtml(idea.title)}</h4>
                    <p>${escapeHtml(idea.description)}</p>
                    <div class="idea-meta">
                        <span>Creator: <a href="${addressLink(idea.creator)}" target="_blank" rel="noopener noreferrer">${shortAddress(idea.creator)}</a></span>
                        <span>Created: ${formatTimestamp(idea.timestamp)}</span>
                        <span>Votes: ${idea.votes.toString()}</span>
                    </div>
                    <div class="idea-actions">
                        <button 
                            class="btn ${userHasVoted ? 'btn-outline' : 'btn-primary'}" 
                            data-upvote-id="${idea.id}" 
                            ${(!writeContract || userHasVoted) ? "disabled" : ""}
                        >
                            ${userHasVoted ? "Already Voted" : "Upvote"}
                        </button>
                        <small class="muted">${userHasVoted ? "You supported this idea" : "Transaction signed in MetaMask"}</small>
                    </div>
                </article>
            `);
        }

        els.ideasList.innerHTML = cards.join("");
    } catch (error) {
        console.error("Error loading ideas:", error);
        els.ideasList.innerHTML = "<p class='error'>Failed to read ideas from blockchain.</p>";
    }
}

async function submitIdea(event) {
    event.preventDefault();

    if (!writeContract) {
        setTxMessage("Connect your wallet and contract first.", "error");
        return;
    }

    const title = els.ideaTitle.value.trim();
    const description = els.ideaDescription.value.trim();

    if (!title || !description) {
        setTxMessage("Please fill in both title and description.", "error");
        return;
    }

    // Grab the submit button so we can disable it
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Processing...";

    try {
        // Write operation: this changes on-chain state, so MetaMask asks for a signature.
        const tx = await writeContract.createIdea(title, description);
        setTxMessage("Waiting for blockchain confirmation...", "muted", tx.hash);

        await tx.wait(); // Waits for the transaction to be mined

        setTxMessage("Your transaction was confirmed.", "success", tx.hash);
        els.ideaForm.reset();
        await loadIdeas();
    } catch (error) {
        // Log the exact error to the console for debugging
        console.error("Transaction Error:", error);

        // Give more specific feedback based on the error
        if (error.code === "ACTION_REJECTED") {
            setTxMessage("Transaction was rejected in MetaMask.", "error");
        } else {
            setTxMessage("Network timeout or error. Check wallet/explorer to confirm status.", "error");
        }
    } finally {
        // Always re-enable the button, whether it succeeds or fails
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Idea";
    }
}

async function upvoteIdea(id) {
    if (!writeContract) {
        setTxMessage("Connect your wallet and contract first.", "error");
        return;
    }

    try {
        // Write operation: upvoting is a transaction that updates blockchain state.
        const tx = await writeContract.upvote(id);
        setTxMessage("Waiting for blockchain confirmation...", "muted", tx.hash);
        await tx.wait();
        setTxMessage("Your transaction was confirmed.", "success", tx.hash);
        await loadIdeas();
    } catch (_error) {
        setTxMessage("Transaction failed or was rejected.", "error");

        if (error.message.includes("already voted") || error.reason === "You have already voted for this idea") {
            setTxMessage("You have already voted for this idea.", "error");
        } else if (error.code === "ACTION_REJECTED") {
            setTxMessage("Transaction was rejected in MetaMask.", "error");
        } else {
            setTxMessage("Transaction failed. See console for details.", "error");
        }
    }
}

function escapeHtml(text) {
    const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

function setupWalletListeners() {
    if (!window.ethereum) return;

    window.ethereum.on("accountsChanged", async (accounts) => {
        if (!accounts.length) {
            signer = undefined;
            writeContract = undefined;
            currentAccount = "";
            setStatus(els.walletStatus, "Wallet disconnected. Connect your wallet to continue.", "muted");
            return;
        }

        await ensureProvider();
        signer = await provider.getSigner();
        currentAccount = accounts[0];
        setStatus(els.walletStatus, `Wallet: ${shortAddress(currentAccount)} connected`, "success");

        if (readContract) {
            writeContract = readContract.connect(signer);
        }
        await loadIdeas();
    });

    window.ethereum.on("chainChanged", async () => {
        await ensureProvider();
        const ok = await refreshNetworkStatus();
        if (!ok) {
            writeContract = undefined;
            return;
        }

        if (signer && readContract) {
            writeContract = readContract.connect(signer);
            await loadIdeas();
        }
    });
}

function loadSavedContractAddress() {
    const saved = localStorage.getItem("ideaflow_contract_address") || CONFIG.defaultContractAddress || "";
    if (saved) {
        els.contractAddress.value = saved;
    }
}

function setupEvents() {
    els.connectWalletBtn.addEventListener("click", connectWallet);
    els.connectContractBtn.addEventListener("click", connectContract);
    els.refreshIdeasBtn.addEventListener("click", loadIdeas);
    els.ideaForm.addEventListener("submit", submitIdea);

    els.ideasList.addEventListener("click", (event) => {
        const target = event.target;
        if (target instanceof HTMLButtonElement && target.dataset.upvoteId) {
            upvoteIdea(Number(target.dataset.upvoteId));
        }
    });
}

async function loadChallenge(fileName) {
    const contentDiv = document.getElementById("challengeContent");
    contentDiv.innerHTML = "<p class='muted'>Loading...</p>";

    try {
        // Added ./ to force relative pathing
        const response = await fetch(`./challenges/${fileName}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const markdownText = await response.text();
        contentDiv.innerHTML = marked.parse(markdownText);
    } catch (error) {
        console.error("Error loading challenge:", error);
        contentDiv.innerHTML = `<p class='error'>Failed to load ${fileName}. Open developer tools (F12) to see the exact path it tried to fetch.</p>`;
    }
}

function setupChallengeTabs() {
    const tabs = document.getElementById("challengeTabs");
    if (!tabs) return;

    tabs.addEventListener("click", (event) => {
        const target = event.target;
        if (target.tagName === "BUTTON" && target.dataset.file) {
            // Update active styling
            document.querySelectorAll("#challengeTabs .btn").forEach(btn => {
                btn.classList.remove("btn-primary");
                btn.classList.add("btn-outline");
            });
            target.classList.remove("btn-outline");
            target.classList.add("btn-primary");

            // Load the markdown file
            loadChallenge(target.dataset.file);
        }
    });
}

// Update your init() function to call setupChallengeTabs()
async function init() {
    loadSavedContractAddress();
    setupEvents();
    setupWalletListeners();
    setupChallengeTabs();

    if (!window.ethereum) {
        setStatus(els.walletStatus, "MetaMask not found. Please install MetaMask to continue.", "error");
        setStatus(els.networkStatus, "Network: Not connected", "muted");
        return;
    }

    await ensureProvider();
    await refreshNetworkStatus();

    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
        signer = await provider.getSigner();
        currentAccount = accounts[0];
        setStatus(els.walletStatus, `Wallet: ${shortAddress(currentAccount)} connected`, "success");
    } else {
        setStatus(els.walletStatus, "Connect your wallet to continue.", "muted");
    }

    if (els.contractAddress.value.trim()) {
        await connectContract();
    }
}

init();
