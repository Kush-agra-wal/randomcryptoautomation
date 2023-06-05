import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";

const factoryAddress =
  "levana13ygvfysgdnsmu37mzfj36dpsgfy4yk4u9q8wfptqzcg4gujfsfeqqr08v2";
const rpcEndpoint = "https://rpc-v4-udb8dydv.dragonfire.sandbox.levana.finance";

const runAll = async () => {
  const client = await CosmWasmClient.connect(rpcEndpoint);

  const { market_addr: marketAddress } = await client.queryContractSmart(
    factoryAddress,
    {
      market_info: { market_id: "ATOM_USD" },
    }
  );

  const price = await client.queryContractSmart(marketAddress, {
    spot_price: {},
  });
  console.log(JSON.stringify(price));

  const status = await client.queryContractSmart(marketAddress, { status: {} });
  console.log(JSON.stringify(status));
};

runAll();
