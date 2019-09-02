import displayContractBalance from './contract-balance';
import displayContractStatus from './contract-status';
import displayCountdown from './countdown';
import displayMinBet from './min-bet';
import displayMaxBet from './max-bet';
import displayNetworkStatus from './network-status';
import displayResults from './results';

export default function hydrate() {
  displayNetworkStatus();
  displayContractStatus();
  displayContractBalance();
  displayMinBet();
  displayMaxBet();
  displayCountdown();
  displayResults();
}