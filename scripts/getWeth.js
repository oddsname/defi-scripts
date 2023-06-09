const { ethers, network, getNamedAccounts } = require("hardhat");

const AMOUNT = ethers.utils.parseEther('0.02');

const getWeth = async () => {
    const { deployer } = await getNamedAccounts();
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

getWeth()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

module.exports = {
    getWeth,
}