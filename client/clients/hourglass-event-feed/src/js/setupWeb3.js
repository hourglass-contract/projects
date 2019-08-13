export default async function setupWeb3() {
  window.web3 = await new Web3();
}