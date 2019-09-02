import proofOfSnek from './contracts/proof-of-snek.sol.js';
import apiKey from './secrets/apiKey';

export default async function setupState() {
  window.dapp.contracts = {
    proofOfSnek: {
      address: proofOfSnek.address.ropsten,
      contract: new window.web3.eth.Contract(proofOfSnek.abi, proofOfSnek.address.ropsten),
      isConnected: window.dapp.connected ? await web3.eth.getCode(proofOfSnek.address.ropsten) !== '0x' : false,
    }
  };

  if (window.dapp.contracts.proofOfSnek.isConnected) {
    window.dapp.contracts.proofOfSnek.state = await getStateFromProvider();
  } else {
    window.dapp.contracts.proofOfSnek.state = await getStateFromEtherscan();
  }

  window.dapp.contracts.proofOfSnek.events = await getEventsFromEtherscan();
}

async function getStateFromProvider() {
  const state = await window.dapp.contracts.proofOfSnek.contract.methods.getState().call();
  return state;
}

async function getStateFromEtherscan() {
  const data = window.dapp.contracts.proofOfSnek.contract.methods.getState().encodeABI();
  const to = window.dapp.contracts.proofOfSnek.address;
  const url = `https://api-ropsten.etherscan.io/api?module=proxy&action=eth_call&to=${to}&data=${data}&tag=latest&apikey=${apiKey}`;

  const state = await fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((responseJSON) => {
    const result = web3.eth.abi.decodeParameters(['uint256', 'uint256', 'uint256', 'uint256', 'address', 'uint256', 'uint256'], responseJSON.result);
    
    return result;
  });

  return state;
}

async function getEventsFromEtherscan() {
  const address = window.dapp.contracts.proofOfSnek.address;
  const topic = web3.utils.keccak256('OnDrawCard(address,uint256,uint256,bytes32,uint256)');

  const url = `https://api-ropsten.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&sort=desc&address=${address}&topic0=${topic}&apikey=${apiKey}`;

  const response = await fetch(url)
  .then(data => {return data.json()});

  return response.result;
}