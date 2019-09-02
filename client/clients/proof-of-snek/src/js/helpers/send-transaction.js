export default async function sendTransaction(payload) {
  const { cost, data } = payload;

  const BN = window.web3.utils.BN;

  const from = await web3.eth.getCoinbase();
  const to = window.dapp.contracts.proofOfSnek.address;
  const value = new BN(cost);

  web3.eth.sendTransaction({
    from,
    to,
    value,
    data
  }).on('transactionHash', (hash) => {
    // console.log('transaction hash:', hash);
  }).on('receipt', (receipt) => {
    // console.log('transaction receipt:', hash);
  }).on('confirmation', (nonce, receipt) => {
    // console.log('confirmation receipt:', receipt);
  }).on('error', console.error); // If a out of gas error, the second parameter is the receipt.;
}