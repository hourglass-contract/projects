export default async function setupWeb3() {
  if (window.ethereum) {
    window.web3 = await new Web3(window.ethereum);
  } else if (window.web3) {
    window.web3 = await new Web3(Web3.givenProvider);
  } else {
    // console.log('no provider detected');
    window.web3 = await new Web3();
    //window.web3 = new Web3(https://mainnet.infura.io/YOUR_INFURA_API_KEY);
  }

  if(window.web3.currentProvider && window.web3.currentProvider.isConnected()) {
    window.dapp.connected = true;
    console.log('provider connected');
    window.dapp.network = await window.web3.eth.net.getNetworkType();
  } else {
    console.log("provider not connected");
    window.dapp.connected = false;
  }
}