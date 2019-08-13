import queryStringToJSON from './queryStringToJSON';
import getToAndFromBlocks from './getToAndFromBlocks';
import apiKey from '../secrets/apiKey';

export default async function getEventLogs() {
  const { address } = queryStringToJSON();

  let url;

	if (address) {
		url = `https://api.etherscan.io/api?module=logs&action=getLogs
		&fromBlock=0
		&toBlock=latest
		&address=0xb3775fb83f7d12a36e0475abdd1fca35c091efbe
		&topic1=${web3.eth.abi.encodeParameter('address', address)}
		&apikey=${apiKey}`
	} else {
    const { fromBlock, toBlock } = await getToAndFromBlocks();

		url = `https://api.etherscan.io/api?module=logs&action=getLogs
		&fromBlock=${fromBlock}
		&toBlock=${toBlock}
		&address=0xb3775fb83f7d12a36e0475abdd1fca35c091efbe
		&apikey=${apiKey}`
  }

  const response = await fetch(url)
  .then(data => {return data.json()})

  return response.result;
}