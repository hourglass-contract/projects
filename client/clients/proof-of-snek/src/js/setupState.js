import proofOfSnek from './contracts/proof-of-snek.sol.js';
import apiKey from './secrets/apiKey';
import { ethers } from 'ethers';

export default async function setupState() {
  window.dapp.contracts = {
    proofOfSnek: {
      address: proofOfSnek.address.ropsten,
      contract: new ethers.Contract(proofOfSnek.address.ropsten, proofOfSnek.abi, window.dapp.provider.getSigner()),
      interface: new ethers.utils.Interface(proofOfSnek.abi),
    }
  };

  await dapp.provider.getNetwork().then((data) => {
    window.dapp.network = data.name;
  });

  if (window.dapp.network === 'ropsten') {
    window.dapp.contracts.proofOfSnek.state = await getStateFromProvider();
  } else {
    window.dapp.contracts.proofOfSnek.state = await getStateFromEtherscan();
  }

  window.dapp.contracts.proofOfSnek.events = await getEventsFromEtherscan();
}

async function getStateFromProvider() {
  const state = await window.dapp.contracts.proofOfSnek.contract.functions.getState();
  return state;
}

async function getStateFromEtherscan() {
  const data = window.dapp.contracts.proofOfSnek.interface.functions.getState.encode([]);
  const to = window.dapp.contracts.proofOfSnek.address;
  const url = `https://api-ropsten.etherscan.io/api?module=proxy&action=eth_call&to=${to}&data=${data}&tag=latest&apikey=${apiKey}`;

  const state = await fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((responseJSON) => {
    const result = window.dapp.contracts.proofOfSnek.interface.functions.getState.decode(responseJSON.result);
    
    return result;
  });

  return state;
}

async function getEventsFromEtherscan() {
  const address = window.dapp.contracts.proofOfSnek.address;
  const topic = ethers.utils.keccak256(ethers.utils.toUtf8Bytes('OnDrawCard(address,uint256,uint256,bytes32,uint256)'));

  const url = `https://api-ropsten.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&sort=desc&address=${address}&topic0=${topic}&apikey=${apiKey}`;

  const response = await fetch(url)
  .then(data => {return data.json()});

  return response.result;
}