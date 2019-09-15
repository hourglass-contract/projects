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

const percent = {
  '1': 1.75,
  '2': 1.25,
  '3': .5,
  '4': 0,
}

function createOnDrawCard(event, index, events) {
  const decoded = window.dapp.contracts.proofOfSnek.interface.events.OnDrawCard.decode(event.data);

  const address = ethers.utils.getAddress(ethers.utils.hexStripZeros(event.topics[1]));
  const amount = fromWeiToEth(decoded[2], 3);
  const date = new Date(decoded[4] * 1000);
  const playerName = ethers.utils.parseBytes32String(decoded[3]);
  const result = ethers.utils.bigNumberify(ethers.utils.hexStripZeros(event.topics[2])).toString();

	return `<tr class="transaction">
    <td class="index">${index + 1}</td>
    <td class="date">${date.toDateString()} - ${date.toLocaleTimeString()}</td>
    <td class="player">${getPlayer(address, playerName)}</td>
    <td class="amount">${amount}</td>
    <td class="winnings">${getWinnings(decoded[2], result)}</td>
    <td class="result ${card[result]}"></td>
	</div>`;
}

function getPlayer(address, playerName) {
  if (playerName === '0x0000000000000000000000000000000000000000000000000000000000000000') {
    return `<div class="address">${address}</div>`;
  }
  return `<div class="player-name">${playerName}</div><div class="address">${address}</div>`;
}

function getWinnings(bet, result) {
  return fromWeiToEth(bet * percent[result], 5);
}