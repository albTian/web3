// const hre = require("hardhat")
import hre from "hardhat";

const main = async () => {
  // Basic setters
  const ethers = hre.ethers;
  const [owner, randomPerson] = await ethers.getSigners();
  const waveContractFactory = await ethers.getContractFactory("WavePortal");

  // Constructor called here with .deploy
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();

  // Check addresses
  console.log(`Contract deployed to: ${waveContract.address}`);
  console.log(`Contract deployed by: ${owner.address}`);

  // Send some waves from me and a randomAddress
  let waveTxn = await waveContract.wave("from me: hi");
  await waveTxn.wait(); // Wait for transaction to be mined...
  waveTxn = await waveContract.connect(randomPerson).wave("from another: sup");
  await waveTxn.wait(); // Wait for transaction to be mined...

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);

  console.log(`We have ${allWaves.length} waves`);
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

// To get TS to shut up about block scoping
export {};
