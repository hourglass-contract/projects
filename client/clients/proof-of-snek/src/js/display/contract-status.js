export default function displayContractStatus() {
  document.getElementById('contract_status').innerHTML = `<a href="https://ropsten.etherscan.io/address/${window.dapp.contracts.proofOfSnek.address}" target="_blank">${window.dapp.contracts.proofOfSnek.address}</a>`;
}