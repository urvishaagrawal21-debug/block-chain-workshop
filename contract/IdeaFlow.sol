// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract IdeaFlow {
    struct Idea {
        uint256 id;
        string title;
        string description;
        address creator;
        uint256 votes;
        uint256 timestamp;
    }

    uint256 public ideaCount;

    mapping(uint256 => Idea) public ideas;

    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event IdeaCreated(
        uint256 indexed id,
        string title,
        address indexed creator,
        uint256 timestamp
    );

    event IdeaUpvoted(uint256 indexed id, address indexed voter);

    function createIdea(string memory title, string memory description) public {
        require(bytes(title).length > 0, "Title cannot be empty");

        ideaCount++;

        ideas[ideaCount] = Idea({
            id: ideaCount,
            title: title,
            description: description,
            creator: msg.sender,
            votes: 0,
            timestamp: block.timestamp
        });

        emit IdeaCreated(ideaCount, title, msg.sender, block.timestamp);
    }

    function upvote(uint256 id) public {
        require(id > 0 && id <= ideaCount, "Invalid idea");

        require(
            !hasVoted[id][msg.sender],
            "You have already voted for this idea"
        );

        hasVoted[id][msg.sender] = true;

        ideas[id].votes++;

        emit IdeaUpvoted(id, msg.sender);
    }
}
