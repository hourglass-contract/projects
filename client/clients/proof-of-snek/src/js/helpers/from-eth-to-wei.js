export default function fromEthToWei(ether) {

  return window.web3.utils.toWei(ether.toString(), 'ether');
}