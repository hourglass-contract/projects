const topicMap = {
  '0x022c0d992e4d873a3748436d960d5140c1f9721cf73f7ca5ec679d3d9f4fe2d5': 'onTokenPurchase',
  '0xccad973dcd043c7d680389db4378bd6b9775db7124092e9e0422c9e46d7985dc': 'onWithdraw',
  '0xc4823739c5787d2ca17e404aa47d5569ae71dfb49cbf21b3f6152ed238a31139': 'onTokenSell',
  '0xbe339fc14b041c2b0e0f3dd2cd325d0c3668b78378001e53160eab3615326458': 'onReinvestment',
  '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef': 'Transfer',
}

export default function getEventType(event) {
	return topicMap[event.topics[0]];
}