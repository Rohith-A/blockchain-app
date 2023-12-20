const {ethers} = require("hardhat");

async function deployScript(){

    console.log("Deploying the custom Token contract ::");

    const Token = await ethers.getContractFactory("contracts/Token.sol:Token");
    const token = await Token.deploy("100000");
    await token.deployed();

    console.log("The deployed custom Token contract address =>  ", token.address);
}

deployScript();
