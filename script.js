const ethers = require('ethers');
require('dotenv').config({ path: '../.env' });

const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = JSON.parse(process.env.CONTRACT_ABI);

const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
const contract = new ethers.Contract(contractAddress, contractABI, provider);

async function getTokenInfo() {
  const name = await contract.name();
  const totalSupply = await contract.totalSupply();
  const decimals = await contract.decimals();

  document.getElementById('tokenName').textContent = name;
  document.getElementById('totalSupply').textContent = ethers.utils.formatUnits(totalSupply, decimals);
  document.getElementById('decimals').textContent = decimals;
}

getTokenInfo();

async function mint(to, amount) {
  const signer = provider.getSigner();
  const contractWithSigner = contract.connect(signer);
  const tx = await contractWithSigner.mint(to, ethers.utils.parseUnits(amount, 18));
  await tx.wait();
  alert(`Minted ${amount} tokens to ${to}`);
}

document.getElementById('mintForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const to = document.getElementById('mintTo').value;
  const amount = document.getElementById('mintAmount').value;
  await mint(to, amount);
});

async function burn(from, amount) {
  const signer = provider.getSigner();
  const contractWithSigner = contract.connect(signer);
  const tx = await contractWithSigner.burn(from, ethers.utils.parseUnits(amount, 18));
  await tx.wait();
  alert(`Burned ${amount} tokens from ${from}`);
}

document.getElementById('burnForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const from = document.getElementById('burnFrom').value;
  const amount = document.getElementById('burnAmount').value;
  await burn(from, amount);
});