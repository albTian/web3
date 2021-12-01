import { ethers } from "ethers";
import abi from "../utils/WavePortal.json";

const contractAddress = "0xA7B7E4ec4b5c3d7892690b6810F7F2C8a818d603";
const contractABI = abi.abi;

// Helper function to initiate a wave. Returns the new total number of waves
const wave = async (): Promise<number> => {
  let count = -1;
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const waveTxn = await wavePortalContract.wave();
      console.log("Mining...", waveTxn.hash);

      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);

      count = await wavePortalContract.getTotalWaves();
    //   console.log(`total of ${count.toNumber()} waves`);
    } else {
      console.log("no etherium object lol");
    }
  } catch (error) {
    console.log(error);
  }
  return count;
};

// Helper to get total number of waves. Returns number of waves
const getTotalWaves = async (): Promise<number> => {
  let count = null;
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      count = await wavePortalContract.getTotalWaves();
      console.log(`total num waves ${count.toNumber()}`);
    } else {
      console.log("no etherium object lol");
    }
  } catch (error) {
    console.log(error);
  }
  return count;
};

// Helper to send a message to the blockchain. Returns the new, updated message
const sendMessage = async (newMessage: string): Promise<string> => {
  let returnMessage = null;
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const waveTxn = await wavePortalContract.setMessage(newMessage);
      console.log("Mining...", waveTxn.hash);

      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);

      returnMessage = await wavePortalContract.getMessage();
      console.log(`Message is ${newMessage}`);
    } else {
      console.log("no etherium object lol");
    }
  } catch (error) {
    console.log(error);
  }
  return returnMessage;
};

// Helper to allow us to get the message in the contract. Returns the message
const getMessage = async (): Promise<string> => {
  let returnMessage = null;
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      returnMessage = await wavePortalContract.getMessage();
      console.log(`Message is ${returnMessage}`);
    } else {
      console.log("no etherium object lol");
    }
  } catch (error) {
    console.log(error);
  }
  return returnMessage;
};

export { wave, getTotalWaves, getMessage, sendMessage };
