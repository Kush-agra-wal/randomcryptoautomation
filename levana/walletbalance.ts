import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing"

const rpcEndpoint = "https://sei.kingnodes.com/"
const factoryAddress =
  "sei1xmpv0ledn5rv46hkyzqjdgc20yyqldlwjv66vc7u4vw5h7fadfssnks3y6"
const seedPhrase =
  "gloom human walnut bright steel private faith bonus wisdom fly sword pipe"

const runAll = async () => {
  const signer = await DirectSecp256k1HdWallet.fromMnemonic(seedPhrase, {
    // This is the prefix used by the Dragonfire testnet
    prefix: "sei"
  })

  // Get the address of the account. This should match what you see inside leap
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
  // And print some information about this account
  const account = await client.getAccount(address)
  console.log(`Account information: ${JSON.stringify(account)}`)
  const balance = await client.getBalance(address, "sei")
  console.log(`Balance is ${balance.amount}${balance.denom}`)
  console.log(balance)
  
}

runAll()
