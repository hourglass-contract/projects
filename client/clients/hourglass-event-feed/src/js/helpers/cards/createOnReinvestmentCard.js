import appendHeader from './appendHeader';
import appendPlayer from './appendPlayer';

export default function createOnReinvestmentCard(event) {

	return `<div class="transaction" data-event="onReinvestment">
		${appendHeader(event, 'chart-with-upwards-trend', 'Reinvest')}
		${appendPlayer(event, 'wink', 'Buyer')}
		${appendSpentAndReceived(event)}
	</div>`;

	function appendBuyer() {
		const from = web3.eth.abi.decodeParameter('address', event.topics[1]);

		return `<div>
			<h2>Buyer:</h2>
			<div>
        <img src="./images/emoji/wink.svg" class="emoji" draggable="false">
        <a href="./?address=${from}" class="address" target="_blank">${from}</a>
      </div>
		</div>`;
	}
}

function appendSpentAndReceived(event) {
  const data = web3.eth.abi.decodeParameters(['uint256', 'uint256'], event.data);
  const spent = parseFloat(web3.utils.fromWei(data[0], 'ether')).toFixed(5);
  const received = parseFloat(web3.utils.fromWei(data[1], 'ether')).toFixed(5);

  return `<div class="half">
    <div>
      <h2>Reinvested:</h2>
      <div>
        <img src="./images/emoji/recycle.svg" class="emoji" draggable="false">
        <span>${spent} ETH</span>
      </div>
    </div>
    <div>
      <h2>Received:</h2>
      <div>
        <img src="./images/emoji/moneybag.svg" class="emoji" draggable="false">
        <span>${received} P③D</span>
      </div>
    </div>
  </div>`;
}