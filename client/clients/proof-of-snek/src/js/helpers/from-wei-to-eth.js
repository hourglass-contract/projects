export default function fromWeiToEth(wei, decimalPlaces) {

  return parseFloat(window.web3.utils.fromWei(wei.toString(), 'ether')).toFixed(decimalPlaces);
}