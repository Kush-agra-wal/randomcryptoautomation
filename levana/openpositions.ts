import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { GasPrice } from "@cosmjs/stargate";

const rpcEndpoint = "https://sei.kingnodes.com/";
const marketAddress =
  "sei1xg9nz66lw2u6esc036tcjug35s06wljenjfn9qntzv6pcee3782q8hyx28";
const seedPhrase =
  "gloom human walnut bright steel private faith bonus wisdom fly sword pipe";

const runAll = async () => {
  const signer = await DirectSecp256k1HdWallet.fromMnemonic(seedPhrase, {
    prefix: "sei",
  });
  const accounts = await signer.getAccounts();
  const walletAddress = accounts[0].address;
  const client = await SigningCosmWasmClient.connectWithSigner(
    rpcEndpoint,
    signer,
    { gasPrice: GasPrice.fromString("0.025sei") }
  );
  const res = await client.queryContractSmart(marketAddress, {
    nft_proxy: { nft_msg: { tokens: { owner: walletAddress } } },
  });
  
  console.log(res.tokens);
  
  const res2 = await client.queryContractSmart(marketAddress, {
    positions: { position_ids: res.tokens },
  });
  
  console.log(res2);
};

runAll();
