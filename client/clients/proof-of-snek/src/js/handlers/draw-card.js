import sendTransaction from '../helpers/send-transaction';
import fromEthToWei from '../helpers/from-eth-to-wei';

export default async function drawCard() {
  if (!window.dapp.connected) {
    return;
  }

  const data = window.dapp.contracts.proofOfSnek.contract.methods.drawCard().encodeABI();
  const bet = document.getElementById('bet').value;
  const cost = fromEthToWei(bet);

  try {
    if (window.ethereum) {
      await window.ethereum.enable();
    }
    sendTransaction({data, cost});
  } catch(error) {
    console.error(error);
  }
}