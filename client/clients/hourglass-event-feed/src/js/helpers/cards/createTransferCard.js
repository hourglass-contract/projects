import appendHeader from './appendHeader';
import appendPlayer from './appendPlayer';

export default function createTransferCard(event) {
	return `<div class="transaction" data-event="transfer">
		${appendHeader(event, 'left-right-arrow', 'Funds transfer')}
		${appendPlayer(event, 'arrow-up', 'From')}
		${appendTo(event)}
		${appendAmount(event)}
	</div>`;
}

function appendTo(event) {
  const to = web3.eth.abi.decodeParameter('address', event.topics[2]);

  return `<div>
    <h2>To:</h2>
    <div>
      <img src="./images/emoji/arrow-down.svg" class="emoji" draggable="false">
      <span><a href="./?address=${to}" class="address" target="_blank">${to}</a></span>
    </div>
  </div>`;
}

function appendAmount(event) {
  const data = web3.eth.abi.decodeParameters(['uint256'], event.data);
  const amount = parseFloat(web3.utils.fromWei(data[0], 'ether')).toFixed(5);

  return `<div>
    <h2>Amount:</h2>
    <div>
      <img src="./images/emoji/left-right-arrow.svg" class="emoji" draggable="false">
      <span>${amount} P③D</span>
    </div>
  </div>`;
}