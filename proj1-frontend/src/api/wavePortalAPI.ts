import { ethers } from "ethers";
import abi from "../utils/WavePortal.json";

const contractAddress = "0x2597d49588c0B67e3f35856Ffbf3B19079CeAD20";
const contractABI = abi.abi;

// Helper function to initiate a wave. Returns the new total number of waves

// Input: (string) message of the wave
// Output: (wave) the newly created wave
const wave = async (_message: string): Promise<any> => {
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

      // wave has signature
      // wave(string: message)
      const waveTxn = await wavePortalContract.wave(_message);
      console.log("Mining...", waveTxn.hash);

      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);

      // count = await wavePortalContract.getTotalWaveNum();
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
// DEP
// const getTotalWaveNum = async (): Promise<number> => {
//   let count = null;
//   try {
//     const { ethereum } = window;
//     if (ethereum) {
//       const provider = new ethers.providers.Web3Provider(ethereum);
//       const signer = provider.getSigner();
//       const wavePortalContract = new ethers.Contract(
//         contractAddress,
//         contractABI,
//         signer
//       );

//       count = await wavePortalContract.getTotalWaveNum();
//       console.log(`total num waves ${count.toNumber()}`);
//     } else {
//       console.log("no etherium object lol");
//     }
//   } catch (error) {
//     console.log(error);
//   }
//   return count;
// };

// Helper to send a message to the blockchain. Returns the new, updated message
// DEP. no longer exists
// const sendMessage = async (newMessage: string): Promise<string> => {
//   let returnMessage = null;
//   try {
//     const { ethereum } = window;
//     if (ethereum) {
//       const provider = new ethers.providers.Web3Provider(ethereum);
//       const signer = provider.getSigner();
//       const wavePortalContract = new ethers.Contract(
//         contractAddress,
//         contractABI,
//         signer
//       );

//       const waveTxn = await wavePortalContract.setMessage(newMessage);
//       console.log("Mining...", waveTxn.hash);

//       await waveTxn.wait();
//       console.log("Mined -- ", waveTxn.hash);

//       returnMessage = await wavePortalContract.getMessage();
//       console.log(`Message is ${newMessage}`);
//     } else {
//       console.log("no etherium object lol");
//     }
//   } catch (error) {
//     console.log(error);
//   }
//   return returnMessage;
// };

// Helper to allow us to get the message in the contract. Returns the first message in the wavePortal array
// DEP
// const getLastMessage = async (): Promise<string> => {
//   let returnMessage = null;
//   try {
//     const { ethereum } = window;
//     if (ethereum) {
//       const provider = new ethers.providers.Web3Provider(ethereum);
//       const signer = provider.getSigner();
//       const wavePortalContract = new ethers.Contract(
//         contractAddress,
//         contractABI,
//         signer
//       );

//       returnMessage = await wavePortalContract.getLastMessage();
//       console.log(`Message is ${returnMessage}`);
//     } else {
//       console.log("no etherium object lol");
//     }
//   } catch (error) {
//     console.log(error);
//   }
//   return returnMessage;
// };

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
