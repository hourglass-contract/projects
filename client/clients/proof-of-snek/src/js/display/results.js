import fromWeiToEth from '../helpers/from-wei-to-eth';

export default function displayResults() {
  const events = window.dapp.contracts.proofOfSnek.events;

  const markup = getEventMarkup(events.reverse());

  document.getElementById('results').insertAdjacentHTML('beforeend', markup);
}

function getEventMarkup(events) {
  return events.reduce((accumulator, event, index, events) => {
    return accumulator + createOnDrawCard(event, index, events)
  }, '');
}

const card = {
  '1': 'whale',
  '2': 'bull',
  '3': 'bear',
  '4': 'snek',
}

function createOnDrawCard(event, index, events) {
  const decoded = web3.eth.abi.decodeParameters(['uint256', 'bytes32', 'uint256'], event.data);

  const address = web3.utils.toChecksumAddress(web3.utils.fromDecimal(event.topics[1]));
  const amount = fromWeiToEth(decoded[0], 3);
  const date = new Date(web3.utils.hexToNumber(decoded[2]) * 1000);
  const playerName = web3.utils.hexToAscii(decoded[1]);
  const result = web3.utils.hexToNumber(event.topics[2]);
  

	return `<tr class="transaction">
    <td class="index">${index + 1}</td>
    <td class="date">${date.toDateString()} - ${date.toLocaleTimeString()}</td>
    <td class="player">${getPlayer(address, playerName)}</td>
    <td class="amount">${amount}</td>
    <td class="result ${card[result]}"></td>
	</div>`;
}

function getPlayer(address, playerName) {
  if (playerName === '0x0000000000000000000000000000000000000000000000000000000000000000') {
    return `<div class="address">${address}</div>`;
  }
  return `<div class="player-name">${playerName}</div><div class="address">${address}</div>`;
}