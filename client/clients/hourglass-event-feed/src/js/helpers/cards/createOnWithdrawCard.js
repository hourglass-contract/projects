import appendHeader from './appendHeader';
import appendPlayer from './appendPlayer';


export default function createOnWithdrawCard(event) {
	return `<div class="transaction" data-event="onWithdraw">
		${appendHeader(event, 'large-orange-diamond', 'Withdrawn earnings')}
		${appendPlayer(event, 'slight-smile', 'Withdrawer')}
		${appendCashout(event)}
	</div>`;
}

function appendCashout(event) {
	const data = web3.eth.abi.decodeParameters(['uint256'], event.data);
	const cashout = parseFloat(web3.utils.fromWei(data[0], 'ether')).toFixed(5);

	return `<div>
		<h2>Cashout:</h2>
		<div>
			<img src="./images/emoji/moneybag.svg" class="emoji" draggable="false">
			<span>${cashout} ETH</span>
		</div>
	</div>`;
}