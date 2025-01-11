class TokenManager {
  constructor() {
    this.signer = null;
    this.provider = null;
    this.network = null;
    this.contract = null;
    this.ABIHelper = null;
    this.contractAddress = "0x9834D9c8C13a0f3415ef597cf054e9bf944eA479";

    this.menuItems = [
      { label: 'Inicio', link: '#home', onclick: 'carregarInicioHtml' },
      { label: 'Transferir', link: '#menuTransfer', onclick: 'carregarTransferHtml' },
      { label: 'Burn', link: '#MenuBurn', onclick: 'carregarBurnHtml' },
      { label: 'Mintar', link: '#MenuMint', onclick: 'carregarMintHtml' },
      { label: 'Alterar Rating', link: '#MenuRating', onclick: 'carregarRatingHtml' },
    ];
  }

  async init() {
    await this.connectToProvider();
    this.loadContractData();
    this.registerEventListeners();
  }

  async connectToProvider() {
    if (window.ethereum == null) {
      this.provider = new ethers.InfuraProvider("sepolia");
      this.network = await this.provider.getNetwork();
      this.contract = new ethers.Contract(this.contractAddress, abi, this.provider);
    } else {
      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      this.network = await this.provider.getNetwork();
      this.contract = new ethers.Contract(this.contractAddress, abi, this.signer);
      const networkAccount = document.getElementById("networkAccount");
      networkAccount.innerHTML = this.signer.address;
    }
  }

  loadContractData() {
    this.selectContract();
    this.loadHeaderStructure();
    this.ABIHelper = new ethers.Interface(abi);
    this.loadNetworkInfo();
    this.loadTokenInfo();
    this.loadTransferEvents();
  }

  async loadHeaderStructure() {
    const cabecalho = document.getElementById("cabecalho");
    cabecalho.innerHTML = htmlCabecalho;
  }

  async loadNetworkInfo() {
    const networkNetworkID = document.getElementById("networkNetworkID");
    networkNetworkID.innerHTML = this.network.chainId;
  }

  async loadTokenInfo() {
    try {
      const tokenNomeObj = await this.contract.name();
      const tokenNome = document.getElementById("tokenNome");
      tokenNome.innerHTML = tokenNomeObj;
    } catch (error) {
      this.showInvalidContractError();
      return;
    }

    const tokenSimboloObj = await this.contract.symbol();
    const tokenSimbolo = document.getElementById("tokenSimbolo");
    tokenSimbolo.innerHTML = tokenSimboloObj;

    const tokenTotalSupplyObj = await this.contract.totalSupply();
    const tokenTotalSupply = document.getElementById("tokenTotalSupply");
    tokenTotalSupply.innerHTML = tokenTotalSupplyObj;

    const tokenContractToken = document.getElementById("tokenContractToken");
    tokenContractToken.innerHTML = this.contractAddress;
  }

  async loadTransferEvents() {
    const filtroEvento = this.contract.filters.Transfer;
    const eventos = await this.contract.queryFilter(filtroEvento, -90000);
    eventos.forEach((evento) => {
      this.parseLogTransferencia(evento);
    });
  }

  parseLogTransferencia(evento) {
    const parsedLog = this.ABIHelper.parseLog(evento);
    console.log("Evento de Transferencia Parseado:", parsedLog);
  }

  async atualizaRating() {
    const tokenRatingObj = await this.contract.rating();
    const tokenRating = document.getElementById("tokenRating");
    tokenRating.innerHTML = "<br>Rating: " + tokenRatingObj;
  }

  showInvalidContractError() {
    alert("Digite um contrato válido por favor");
  }

  async selectContract() {
    const cabecalho = document.getElementById("cabecalho");
    cabecalho.innerHTML = htmlSelecionarContrato;
    this.gerenciarSubstituicao(0);
  }

  gerenciarSubstituicao(menuIndex) {
    const menus = document.getElementById("menus");
    menus.innerHTML = this.generateMenuHTML(menuIndex);
  }

  generateMenuHTML(menuIndex) {
    return this.menuItems.map((item, index) => `
      <li>
        <a href="${item.link}" class="nav-link ${index === menuIndex ? 'text-secondary' : 'text-white'}" onclick="tokenManager.${item.onclick}()">
          ${item.label}
        </a>
      </li>
    `).join('');
  }
  
  carregarRatingHtml() {
    const conteudo = document.getElementById("conteudo");
    conteudo.innerHTML = htmlRating;
    this.gerenciarSubstituicao(4);
  }

  carregarMintHtml() {
    const conteudo = document.getElementById("conteudo");
    conteudo.innerHTML = htmlMintar;
    this.gerenciarSubstituicao(3);
  }

  carregarBurnHtml() {
    const conteudo = document.getElementById("conteudo");
    conteudo.innerHTML = htmlBurn;
    this.gerenciarSubstituicao(2);
  }

  carregarTransferHtml() {
    const conteudo = document.getElementById("conteudo");
    conteudo.innerHTML = htmlTransfer;
    this.gerenciarSubstituicao(1);
  }

  carregarInicioHtml() {
    const conteudo = document.getElementById("conteudo");
    conteudo.innerHTML = "";
    this.gerenciarSubstituicao(0);
  }

  registerEventListeners() {
    const formSaldo = document.getElementById("formSaldo");
    const formMint = document.getElementById("formMint");
    const formRating = document.getElementById("formRating");
    const formContrato = document.getElementById("formContrato");
    const formBurn = document.getElementById("formBurn");
    const formTransfer = document.getElementById("formTransfer");

    if (formSaldo) {
      formSaldo.addEventListener("submit", this.consultar.bind(this));
    }

    if (formMint) {
      formMint.addEventListener("submit", this.mintar.bind(this));
    }

    if (formRating) {
      formRating.addEventListener("submit", this.mudarRating.bind(this));
    }

    if (formContrato) {
      formContrato.addEventListener("submit", this.mudarContrato.bind(this));
    }

    if (formBurn) {
      formBurn.addEventListener("submit", this.burn.bind(this));
    }

    if (formTransfer) {
      formTransfer.addEventListener("submit", this.transfer.bind(this));
    }
  }

  async consultar(event) {
    event.preventDefault();
    const form = document.getElementById("formSaldo");
    alert("Aguarde a consulta ser processada pelo Provedor");
    const saldo = await this.contract.balanceOf(form.formTo.value);
    form.formAmount.value = saldo;
  }

  async mintar(event) {
    event.preventDefault();
    const btn = document.getElementById("btnMintar");
    btn.value = "Processando...";
    alert("Aguarde e confirme a transação no Metamask");
    const form = document.getElementById("formMint");
    try {
      const tx = await this.contract.mint(form.formTo.value, form.formAmount.value);
      console.log("tx enviada: ", tx);
      alert("Transação enviada a Blockchain. Aguarde.\nID: " + tx.hash);
      const txReceipt = await tx.wait();
      if (txReceipt.status === 1) {
        await this.atualizaTotalSupply();
        alert("Parabéns! Mais tokens gerados.");
        btn.value = "Mintar (gerar) Token";
        form.reset();
      }
    } catch (error) {
      alert("Você não pode Mintar nesse contrato");
    }
  }

  async mudarRating(event) {
    event.preventDefault();
    const btn = document.getElementById("btnRating");
    btn.value = "Processando...";
    alert("Aguarde e confirme a transação no Metamask");
    const form = document.getElementById("formRating");
    try {
      const tx = await this.contract.mudaRating(form.formAmountRating.value);
      console.log("tx enviada: ", tx);
      alert("Transação enviada a Blockchain. Aguarde.\nID: " + tx.hash);
      const txReceipt = await tx.wait();
      if (txReceipt.status === 1) {
        await this.atualizaRating();
        alert("Parabéns! Rating alterado.");
        btn.value = "Rating Token";
        form.reset();
      }
    } catch (error) {
      alert("Você não pode mudar o Rating do contrato");
    }
  }

  async mudarContrato(event) {
    event.preventDefault();
    alert("Aguarde e confirme a transação no Metamask");
    const form = document.getElementById("formContrato");
    this.contractAddress = form.formHashContrato.value;
    this.init();
  }

  async burn(event) {
    event.preventDefault();
    const btn = document.getElementById("btnBurn");
    btn.value = "Processando...";
    alert("Aguarde e confirme a transação no Metamask");
    const form = document.getElementById("formBurn");
    try {
      const tx = await this.contract.burn(form.formTo.value, form.formAmountBurn.value);
      console.log("tx enviada: ", tx);
      alert("Transação enviada a Blockchain. Aguarde.\nID: " + tx.hash);
      const txReceipt = await tx.wait();
      if (txReceipt.status === 1) {
        await this.atualizaTotalSupply();
        alert("Parabéns! Os tokens foram queimados.");
        btn.value = "Burn (Queimar) Token";
        form.reset();
      }
    } catch (error) {
      alert("Você não pode queimar tokens desse contrato");
    }
  }

  async transfer(event) {
    event.preventDefault();
    const btn = document.getElementById("btnTransfer");
    btn.value = "Processando...";
    alert("Aguarde e confirme a transação no Metamask");
    const form = document.getElementById("formTransfer");
    try {
      const tx = await this.contract.transfer(form.formTo.value, form.formAmountTransfer.value);
      console.log("tx enviada: ", tx);
      alert("Transação enviada a Blockchain. Aguarde.\nID: " + tx.hash);
      const txReceipt = await tx.wait();
      if (txReceipt.status === 1) {
        alert("Parabéns! Tokens transferidos");
        btn.value = "Transferir Token";
        form.reset();
      }
    } catch (error) {
      alert("Erro na transferência: " + error);
    }
  }

  async atualizaTotalSupply() {
    const tokenTotalSupplyObj = await this.contract.totalSupply();
    const tokenTotalSupply = document.getElementById("tokenTotalSupply");
    tokenTotalSupply.innerHTML = tokenTotalSupplyObj;
  }
}

const tokenManager = new TokenManager();
tokenManager.init();