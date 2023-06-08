# spotspreadstask
## Task 1 : Integration of Delta Exchange api with the help of Python
The output of this task shows the following which are extracted using Rest APIs
1. Account balance
2. Order Book
3. Open orders of an account
4. ticker

task.ipynb is the final code which can be run using any python compilet or jupyter notebook
"api keys.txt" consist of api key of the wallet in which 1st line is api key and 2nd line is api secret.
## Task 2 : Integration of Levana Protocol api using Typescript
This task let's you check balance of wallet of account linked with levana protocol, get currentl open positions details of an account and ability to easily create an open market position or close a specific market position for an account each with seperate codes.
Firstly put your seed/mnemonic phrase in "leap seed.txt". This wil be utilised in all three codes.

To deploy or close a market position `positions.txt` file is to be updated following a specific schema in diffrent lines for any objective(s) explained below.
To create an open market position add parameters separated by commas :
```open,market-id,leverage,direction,maxgain%/100,collateral/10^6```
example : `open,ETH_USD,20,short,5,250000` , this will create a short open market position in ETH_USD with 20x leverage with collateral/amount of 0.25 ETH

Similarly to close an open position add following line in `positions.txt`:
```close,position-id```
example: `close,ETH_USD,8070`, this will close the open position with id 8070 in ETH_USD market

```NOTE: All instructions will be followed in same order as in position.txt file```


##  Setup to run
1. Install [NodeJs](https://nodejs.org/en/download)
2. Install [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
3. run `npm install` in task2 directory which consist package.json

## to run a code
type in terminal : ```npx ts-node <name-of-file>.ts```
for example to get wallet balance run : ```npx ts-node checkWalletBalance.ts```
