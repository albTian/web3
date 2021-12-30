// // SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// // We first import some OpenZeppelin Contracts.
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

// We need to import the helper functions from the contract that we copy/pasted.
import "base64-sol/base64.sol";

// How to mint your own NFTs
contract NFTContract is ERC721URIStorage {
    // The counter to keep trak of tokenIds
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // First argument is the name
    constructor() ERC721("SquareNFT", "lol") {
        console.log("creating the NFT contract...");
    }

    // This is our SVG code. All we need to change is the word that's displayed. Everything else stays the same.
    // So, we make a baseSvg variable here that all our NFTs can use.
    string baseSvg =
        "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

    // I create three arrays, each with their own theme of random words.
    // Pick some random funny words, names of anime characters, foods you like, whatever!
    string[] firstWords = ["zyyz", "baki", "goku", "vegeta", "yujiro", "cbum"];
    string[] secondWords = ["2nd0", "2nd1", "2nd2", "2nd3", "2nd4", "2nd5"];
    string[] thirdWords = ["3rd0", "3rd1", "3rd2", "3rd3", "3rd4", "3rd5"];

    // Generic function to pick random word from array
    function pickRandomWord(
        uint256 tokenId,
        string memory seed,
        string[] memory array
    ) internal pure returns (string memory) {
        // I seed the random generator. More on this in the lesson.
        uint256 rand = random(
            string(abi.encodePacked(seed, Strings.toString(tokenId)))
        );
        // Squash the # between 0 and the length of the array to avoid going out of bounds.
        rand = rand % array.length;
        return array[rand];
    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    //  public endpoint to mint the NFT
    function mint() public {
        // Gets current id, need to increment at the end to aviod duplicates
        uint256 newItemId = _tokenIds.current();

        // We go and randomly grab one word from each of the three arrays.
        string memory first = pickRandomWord(
            newItemId,
            "FIRST_WORD",
            firstWords
        );
        string memory second = pickRandomWord(
            newItemId,
            "SECOND_WORD",
            secondWords
        );
        string memory third = pickRandomWord(
            newItemId,
            "THIRD_WORD",
            thirdWords
        );
        string memory combinedWord = string(
            abi.encodePacked(first, second, third)
        );

        string memory finalSvg = string(
            abi.encodePacked(baseSvg, combinedWord, "</text></svg>")
        );

        // Get all the JSON metadata in place and base64 encode it.
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        // We set the title of our NFT as the generated word.
                        combinedWord,
                        '", "description": "A highly acclaimed collection of squares.", "image": "data:image/svg+xml;base64,',
                        // We add data:image/svg+xml;base64 and then append our base64 encode our svg.
                        Base64.encode(bytes(finalSvg)),
                        '"}'
                    )
                )
            )
        );

        // Just like before, we prepend data:application/json;base64, to our data.
        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        console.log("\n--------------------");
        console.log(finalTokenUri);
        console.log("--------------------\n");

        // Actually mint the NFT to the sender using msg.sender.
        _safeMint(msg.sender, newItemId);

        // Set the NFTs data.
        // ACTUAL NFT DATA LIVES HERE
        _setTokenURI(newItemId, finalTokenUri);

        // Increment the counter for when the next NFT is minted.
        _tokenIds.increment();

        console.log(
            "An NFT w/ ID %s has been minted to %s",
            newItemId,
            msg.sender
        );
    }
}
