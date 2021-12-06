// const hre = require("hardhat");
import { HardhatEthersHelpers } from "@nomiclabs/hardhat-ethers/types";
import hre from "hardhat";

// List of contracts to deploy (doesn't support contracts with non empty constructors atm)
// const contractList: string[] = ["WavePortal"];
// Can deploy multiple contracts here, but need to keep track of their individual addresses (??)
// contractList.map(async (contract) => {
// });

const main = async () => {
  // SETTERS
  const ethers = hre.ethers;
  const [deployer] = await ethers.getSigners();
  const accountBalance = await deployer.getBalance();
  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const contract = "WavePortal";
  console.log(`Deploying contract: ${contract} ...`);

  // INTERACTIONS
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.001"),
  });

  await waveContract.deployed();

  // CHECKS
  console.log(`${contract} address: ${waveContract.address}\n`);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();

export {};
