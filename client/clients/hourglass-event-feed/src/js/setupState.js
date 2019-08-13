import Hourglass from './contracts/hourglass.sol.js';

export default async function setupState() {
  window.dapp.contracts = {
    hourglass: {
      address: Hourglass.address,
      contract: new window.web3.eth.Contract(Hourglass.abi, Hourglass.address),
    }
  };
}