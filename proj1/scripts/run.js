const main = async () => {
    const ethers = hre.ethers
    const [owner, randomPerson] = await ethers.getSigners()
    const waveContractFactory = await ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
    console.log(`Contract deployed to: ${waveContract.address}`);
    console.log(`Contract deployed by: ${owner.address}`);

    let waveTotal
    waveTotal = await waveContract.getTotalWaves()

    let waveTxn = await waveContract.wave()
    await waveTxn.wait()

    waveTotal = await waveContract.getTotalWaves()
    console.log(`Wavetotal: ${waveTotal}`)
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