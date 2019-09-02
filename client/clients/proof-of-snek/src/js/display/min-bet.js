import fromWeiToEth from '../helpers/from-wei-to-eth';

export default function displayMinBet() {
  const amount = window.dapp.contracts.proofOfSnek.state['6'];
  
  document.getElementById('min_bet').innerHTML = fromWeiToEth(amount, 3);
  document.getElementById('bet').placeholder = fromWeiToEth(amount, 3);
}