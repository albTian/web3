# How to update after changing the smart contract
1. Deploy again using `npx hardhat run scripts/deploy.ts --network rinkeby`
2. Change `contractAddress` in `wavePortalAPI.ts` to be the new contract address we got from the step above in the terminal just like we did before the first time we deployed.
3. Get the updated abi file from `artifacts/contracts/WavePortal.sol/WavePortal.json` using `cp proj1/artifacts/contracts/WavePortal.sol/WavePortal.json proj1-frontend/src/utils/WavePortal.json`