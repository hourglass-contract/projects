export default function appendHeader(event, emoji, transactionType) {
	const date = new Date(parseInt(event.timeStamp) * 1000);

	return `<div class="header">
		<a href="https://etherscan.io/tx/${event.transactionHash}" target="_blank">
      <img src="./images/emoji/${emoji}.svg" class="emoji" draggable="false">${transactionType}
    </a>
		<div class="timestamp">
      ${date.toDateString()} - ${date.toLocaleTimeString()}
    </div>
	</div>`;
}