import fromEthToWei from '../helpers/from-eth-to-wei';

export default async function drawCard() {
  if (!window.dapp.network) {
    return;
  }

  const bet = document.getElementById('bet').value;
  const value = fromEthToWei(bet);

  try {
    if (window.ethereum) {
      await window.ethereum.enable();
    }
    await window.dapp.contracts.proofOfSnek.contract.functions.drawCard({value});
  } catch(error) {
    console.error(error);
  }
}