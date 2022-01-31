const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const WaveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const WaveContract = await WaveContractFactory.deploy();
    await WaveContract.deployed();

    console.log(" Contract deployed to: ", WaveContract.address);
    console.log(" Contract deployed by: ", owner.address);

    let waveCount;
    waveCount = await WaveContract.getTotalWaves();

    let waveTxn = await WaveContract.wave();
    await waveTxn.wait();

    waveCount = await WaveContract.getTotalWaves();

    waveTxn = await WaveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    waveCount = await WaveContract.getTotalWaves();
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();
