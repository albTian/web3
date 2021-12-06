// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

// Class like structure
contract WavePortal {
    // Instance variables
    Wave[] waves;
    uint256 private seed;
    mapping(address => uint256) public lastWavedAt;


    // Event magic, to store it on the blockchain (???)
    event NewWave(address indexed from, uint256 timestamp, string message);

    // Define a new sctruct, wave
    struct Wave {
        address waver;
        uint256 timestamp;
        string message;
        // string url;
    }

    constructor() payable {
        // Set instance variables (or dont)
        console.log("DOGWATER");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    // Input: (string) message of the wave
    function wave(string memory _message) public {
        // console.log("%s sent a wave!", msg.sender);
        // Check that they waved at least 1 minute ago
        require(
            lastWavedAt[msg.sender] + 1 minutes < block.timestamp,
            "Can only wave once every minute"
        );
        lastWavedAt[msg.sender] = block.timestamp;

        // Push a wave into our array
        Wave memory waveToPush = Wave(msg.sender, block.timestamp, _message);
        waves.push(waveToPush);

        // Randomly send ETH
        seed = (block.difficulty + block.timestamp + seed) % 100;
        if (seed >= 50) {
            // Check if I have enough eth to give them any money
            uint256 prizeAmount = 0.0001 ether;
            require(prizeAmount <= address(this).balance, "I'm poor");

            // Actually withdraw the money from my account and send it
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");

            console.log("You won and got some eth!");
        }

        // Emit a NewWave event to store it on the blockchain (???)
        emit NewWave(msg.sender, block.timestamp, _message);
    }

    // to get all waves (not just wave number)
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }
}
