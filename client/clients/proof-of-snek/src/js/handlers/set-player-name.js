export default async function setPlayerName() {
  const vanityName = document.getElementById('player_name_input').value;
  
  if (isValidVanityName(vanityName)) {
    const data = window.dapp.contracts.proofOfSnek.contract.methods.setPlayerName(vanityName).encodeABI();
    const value = window.dapp.contracts.proofOfSnek.state['1'];

    window.dapp.contracts.proofOfSnek.contract.functions.setPlayerName(vanityName, {value});
  }
}

async function isValidVanityName(vanityName) {
  return await window.dapp.contracts.proofOfSnek.contract.functions.isValidVanityName(vanityName);
}