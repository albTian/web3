// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

// Class like structure
contract WavePortal {
    // Event magic, to store it on the blockchain (???)
    event NewWave(address indexed from, uint256 timestamp, string message);

    // Define a new sctruct, wave
    struct Wave {
        address waver;
        uint256 timestamp;
        string message;
        // string url;
    }

    // Instance variables
    Wave[] waves;

    constructor() payable {
        // Set instance variables (or dont)
        console.log("DOGWATER");
    }

    // Input: (string) message of the wave
    function wave(string memory _message) public {
        // totalWaves += 1;
        // console.log("%s sent a wave!", msg.sender);

        // Push a wave into our array
        Wave memory waveToPush = Wave(msg.sender, block.timestamp, _message);
        waves.push(waveToPush);

        // Emit a NewWave event to store it on the blockchain (???)
        emit NewWave(msg.sender, block.timestamp, _message);

        // Check if I have enough eth to give them any money
        uint256 prizeAmount = 0.0001 ether;
        require(prizeAmount <= address(this).balance, "I'm poor");

        // Actually withdraw the money from my account and send it
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");
    }

    // to get all waves (not just wave number)
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }
}
