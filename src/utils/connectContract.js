// import Web3 from "web3";
// import orderAbi from './orderAbi.json';
// import tockenAbi from './tokenAbi.json';

// const metamask = window.ethereum
// const metaMaskErr = "Metamask is required for payments";
// let oneEthWei = 1000000000000000000n
// let web3js = new Web3(metamask); 
// let minimumEthTransfer = 0.01
// let ContractABI = orderAbi;
// let isRegisterInitialized = false;
// let registerContract;

// let isLoanInitialized = false;
// let loanContract;

// const contractAddress = "0x4b5D5a591F953bBc85C39509d8C3aC10f5e75d67";
// const contract = new web3js.eth.Contract(ContractABI,contractAddress);

// console.log('CONTRACT',contract);
// export async function getInrToWei(bookingCost){

//     const resp = await fetch("https://api.coinbase.com/v2/exchange-rates?currency=ETH");
//     const exchangeRates = await resp.json();
//     console.log(exchangeRates);
//     return web3js.utils.toWei(((bookingCost / exchangeRates.data.rates.INR) + minimumEthTransfer).toString(),"ether");


// }

// let account;
// export const connectMetamask = async () => {
//     if(window.ethereum !== "undefined") {
//         const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
//         account = accounts[0];
//         // document.getElementById("userArea").innerHTML = `User Account: ${account}`;
//     }
// }

// export const contractConnect = async () => {
//     const ABI = orderAbi;
//     const Address = "0x4b5D5a591F953bBc85C39509d8C3aC10f5e75d67"; // Taking Address from Remix 
//     window.web3 = await new Web3(window.ethereum);
//     window.contract = await new window.web3.eth.Contract(ABI, Address);
//     console.log(await new window.web3.eth.Contract(ABI, Address))
//     // document.getElementById("contractArea").innerHTML = "Connected to Contract"; // calling the elementID above
// }
// export const detectCurrentProvider = (conn_provider = 'metamask') => {
//     let provider;
//     if (window.ethereum) {
//       provider = window.ethereum;
//     }
//     if (provider &&
//       provider.providers &&
//       provider.providers.length &&
//       conn_provider === 'metamask') {
//       let m_provider = window.ethereum.providers.find((x) => x.isMetaMask);
//       if (m_provider) provider = m_provider;
//     }
//     return provider;
//   };

//   // main: initiate the metamask wallet (used it in header part)
//   export const initiateNetwork = async (provider) => {
//     try {
//       const currentProvider = detectCurrentProvider(provider);
//       if (currentProvider) {
//         await currentProvider.request({ method: 'eth_requestAccounts' });
//         const web3 = new Web3(currentProvider);
//         const userAccount = await web3.eth.getAccounts();
//         const chainId = await web3.eth.getChainId();
//         const networkId = await web3.eth.net.getId();

//         if (userAccount.length === 0) {
//           return new Error('Please connect to Metamask');
//         } else {
//           const account = userAccount[0];
//           let balance = await web3.eth.getBalance(account); // Get wallet balance
//           balance = web3.utils.fromWei(balance, 'ether'); //Convert balance to wei

//           return { balance, account, chainId, networkId };
//         }
//       } else return new Error('Non-Ethereum browser detected. You should consider trying Metamask')
//     } catch (err) {
//       console.log(err);
//       return new Error(
//         'There was an error fetching your accounts. Make sure your Ethereum client is configured correctly.'
//       );
//     }
//   }

//   // common: initiate Register contract

// export const initiateRegisterContract = async (conn_provider) => {
//     let provider = detectCurrentProvider(conn_provider)

//     if (provider) {
//       const web3 = new Web3(provider);
//       registerContract = new web3.eth.Contract(
//         orderAbi,
//         process.env.REACT_APP_REGISTER_CONTRACT
//       );

//       isRegisterInitialized = true;
//     }
//   }

// export const getContractAccount = async () => {
//     const data = await window.contract.methods.getAddress().call();
//     // document.getElementById("contractAccount").innerHTML = `Contract Account: ${data}`;
// }

// export const getBalanceApple = async () => { // const getBalanceApple is the HTML function & .contract.getBalance is the smart contract function
//     const data = await window.contract.methods.getBalance().call();
//     console.log(data)
//     // document.getElementById("balanceArea").innerHTML = `Contract Balance: ${data}`;
// }

// export const depositContract = async () => {
//     const amount = document.getElementById("depositInput").value;
//     await window.contract.methods.deposit().send({from: account, value: amount});
// }

