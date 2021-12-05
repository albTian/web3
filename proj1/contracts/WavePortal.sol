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
    // uint256 totalWaves;
    Wave[] waves;

    constructor() {
        // Set instance variables (or dont)
        console.log("DOGWATER");
    }

    // Input: (string) message of the wave
    function wave(string memory _message) public returns (Wave memory) {
        // totalWaves += 1;
        console.log("%s sent a wave!", msg.sender);

        // Push a wave into our array
        Wave memory waveToPush = Wave(msg.sender, block.timestamp, _message);
        waves.push(waveToPush);

        // Emit a NewWave event to store it on the blockchain (???)
        emit NewWave(msg.sender, block.timestamp, _message);

        return waveToPush;
    }

    // function name() scope return() {}
    // DEP. Will no longer use
    // function getTotalWaveNum() public view returns (uint256) {
    //     return totalWaves;
    // }
    
    // to get the last message
    // DEP. also kinda dumb
    // function getLastMessage() public view returns (string memory) {
    //     return waves[waves.length - 1].message;
    // }

    // to get all waves (not just wave number)
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }
}
