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
    uint256 totalWaves;
    Wave[] waves;

    constructor() {
        // Set instance variables (or dont)
        console.log("DOGWATER");
    }

    function wave(string memory _message) public {
        totalWaves += 1;
        console.log("%s sent a wave!", msg.sender);

        // Push a wave into our array
        waves.push(Wave(msg.sender, block.timestamp, _message));

        // Emit a NewWave event to store it on the blockchain (???)
        emit NewWave(msg.sender, block.timestamp, _message);
    }

    // function name() scope return() {}
    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves", totalWaves);
        return totalWaves;
    }

    // function setMessage(string memory _message) public {
    //     mainMessage = _message;
    // }

    function getMessage() public view returns (string memory) {
        return waves[0].message;
    }

    function getAllWaves() public view returns (Wave[] memory) {
        console.log("returning waves");
        return waves;
    }
}
