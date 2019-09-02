import fromWeiToEth from '../helpers/from-wei-to-eth';

export default function displayMaxBet() {
  const amount = window.dapp.contracts.proofOfSnek.state['5'];
  
  document.getElementById('max_bet').innerHTML = fromWeiToEth(amount, 3);
}