import fromWeiToEth from '../helpers/from-wei-to-eth';

export default function setMinBet() {
  const amount = window.dapp.contracts.proofOfSnek.state['6'];
  
  document.getElementById('bet').value = fromWeiToEth(amount, 3);
}