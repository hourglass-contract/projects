import getLatestBlock from './getLatestBlock';

let blockDistance = 5000;
let fromBlock;
let toBlock;

export default async function getToAndFromBlocks() {
  if (fromBlock === 0) {
    return {};
  }

  toBlock = !toBlock ? await getLatestBlock() : fromBlock;
  
  fromBlock = toBlock > blockDistance ? toBlock - blockDistance : 0;

  return {
    fromBlock,
    toBlock,
  }
}