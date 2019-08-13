export default function appendPlayer(event, emoji, playerType) {
	let from = web3.eth.abi.decodeParameter('address', event.topics[1]);
	from = web3.utils.toChecksumAddress(from);

	return `<div>
		<h2>${playerType}</h2>
		<div>
      <img src="./images/emoji/${emoji}.svg" class="emoji" draggable="false">
      <a href="./?address=${from}" class="address" target="_blank">${from}</a>
    </div>
	</div>`;
}