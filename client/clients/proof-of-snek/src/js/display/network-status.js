export default function displayNetworkStatus() {
  document.getElementById('network_status').innerHTML = getNetworkStatus();
}

function getNetworkStatus() {
  if (!window.dapp.network) {
    return 'not connected';
  }

  if (window.dapp.network !== 'ropsten') {
    return `<span class="error">${window.dapp.network} - switch to ropsten</span>`;
  }

  return 'ropsten';
}