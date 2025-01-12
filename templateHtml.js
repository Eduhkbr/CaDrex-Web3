// templateHtml.js
const htmlCabecalho = `<h3>
  Dados Token:
  <span id="tokenNome">Buscando informação...</span>
  -
  <span id="tokenSimbolo">Buscando informação...</span>
  <span id="tokenRating">Buscando informação...</span>
</h3>
<h3>Total circulante: <span id="tokenTotalSupply">Buscando informação...</span></h3>
<h3>Contrato do Token: <span id="tokenContractToken">Buscando informação...</span></h3>
<br><br>
<h3>Saldo em Tokens</h3>
<div>
  <form action="" name="formSaldo" id="formSaldo" method="get">
    <label for="formTo">Endereço cliente:</label>
    <br /><br />
    <input
      size="100"
      maxlength="45"
      type="text"
      placeholder="<0x...>"
      required
      name="formTo"
      id="formTo"
      style="width: 500px"
    />
    <br /><br />
    <label for="formAmount">Quantidade:</label>
    <br /><br />
    <input type="number" disabled name="formAmount" id="formAmount" />
    <br /><br />
    <input type="button" value="Consultar" onclick="tokenManager.consultar()" />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input type="reset" value="Limpar" />
  </form>
</div>
<br><br><br><br><br>`;

const htmlMintar = `<h2>Novo Token</h2>
<div>
  <form action="" name="formMint" id="formMint" method="get">
    <label for="formTo">Endereço do destinatário:</label>
    <br /><br />
    <input
      type="text"
      placeholder="<0x...>"
      required
      name="formTo"
      id="formTo"
      size="100"
      maxlength="45"
      style="width: 500px"
    />
    <br /><br />
    <label for="formAmount">Quantidade:</label>
    <br /><br />
    <input type="number" placeholder="10000" required name="formAmount" id="formAmount" />
    <br /><br />
    <input id="btnMintar" type="button" value="Mintar (gerar) Token" onclick="tokenManager.mintar()" />
  </form>
</div>`;


const htmlStaking = `<h2>Congelar Token</h2>
<div>
  <form action="" name="formStake" id="formStake" method="get">
    <br /><br />
    <label for="formAmount">Quantidade:</label>
    <br /><br />
    <input type="number" placeholder="10000" required name="formAmount" id="formAmount" />
    <br /><br />
    <input id="btnStaking" type="button" value="Staking Token" onclick="tokenManager.staking()" />
  </form>
</div>`;

const htmlBurn = `<h2>Burn Token</h2>
<div>
  <form action="" name="formBurn" id="formBurn" method="get">
    <label for="formTo">Endereço do destinatário:</label>
    <br /><br />
    <input
      type="text"
      placeholder="<0x...>"
      required
      name="formTo"
      id="formTo"
      size="100"
      maxlength="45"
      style="width: 500px"
    />
    <br /><br />
    <label for="formAmountBurn">Quantidade:</label>
    <br /><br />
    <input type="number" placeholder="10000" required name="formAmountBurn" id="formAmountBurn" />
    <br /><br />
    <input id="btnBurn" type="button" value="Burn (Queimar) Token" onclick="tokenManager.burn()" />
  </form>
</div>`;

const htmlTransfer = `<h2>Transferir Token</h2>
<div>
  <form action="" name="formTransfer" id="formTransfer" method="get">
    <label for="formTo">Endereço do destinatário:</label>
    <br /><br />
    <input
      type="text"
      placeholder="<0x...>"
      required
      name="formTo"
      id="formTo"
      size="100"
      maxlength="45"
      style="width: 500px"
    />
    <br /><br />
    <label for="formAmountTransfer">Quantidade:</label>
    <br /><br />
    <input type="number" placeholder="10000" required name="formAmountTransfer" id="formAmountTransfer" />
    <br /><br />
    <input id="btnTransfer" type="button" value="Transferir Token" onclick="tokenManager.transfer()" />
  </form>
</div>`;

const htmlRating = `<h2>Novo Rating</h2>
<div>
  <form action="" name="formRating" id="formRating" method="get">
    <label>Rating:</label>
    <br /><br />
    <input type="text" placeholder="AAA" required name="formAmountRating" id="formAmountRating" />
    <br /><br />
    <input id="btnRating" type="button" value="Rating Token" onclick="tokenManager.mudarRating()" />
  </form>
</div>`;

const htmlSelecionarContrato = `<h2>Escolha o Contrato pelo HASH</h2>
<div>
  <form action="" name="formContrato" id="formContrato" method="get">
    <label>Contrato:</label>
    <br /><br />
    <input type="text" placeholder="0x2A846FC387e88F1fAC685AeFD70EeE26394C5611" required name="formHashContrato" id="formHashContrato" />
    <br /><br />
    <input id="btnContrato" type="button" value="Selecionar Contrato" onclick="tokenManager.mudarContrato()" />
  </form>
</div>`;