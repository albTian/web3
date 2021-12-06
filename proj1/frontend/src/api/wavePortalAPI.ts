import { ethers } from "ethers";
import abi from "../utils/WavePortal.json";

// Update this
const contractAddress = "0xB1D4844C51DE0c13D12Ce9CeA6825deFffBbDc9D";
const contractABI = abi.abi;

// Helper function to initiate a wave. Returns the new total number of waves

// Input: (string) message of the wave
// Output: if the wave succeeded
const wave = async (_message: string): Promise<boolean> => {
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
      return true
    } else {
      console.log("no etherium object lol");
      return false
    }
  } catch (error) {
    console.log(error);
    return false
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
