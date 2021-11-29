// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    // Internal state (kinda OOP)
    uint256 totalWaves;

    constructor() {
        console.log("I might not be smart but my contract is");
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
}
