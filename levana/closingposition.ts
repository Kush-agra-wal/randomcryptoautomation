import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing"
import { GasPrice } from "@cosmjs/stargate";

const rpcEndpoint = "https://sei.kingnodes.com/"

const seedPhrase =
  "gloom human walnut bright steel private faith bonus wisdom fly sword pipe"

const runAll = async () => {
  const signer = await DirectSecp256k1HdWallet.fromMnemonic(seedPhrase, {
    // This is the prefix used by the Dragonfire testnet
    prefix: "sei"
  })
  const accounts = await signer.getAccounts()
  const walletAddress = accounts[0].address

  const client = await SigningCosmWasmClient.connectWithSigner(
    rpcEndpoint,
    signer,
    { gasPrice: GasPrice.fromString("1sei") }
  );
  const factoryAddress="sei1aldsk8lmc9z3q0ax47zgcluxx4x44ncf0nwnvtdepedg07jqqnrq0uel80"
  const { market_addr: marketAddress } = await client.queryContractSmart(
    factoryAddress,
    {
      market_info: { market_id: "ETH_USD" },
    }
  );
  const status = await client.queryContractSmart(marketAddress, {
    status: {}
  })
  const collateralAddress = status.collateral.cw20.addr

  const balance = await client.queryContractSmart(collateralAddress, {
    balance: { address: walletAddress }
  })
  console.log(balance)
  const execResult = await client.execute(
    walletAddress,
    marketAddress,
    { close_position: { id: 125049 } },
    "auto"
  );
  console.log(JSON.stringify(execResult));
  const balance2 = await client.queryContractSmart(collateralAddress, {
    balance: { address: walletAddress }
  })
  console.log(balance2)
}

runAll()
