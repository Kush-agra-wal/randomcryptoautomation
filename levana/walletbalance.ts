import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing"

const rpcEndpoint = "https://rpc-v4-udb8dydv.dragonfire.sandbox.levana.finance"
const marketAddress =
  "levana1hy98vz70fmur9pfyjunet9cr7yqx3jddl24g9jmaunr7mdxuwn8s5s6gj8"
const seedPhrase =
  "hen punch extra relax craft bicycle iron core purity tissue talk impact kitchen inhale slush hip amateur during ranch inspire much correct century where"

const runAll = async () => {
  const signer = await DirectSecp256k1HdWallet.fromMnemonic(seedPhrase, {
    // This is the prefix used by the Dragonfire testnet
    prefix: "levana"
  })

  // Get the address of the account. This should match what you see inside Keplr
  const accounts = await signer.getAccounts()
  const address = accounts[0].address
  console.log(`Wallet address is ${address}`)

  const client = await SigningCosmWasmClient.connectWithSigner(
    rpcEndpoint,
    signer
  )

  // And print some information about this account
  const account = await client.getAccount(address)
  console.log(`Account information: ${JSON.stringify(account)}`)
  const balance = await client.getBalance(address, "udragonfire")
  console.log(`Balance is ${balance.amount}${balance.denom}`)
  const status = await client.queryContractSmart(marketAddress, {
    status: {}
  })
  const collateralAddress = status.collateral.cw20.addr
  const walletAddress = accounts[0].address
  const balance2 = await client.queryContractSmart(collateralAddress, {
    balance: { address: walletAddress }
  })
  console.log('CW20 (divide by 10^6 for atom tokens) :')
  console.log(balance2)
}

runAll()