// export const withdraw = async () => {
//     const amount = document.getElementById("amountInput").value;
//     const address = document.getElementById("addressInput").value;
//     await window.contract.methods.withdraw(address, amount).send({from: account});
// }





import Web3 from "web3";
import orderAbi from './orderAbi.json';
import tockenAbi from './tokenAbi.json';

let isTockenInitialized = false;
let tockenContract;

let isOrderInitialized = false;
let orderContract;

// let isVotingInitialized = false;
// let votingContract;

// let isTokenInitialized = false;
// let tokenContract;

// internal: detect the wallet provider
export const detectCurrentProvider = (conn_provider = 'metamask') => {
    let provider;
    if (window.ethereum) {
        provider = window.ethereum;
    }
    if (provider &&
        provider.providers &&
        provider.providers.length &&
        conn_provider === 'metamask') {
        let m_provider = window.ethereum.providers.find((x) => x.isMetaMask);
        if (m_provider) provider = m_provider;
    }
    return provider;
};

// main: initiate the metamask wallet (used it in header part)
export const initiateNetwork = async (provider) => {
    try {
        const currentProvider = detectCurrentProvider(provider);
        if (currentProvider) {
            await currentProvider.request({ method: 'eth_requestAccounts' });
            const web3 = new Web3(currentProvider);
            const userAccount = await web3.eth.getAccounts();
            const chainId = await web3.eth.getChainId();
            const networkId = await web3.eth.net.getId();

            if (userAccount.length === 0) {
                return new Error('Please connect to Metamask');
            } else {
                const account = userAccount[0];
                let balance = await web3.eth.getBalance(account); // Get wallet balance
                balance = web3.utils.fromWei(balance, 'ether'); //Convert balance to wei

                return { balance, account, chainId, networkId };
            }
        } else return new Error('Non-Ethereum browser detected. You should consider trying Metamask')
    } catch (err) {
        console.log(err);
        return new Error(
            'There was an error fetching your accounts. Make sure your Ethereum client is configured correctly.'
        );
    }
}

// common: initiate Register contract

export const initiateTockenContract = async (conn_provider) => {
    let provider = detectCurrentProvider(conn_provider)

    if (provider) {
        const web3 = new Web3(provider);
        tockenContract = new web3.eth.Contract(
            tockenAbi,
            process.env.REACT_APP_TOCKEN_CONTRACT
        );
        isTockenInitialized = true;
    }
}

export const initiateOrderContract = async (conn_provider) => {
    let provider = detectCurrentProvider(conn_provider)

    if (provider) {
        const web3 = new Web3(provider);
        orderContract = new web3.eth.Contract(
            orderAbi,
            process.env.REACT_APP_ORDER_CONTRACT
        );
        isOrderInitialized = true;
    }
}

export const addOrderSetup = async (conn_provider, w_address, id, product_name, product_description, price) => {
    console.log("Final", conn_provider, w_address, id, product_name, product_description, price)
    let provider = detectCurrentProvider(conn_provider);

    if (!isOrderInitialized) {
        await initiateOrderContract(conn_provider)
    }

    if (provider) {
        return await orderContract.methods.saveOrder(
            w_address,
            id,
            product_name,
            product_description,
            price
        ).send({
            from: w_address
        })
    }
}

// approved to be ccalled first before order setup
export const approveSetup = async (conn_provider,w_address, spender_address, price) => {
    console.log("Final", conn_provider,w_address, spender_address, price)
    const pricetoWei = (price * (10**18))
    console.log(pricetoWei);
    let provider = detectCurrentProvider(conn_provider);
    
    if (!isTockenInitialized) {
        await initiateTockenContract(conn_provider)
    }

    if (provider) {
        const web3 = new Web3(provider);
        let pricetoWei = web3.utils.toWei(price.toString(), 'ether');
        return await tockenContract.methods.approve(
            spender_address,
            pricetoWei
        ).send({
            from: w_address
        })
    }
    
}

export const getOrderDetailsbyAddress = async (conn_provider, w_address) => {
    console.log('Verifying Login details', conn_provider, w_address)
    if (!isOrderInitialized) {
      await initiateOrderContract(conn_provider)
    }
    return await orderContract.methods.getOrderDetailsByAddress(w_address)
      .call()
      .then((isRegistered) => {
        const data = []
        isRegistered.forEach((v) => {
            data.push({
                id: v.id,
                price: v.price,
                desc: v.product_description,
                name: v.product_name,
            })
        })
        console.log(isRegistered, "isRegistered")
        return data
      })
  }