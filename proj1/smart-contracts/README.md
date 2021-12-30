# How to update after changing the SMART CONTRACT (project 1) OUT OF DATE
1. Test inside `smart-contracts` using `npx hardhat run scripts/run.ts`
2. Deploy again using `npx hardhat run scripts/deploy.ts --network rinkeby`
3. Change `contractAddress` in `frontend/src/api/wavePortalAPI.ts` to be the new `contractAddress`.
4. Get the updated abi file from `smart-contracts/artifacts/contracts/WavePortal.sol/WavePortal.json`
   1. Try `cp smart-contracts/artifacts/contracts/WavePortal.sol/WavePortal.json frontend/src/utils/WavePortal.json` to copy the file over
5. git commit and push