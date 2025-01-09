require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');

const app = express();
app.use(cors());
app.use(express.json());

const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = JSON.parse(process.env.CONTRACT_ABI);
const providerURL = process.env.PROVIDER_URL;
const privateKey = process.env.PRIVATE_KEY;

const provider = new ethers.providers.JsonRpcProvider(providerURL);
let contract;

const initContract = async () => {
    contract = new ethers.Contract(contractAddress, contractABI, provider);
    console.log("Contrato inicializado com sucesso!");
};

initContract();

// Endpoint para obter o saldo
app.get('/api/getBalance/:address', async (req, res) => {
    try {
        const address = req.params.address;
        const balance = await contract.balanceOf(address);
        res.json({ balance: ethers.utils.formatEther(balance) });
    } catch (error) {
        console.error("Erro ao obter o saldo:", error);
        res.status(500).json({ error: 'Erro ao obter o saldo' });
    }
});

// Endpoint para mintar tokens
app.post('/api/mint', async (req, res) => {
    try {
        const { to, amount } = req.body;
        const wallet = new ethers.Wallet(privateKey, provider);
        const contractWithSigner = contract.connect(wallet);
        const tx = await contractWithSigner.mint(to, ethers.utils.parseUnits(amount, 18));
        await tx.wait();
        res.json({ message: 'Tokens mintados com sucesso', txHash: tx.hash });
    } catch (error) {
        console.error("Erro ao mintar tokens:", error);
        res.status(500).json({ error: 'Erro ao mintar tokens' });
    }
});

// Endpoint para queimar tokens
app.post('/api/burn', async (req, res) => {
    try {
        const { amount, account } = req.body;
        const signer = provider.getSigner(account);
        const contractWithSigner = contract.connect(signer);
        const tx = await contractWithSigner.burn(account, ethers.utils.parseUnits(amount, 18));
        await tx.wait();
        res.json({ message: 'Tokens queimados com sucesso', txHash: tx.hash });
    } catch (error) {
        console.error("Erro ao queimar tokens:", error);
        res.status(500).json({ error: 'Erro ao queimar tokens' });
    }
});

// Endpoint para fazer staking
app.post('/api/stake', async (req, res) => {
    try {
        const { amount, account } = req.body;
        const signer = provider.getSigner(account);
        const contractWithSigner = contract.connect(signer);
        const tx = await contractWithSigner.stake(ethers.utils.parseUnits(amount, 18));
        await tx.wait();
        res.json({ message: 'Tokens staked com sucesso', txHash: tx.hash });
    } catch (error) {
        console.error("Erro ao fazer staking:", error);
        res.status(500).json({ error: 'Erro ao fazer staking' });
    }
});

// Endpoint para fazer unstaking
app.post('/api/unstake', async (req, res) => {
    try {
        const { amount, account } = req.body;
        const signer = provider.getSigner(account);
        const contractWithSigner = contract.connect(signer);
        const tx = await contractWithSigner.unstake(ethers.utils.parseUnits(amount, 18));
        await tx.wait();
        res.json({ message: 'Tokens unstaked com sucesso', txHash: tx.hash });
    } catch (error) {
        console.error("Erro ao fazer unstaking:", error);
        res.status(500).json({ error: 'Erro ao fazer unstaking' });
    }
});

// Endpoint para reivindicar recompensas
app.post('/api/claimRewards', async (req, res) => {
    try {
        const { account } = req.body;
        const signer = provider.getSigner(account);
        const contractWithSigner = contract.connect(signer);
        const tx = await contractWithSigner.claimRewards();
        await tx.wait();
        res.json({ message: 'Recompensas reivindicadas com sucesso', txHash: tx.hash });
    } catch (error) {
        console.error("Erro ao reivindicar recompensas:", error);
        res.status(500).json({ error: 'Erro ao reivindicar recompensas' });
    }
});

// Endpoint para misturar tokens
app.post('/api/mix', async (req, res) => {
    try {
        const { amount, account } = req.body;
        const signer = provider.getSigner(account);
        const contractWithSigner = contract.connect(signer);
        const tx = await contractWithSigner.mix(ethers.utils.parseUnits(amount, 18));
        await tx.wait();
        res.json({ message: 'Tokens misturados com sucesso', txHash: tx.hash });
    } catch (error) {
        console.error("Erro ao misturar tokens:", error);
        res.status(500).json({ error: 'Erro ao misturar tokens' });
    }
});

// Endpoint para retirar tokens do pool de mistura
app.post('/api/withdraw', async (req, res) => {
    try {
        const { amount, account } = req.body;
        const signer = provider.getSigner(account);
        const contractWithSigner = contract.connect(signer);
        const tx = await contractWithSigner.withdraw(ethers.utils.parseUnits(amount, 18));
        await tx.wait();
        res.json({ message: 'Tokens retirados do pool de mistura com sucesso', txHash: tx.hash });
    } catch (error) {
        console.error("Erro ao retirar tokens do pool de mistura:", error);
        res.status(500).json({ error: 'Erro ao retirar tokens do pool de mistura' });
    }
});

const port = 3001; 
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
