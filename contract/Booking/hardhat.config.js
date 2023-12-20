require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const {
  SEPOLIA_NETWROK, 
  PRIVATE_KEY, 
  SEPOLIA_API,
  MUMBAI_NETWROK,
  MUMBAI_API
      } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.18",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      }
    ],
  },
  networks: {
    sepolia: {
      url: SEPOLIA_NETWROK,
      accounts: [
        PRIVATE_KEY,
      ],
    },
    mumbai: {
      url: MUMBAI_NETWROK,
      accounts: [
        PRIVATE_KEY,
      ],
    }
  },  
  etherscan : {
    apiKey : {
      polygonMumbai:MUMBAI_API,
      // sepolia:SEPOLIA_API,
    },
  },
  
};
