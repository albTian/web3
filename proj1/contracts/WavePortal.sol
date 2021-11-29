// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

// Class like structure
contract WavePortal {
    // Instance variables
    uint256 totalWaves;
    string mainMessage;

    constructor(string memory _mainMessage) {
        // Set instance variables (or dont)
        mainMessage = _mainMessage;
        console.log("I might not be smart but my contract is: %s", mainMessage);
    }

    function wave() public {
        totalWaves += 1;
        console.log("%s sent a wave!", msg.sender);
    }

    // function name() scope return() {}
    function getTotalWaves() public view returns(uint256) {
        console.log("We have %d total waves", totalWaves);
        return totalWaves;
    }

    function setMessage(string memory _message) public {
        mainMessage = _message;
    }

    function getMessage() public view returns(string memory) {
        return mainMessage;
    }
}
