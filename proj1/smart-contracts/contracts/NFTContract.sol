// // SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// // We first import some OpenZeppelin Contracts.
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

// How to mint your own NFTs
contract NFTContract is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("SquareNFT", "lol") {
        console.log("creating the NFT contract...");
    }

    function mint() public {
        // Gets current id, need to increment at the end to aviod duplicates
        uint256 newItemId = _tokenIds.current();

        // Actually mint the NFT to the sender using msg.sender.
        _safeMint(msg.sender, newItemId);

        // Set the NFTs data.
        // ACTUAL NFT DATA LIVES HERE
        _setTokenURI(newItemId, "https://jsonkeeper.com/b/VK4S");

        // Increment the counter for when the next NFT is minted.
        _tokenIds.increment();

        console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);
    }
}