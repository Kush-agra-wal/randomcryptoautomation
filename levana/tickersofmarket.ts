import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";

const factoryAddress =
  "sei1aldsk8lmc9z3q0ax47zgcluxx4x44ncf0nwnvtdepedg07jqqnrq0uel80";
const rpcEndpoint = "https://sei.kingnodes.com/";

const runAll = async () => {
  const client = await CosmWasmClient.connect(rpcEndpoint);

  const { market_addr: marketAddress } = await client.queryContractSmart(
    factoryAddress,
    {
      market_info: { market_id: "ETH_USD" },
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
