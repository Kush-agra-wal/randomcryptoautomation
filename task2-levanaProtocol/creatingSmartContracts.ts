import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing"
import { GasPrice } from "@cosmjs/stargate";
import { readFileSync } from 'fs';

const file = readFileSync('leap seed.txt', 'utf-8');
// console.log(file)
const rpcEndpoint = "https://sei.kingnodes.com/"

const seedPhrase =
  file
// console.log(seedPhrase)



const closing = async (marketid: string, tokenid: string) => {
  const signer = await DirectSecp256k1HdWallet.fromMnemonic(seedPhrase, {
    // This is the prefix used by the Dragonfire testnet
    prefix: "sei"
  })
  
  const client = await SigningCosmWasmClient.connectWithSigner(
    rpcEndpoint,
    signer,
    { gasPrice: GasPrice.fromString("0.025usei") }
  );
  
  
  const accounts = await signer.getAccounts()
  const walletAddress = accounts[0].address
  const factoryAddress="sei1xmpv0ledn5rv46hkyzqjdgc20yyqldlwjv66vc7u4vw5h7fadfssnks3y6"
  const { market_addr: marketAddress } = await client.queryContractSmart(
    factoryAddress,
    {
      market_info: { market_id: marketid },
    }
  );
  await client.execute(
    walletAddress,
    marketAddress,
    { close_position: { id: tokenid } },
    "auto"
  );
  const status = await client.queryContractSmart(marketAddress, {
    status: {}
  })
  const collateralAddress = status.collateral.cw20.addr
  // console.log(marketAddress)

  const balance = await client.queryContractSmart(collateralAddress, {
    balance: { address: walletAddress }
  })
  console.log("Balance after closing position in",marketid," ",balance)
}

const opening = async (marketid: string,leverage: string,direction: string,maxgain: string,collateral: string) => {
  
  const signer = await DirectSecp256k1HdWallet.fromMnemonic(seedPhrase, {
    // This is the prefix used by the Dragonfire testnet
    prefix: "sei"
  })
  
  const client = await SigningCosmWasmClient.connectWithSigner(
    rpcEndpoint,
    signer,
    { gasPrice: GasPrice.fromString("0.025usei") }
  );
  
  
  const accounts = await signer.getAccounts()
  const walletAddress = accounts[0].address

  const factoryAddress="sei1xmpv0ledn5rv46hkyzqjdgc20yyqldlwjv66vc7u4vw5h7fadfssnks3y6"
  const { market_addr: marketAddress } = await client.queryContractSmart(
    factoryAddress,
    {
      market_info: { market_id: marketid },
    }
  );
  
  
  const status = await client.queryContractSmart(marketAddress, {
    status: {}
  })
  const collateralAddress = status.collateral.cw20.addr
  // console.log(marketAddress)
  
  const msg = Buffer.from(
    JSON.stringify({
      open_position: { leverage: leverage, direction: direction, max_gains: maxgain},
    })
  ).toString("base64");

  const execResult = await client.execute(
    walletAddress,
    collateralAddress,
    { send: { contract: marketAddress, amount: collateral, msg } },
    "auto"
  );
  // console.log("success");
  // console.log(JSON.stringify(execResult));
  const balance = await client.queryContractSmart(collateralAddress, {
    balance: { address: walletAddress }
  })
  console.log("Balance after opening position in",marketid," ",balance)
}
const file2 = readFileSync('positions.txt', 'utf-8');
var inp = file2.split("\r\n");
// console.log(inp)
async function reading() {
  for (var line in inp){
    // console.log(line)
    var input= inp[line].split(",");
    // console.log(inp)
    // console.log(input[0])
    if(input[0]=="open"){
      await opening(input[1],input[2],input[3],input[4],input[5])
      console.log("opening of position successfull")
    }else{
      await closing(input[1],input[2])
      console.log("closed successfully")
    }
  }
}
reading()
// console.log(inp)

