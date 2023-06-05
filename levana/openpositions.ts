import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { GasPrice } from "@cosmjs/stargate";

const rpcEndpoint = "https://rpc-v4-udb8dydv.dragonfire.sandbox.levana.finance";
const marketAddress =
  "levana1hy98vz70fmur9pfyjunet9cr7yqx3jddl24g9jmaunr7mdxuwn8s5s6gj8";
const collateralAddress =
  "levana1aakfpghcanxtc45gpqlx8j3rq0zcpyf49qmhm9mdjrfx036h4z5s8vmtpc";
const seedPhrase =
  "hen punch extra relax craft bicycle iron core purity tissue talk impact kitchen inhale slush hip amateur during ranch inspire much correct century where";

const runAll = async () => {
  const signer = await DirectSecp256k1HdWallet.fromMnemonic(seedPhrase, {
    prefix: "levana",
  });
  const accounts = await signer.getAccounts();
  const walletAddress = accounts[0].address;
  const client = await SigningCosmWasmClient.connectWithSigner(
    rpcEndpoint,
    signer,
    { gasPrice: GasPrice.fromString("0.025udragonfire") }
  );
  const res = await client.queryContractSmart(marketAddress, {
    nft_proxy: { nft_msg: { tokens: { owner: walletAddress } } },
  });
  
  console.log(res.tokens);
  
  const res2 = await client.queryContractSmart(marketAddress, {
    positions: { position_ids: [Number(res.tokens) ] },
  });
  
  console.log(res2);
};

runAll();
