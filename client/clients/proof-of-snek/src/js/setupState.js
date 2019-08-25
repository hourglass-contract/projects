import proofOfSnek from './contracts/proof-of-snek.sol.js';

export default async function setupState() {
  window.dapp.contracts = {
    proofOfSnek: {
      address: proofOfSnek.address,
      contract: new window.web3.eth.Contract(proofOfSnek.abi, proofOfSnek.address),
      isConnected: await web3.eth.getCode(proofOfSnek.address) !== '0x',
    }
  };
}