import fromWeiToEth from '../helpers/from-wei-to-eth';

export default function setMaxBet() {
  const amount = window.dapp.contracts.proofOfSnek.state['5'];

  document.getElementById('bet').value = fromWeiToEth(amount, 3);
}