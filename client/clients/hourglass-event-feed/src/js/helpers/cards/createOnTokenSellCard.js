import appendHeader from './appendHeader';
import appendPlayer from './appendPlayer';

export default function createOnTokenSellCard(event) {

	return `<div class="transaction" data-event="onTokenSell">
		${appendHeader(event, 'chart-with-downwards-trend', 'Sell order')}
		${appendPlayer(event, 'disappointed-relieved', 'Seller')}
		${appendSpentAndReceived(event)}
	</div>`;
}

function appendSpentAndReceived(event) {
  const data = web3.eth.abi.decodeParameters(['uint256', 'uint256'], event.data);
  const spent = parseFloat(web3.utils.fromWei(data[0], 'ether')).toFixed(5);
  const received = parseFloat(web3.utils.fromWei(data[1], 'ether')).toFixed(5);

  return `<div class="half">
    <div>
      <h2>Spent:</h2>
      <div>
        <img src="./images/emoji/money-with-wings.svg" class="emoji" draggable="false">
        <span>${spent} P③D</span>
      </div>
    </div>
    <div>
      <h2>Received:</h2>
      <div>
        <img src="./images/emoji/moneybag.svg" class="emoji" draggable="false">
        <span>${received} ETH</span>
      </div>
    </div>
  </div>`;
}