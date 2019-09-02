import sendTransaction from '../helpers/send-transaction';

export default async function setPlayerName() {
  console.log('set player name');
  const vanityName = document.getElementById('player_name_input').value;
  
  if (isValidVanityName(vanityName)) {
    const data = window.dapp.contracts.proofOfSnek.contract.methods.setPlayerName(vanityName).encodeABI();
    const cost = window.dapp.contracts.proofOfSnek.state['1'];

    sendTransaction({data, cost});
  }
}

async function isValidVanityName(vanityName) {
  return await window.dapp.contracts.proofOfSnek.contract.methods.isValidVanityName(vanityName).call();
}