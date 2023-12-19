import { useState } from "react";
import { useDispatch } from "react-redux";
import { initiateNetwork } from "./connectContract";
// import { clearData } from "../redux/counter/counterSlice";

export const NetworkConnection = () => {
    const dispatch = useDispatch();
    const [wallet, setWallet] = useState(null);
      const connectNetwork = async () => {
        try {
            // dispatch(setLoading(true));
          const info = await initiateNetwork("metamask");
          console.log(info, "Error check")
          if (info instanceof Error) {
            alert(info.message)
            disconnectNetwork();
          } else if (info) {
            const { account, networkId } = info;
            if (validateNetwork(networkId)) {
                setWallet(account);
                dispatch({
                    type: 'SET_WALLET_DATA',
                    payload: account
                });
                // dispatch(setConnectAMENetwork(true));
                // dispatch(setLoading(false));
            } else {
              alert('Please check the Network');
              disconnectNetwork();
            }
          } else {
            alert('Please check the Network or Account');
            disconnectNetwork();
          }
        }
        catch (err) {
            disconnectNetwork();
            console.log(err);
        }
      }
    
      const disconnectNetwork = async () => {
        setWallet(pre => pre = null);
        logout();
        // dispatch(setConnectAMENetwork(false));
      }

      const logout = () => {
        // dispatch(clearData());
        // dispatch(setLoading(false));
      };

      const validateNetwork = (networkId) => {
        const networks = {
          production: {
            // 180: "AME"
            // Need to polygon mainnet
          },
          development: {
            80001: 'Polygon test newtork',
            // 181: 'AME Testnet',
    
          }
        }
        return networks[process.env.REACT_APP_NODE_ENV][networkId]
      }
      return {
        // autoConnect,
        connectNetwork,
        disconnectNetwork,
        logout,
        validateNetwork,
        wallet
      }
}

export default NetworkConnection;