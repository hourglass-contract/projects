export default function displayContractStatus() {
  document.getElementById('contract_status').innerHTML = window.dapp.contracts.proofOfSnek.isConnected ? `<a href="https://etherscan.io/address/${window.dapp.contracts.proofOfSnek.address}">${window.dapp.contracts.proofOfSnek.address}</a>` : 'not connected';
}