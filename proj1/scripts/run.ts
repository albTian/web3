const hre = require("hardhat")

const main = async () => {
    const ethers = hre.ethers
    const [owner, randomPerson] = await ethers.getSigners()
    const waveContractFactory = await ethers.getContractFactory('WavePortal');
    
    // Constructor called here with .deploy
    const waveContract = await waveContractFactory.deploy("Hello world!");
    await waveContract.deployed();

    console.log(`Contract deployed to: ${waveContract.address}`);
    console.log(`Contract deployed by: ${owner.address}`);

    let waveTotal
    waveTotal = await waveContract.getTotalWaves()

    let waveTxn = await waveContract.wave()
    await waveTxn.wait()

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    waveTotal = await waveContract.getTotalWaves()
    console.log(`Wavetotal: ${waveTotal}`)

    await waveContract.setMessage("dogwater")
    let waveMessage = await waveContract.getMessage()
    console.log(`WaveMessage: ${waveMessage}`);
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
export {}