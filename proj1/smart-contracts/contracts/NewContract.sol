// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract NewContract {
    string message;

    constructor(string memory _message) {
        message = _message;
        console.log("Setting message to: ", message);
    }

    function setMessage(string memory _message) public {
        message = _message;
        console.log("Setting message to: ", message);
    }
}