// const hre = require("hardhat")
import { HardhatEthersHelpers } from "@nomiclabs/hardhat-ethers/types";
import hre from "hardhat";

const main = async () => {
  // BASIC SETTERS
  const ethers = hre.ethers;
  const [owner, randomPerson] = await ethers.getSigners();
  const waveContractFactory = await ethers.getContractFactory("WavePortal");

  // Constructor called here with .deploy (needs to get funded)
  const waveContract = await waveContractFactory.deploy({
    value: ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();
  const contractAddress = waveContract.address;

  // Check addresses
  console.log(`Contract deployed to: ${contractAddress}`);
  console.log(`Contract deployed by: ${owner.address}`);

  // INTERACTIONS
  // Get contract balance
  let contractBalance = await ethers.provider.getBalance(contractAddress);
  console.log("Old balance:", ethers.utils.formatEther(contractBalance));

  // Send some waves from me and a randomAddress
  let waveTxn = await waveContract.wave("from me: hi");
  await waveTxn.wait(); // Wait for transaction to be mined...
  waveTxn = await waveContract.connect(randomPerson).wave("from another: sup");
  await waveTxn.wait(); // Wait for transaction to be mined...
  try {
    waveTxn = await waveContract.wave("THIS SHOULD FAIL");
    await waveTxn.wait(); // Wait for transaction to be mined...
    console.log("SPAM FILTER HAS FAILED");
  } catch (error) {
    console.log("Spam filter is working!");
  }

  // CHECKS
  // Check updated contract balance
  contractBalance = await ethers.provider.getBalance(contractAddress);
  console.log("New balance:", ethers.utils.formatEther(contractBalance));

  // Check all waves
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
