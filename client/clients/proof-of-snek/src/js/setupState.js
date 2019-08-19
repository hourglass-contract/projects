import slot3d from './contracts/slot3d.sol.js';

export default async function setupState() {
  window.dapp.contracts = {
    slot3d: {
      address: slot3d.address,
      contract: new window.web3.eth.Contract(slot3d.abi, slot3d.address),
      isConnected: await web3.eth.getCode(slot3d.address) !== '0x',
    }
  };
}