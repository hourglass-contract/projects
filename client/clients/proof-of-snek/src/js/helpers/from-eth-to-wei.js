import { ethers } from 'ethers';

export default function fromEthToWei(ether) {
  return ethers.utils.parseEther(ether);
}