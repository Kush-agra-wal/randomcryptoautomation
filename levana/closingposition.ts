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
  const walletAddress = "sei1jzuf4uu2dh5u92wdwvygf5sn6rqd6gx6je7q9c"

  const client = await SigningCosmWasmClient.connectWithSigner(
    rpcEndpoint,
    signer,
    { gasPrice: GasPrice.fromString("0.025usei") }
  );
  const factoryAddress="sei1xmpv0ledn5rv46hkyzqjdgc20yyqldlwjv66vc7u4vw5h7fadfssnks3y6"
  const marketAddress="sei1xg9nz66lw2u6esc036tcjug35s06wljenjfn9qntzv6pcee3782q8hyx28"
  await client.execute(
    walletAddress,
    marketAddress,
    { close_position: { id: "4296" } },
    "auto"
  );
  
}

runAll()
