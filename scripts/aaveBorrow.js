const { ethers, network, getNamedAccounts } = require("hardhat");

async function getLendingPool(deployer) {
    //Ethereum mainnet LendingPoolAddressesProvider contract: 0xb53c1a33016b2dc2ff3653530bff1848a515c8c5
    const lendingPoolAddressesProvider = await ethers.getContractAt('ILendingPoolAddressesProvider', '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5', deployer)
    const lendingPoolAddress = await lendingPoolAddressesProvider.getLendingPool();
    const lendingPool = await ethers.getContractAt("ILendingPool", lendingPoolAddress, deployer);

    return lendingPool;
}

const getWeth = async (deployer) => {
    AMOUNT = ethers.utils.parseEther('0.02');
    //mainnet WETH address
    //0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
    //we are using mainet address beacuse hardhat has the way to safely test mainet code by forking it and pretending to be mainnet node
    //we can fork a blockchain
    const iWeth = await ethers.getContractAt('IWeth', '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', deployer)
    const tx = await iWeth.deposit({value: AMOUNT});
    await tx.wait(1);
    const wethBalance = await iWeth.balanceOf(deployer);

    console.log(`Got ${wethBalance.toString()} WETH`)
}

const main = async () => {
    const { deployer } = await getNamedAccounts();
    await getWeth(deployer);
    const lendingPool = await getLendingPool(deployer);

    console.log("Lending Pool address " + lendingPool.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })