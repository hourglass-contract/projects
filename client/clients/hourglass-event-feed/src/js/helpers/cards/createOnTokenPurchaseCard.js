import appendHeader from './appendHeader';
import appendPlayer from './appendPlayer';

export default function createOnTokenPurchaseCard(event) {

	return `<div class="transaction" data-event="onTokenPurchase">
		${appendHeader(event, 'chart-with-upwards-trend', 'Buy order')}
		${appendPlayer(event, 'wink', 'Buyer')}
		${appendReferrer(event)}
		${appendSpentAndReceived(event)}
	</div>`;
}

function appendReferrer(event) {
  const referrer = web3.eth.abi.decodeParameter('address', event.topics[2]);

  if (referrer !== '0x0000000000000000000000000000000000000000') {
    return `<div>
      <h2>Referrer:
        <div>
          <img src="./images/emoji/crown.svg" class="emoji" draggable="false">
          <a href="./?address=${referrer}" class="address" target="_blank">${referrer}</a>
        </div>
      </div>`;
  }
  return '';
}

function appendSpentAndReceived(event) {
  const data = web3.eth.abi.decodeParameters(['uint256', 'uint256'], event.data);
  const spent = parseFloat(web3.utils.fromWei(data[0], 'ether')).toFixed(5);
  const received = parseFloat(web3.utils.fromWei(data[1], 'ether')).toFixed(5);

  return `<div class="half">
    <div>
      <h2>Spent:</h2>
      <div>
        <img src="./images/emoji/money-with-wings.svg" class="emoji" draggable="false"><span>${spent} ETH</span></div>
      </div>
      <div>
      <h2>Received:</h2>
      <div>
        <img src="./images/emoji/moneybag.svg" class="emoji" draggable="false"><span>${received} P③D</span></div>
    </div>
  </div>`;
}