import { ethers } from "ethers";
import abi from "../utils/WavePortal.json";

// Update this
const contractAddress = "0xe34E257Ac0a465dAE65a641B375D2e79D5e91200";
const contractABI = abi.abi;

// Helper function to initiate a wave. Returns the new total number of waves

// Input: (string) message of the wave
const wave = async (_message: string) => {
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

      // wave has signature
      // wave(string: message)
      const waveTxn = await wavePortalContract.wave(_message);
      console.log("Mining...", waveTxn.hash);

      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);
    } else {
      console.log("no etherium object lol");
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllWaves = async (): Promise<any> => {
  let allWaves = null;
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

      allWaves = await wavePortalContract.getAllWaves();

      /*
       * We only need address, timestamp, and message in our UI so let's
       * pick those out
       */
      let wavesCleaned: any[] = [];
      allWaves.forEach((wave: any) => {
        wavesCleaned.push({
          address: wave.waver,
          timestamp: new Date(wave.timestamp * 1000),
          message: wave.message,
        });
      });
      allWaves = wavesCleaned;
      console.log(`allWaves ${allWaves}`);
    } else {
      console.log("no etherium object lol");
    }
  } catch (error) {
    console.log(error);
  }
  return allWaves;
};

export { wave, getAllWaves };
