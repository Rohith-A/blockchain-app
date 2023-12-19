const {ethers} = require("hardhat");

async function deployScript(){

    console.log("Deploying the custom Order contract ::");

    const Order = await ethers.getContractFactory("contracts/Order.sol:Order");
    // const order = await Order.deploy("0xe457Ec43E7f4742a56C94f3f1952DE4126D2cF0D");
    const order = await Order.deploy("0x80e78BF39Fc8135d902955E3d63b865E8FC9eeB2");
    await order.deployed();

    console.log("The deployed custom contract address =>  ", order.address);
}

deployScript();
