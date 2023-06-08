import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing"
import { readFileSync } from 'fs';

const file = readFileSync('leap seed.txt', 'utf-8');
const seedPhrase =
  file
const rpcEndpoint = "https://sei.kingnodes.com/"
const factoryAddress =
  "sei1xmpv0ledn5rv46hkyzqjdgc20yyqldlwjv66vc7u4vw5h7fadfssnks3y6"

const runAll = async () => {
  const signer = await DirectSecp256k1HdWallet.fromMnemonic(seedPhrase, {
    prefix: "sei"
  })
  console.log(signer)
  
  const accounts = await signer.getAccounts()
  const address = accounts[0].address
  console.log(`Wallet address is ${address}`)

  const client = await SigningCosmWasmClient.connectWithSigner(
    rpcEndpoint,
    signer
  )
  const { market_addr: marketAddress } = await client.queryContractSmart(
    factoryAddress,
    {
      market_info: { market_id: "ETH_USD" },
    }
  );
  console.log(marketAddress)
  
  const balance = await client.getBalance(address, "sei")
  console.log(`Balance is ${balance.amount}${balance.denom}`)
  console.log(balance)
  
}

runAll()
