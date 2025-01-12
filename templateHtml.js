// templateHtml.js
const htmlCabecalho = `<h3>
  Dados Token:
  <span id="tokenNome">Buscando informação...</span>
  -
  <span id="tokenSimbolo">Buscando informação...</span>
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
    <label for="formAmount">Quantidade de tokens:</label>
    <br /><br />
    <input type="number" disabled name="formAmount" id="formAmount" />
    <br /><br />
    <br /><br />
    <label for="formAmountMix">Quantidade de tokens no Mix:</label>
    <br /><br />
    <input type="number" disabled name="formAmountMix" id="formAmountMix" />
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


const htmlMix = `<h2>Mixer de Token</h2>
<div>
    <label for="formTo">Endereço do sacador dos tokens:</label>
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
    <input id="btnMix" type="button" value="Mix Token" onclick="tokenManager.mix()" />
  </form>
</div>`;


const htmlUnMix = `<h2>UnMix Token</h2>
<div>
  <form action="" name="formUnMix" id="formUnMix" method="get">
    <br /><br />
    <label for="formAmount">Quantidade:</label>
    <br /><br />
    <input type="number" placeholder="10000" required name="formAmount" id="formAmount" />
    <br /><br />
    <input id="btnUnMix" type="button" value="UnMix Token" onclick="tokenManager.withdraw()" />
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