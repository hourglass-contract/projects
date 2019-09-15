import { ethers } from 'ethers';
import toTrunc from './to-trunc.js';

export default function fromWeiToEth(wei, decimalPlaces) {
  const eth = parseFloat(ethers.utils.formatEther(wei.toString()));
  
  return toTrunc(eth, decimalPlaces).toFixed(decimalPlaces);
}