import apiKey from '../secrets/apiKey';

export default async function getLatestBlock() {
  let latestBlock;
  const url = `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${apiKey}`;

  await fetch(url)
  .then(data => {return data.json()})
  .then(response => {
    latestBlock = web3.utils.hexToNumber(response.result);
  });

  return latestBlock;
}