import hre from "hardhat";

const main = async () => {
  const ethers = hre.ethers;
  const nftContractFactory = await ethers.getContractFactory("NFTContract");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  // Call the function.
  let txn = await nftContract.mint();
  // Wait for it to be mined.
  await txn.wait();
  console.log("Minted NFT #1")
  
  // Mint another NFT for fun.
  txn = await nftContract.mint();
  // Wait for it to be mined.
  await txn.wait();
  console.log("Minted NFT #2")
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
