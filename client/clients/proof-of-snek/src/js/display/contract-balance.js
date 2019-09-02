import fromWeiToEth from '../helpers/from-wei-to-eth';

export default function displayContractBalance() {
  const balance = window.dapp.contracts.proofOfSnek.state['0'];
  
  document.getElementById('contract_balance').innerHTML = fromWeiToEth(balance, 3);
}