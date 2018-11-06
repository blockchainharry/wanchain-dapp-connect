const EventEmitter = require('events');

const pulse = new EventEmitter();
const Eth = require('ethjs-query');
const colors = require('colors');
const EthContract = require('ethjs-contract');
const HttpProvider = require('ethjs-provider-http');
const Web3 = require('web3');
const isClient = require('isclient');
const _ = require('underscore');
const config = require('./config');
const tokenAbi = require('../../../abi/WRC20.json').abi;

const wan3server = new Web3(new Web3.providers.HttpProvider(config.wanRPC));
const web3server = new Web3(new Web3.providers.HttpProvider(config.ethRPC));

class ExchangeBase extends EventEmitter {
  constructor() {
    super();

    this.pulse = pulse;
    this.wan3server = wan3server; // wanchain
    this.web3server = web3server; // ethereum
    this.Web3 = Web3;
    this.logs = [];
    this.abi = tokenAbi;
    this.exchanges = [];
    this.config = config;

    this.wallet = {
      address: false,
      tokens: {},
    };
    this.isClient = isClient.win;
  }

  socket() {
    return this.pulse;
  }
}

class WRC20 extends ExchangeBase {
  init() {
    var self = this;
    console.log(`wandex ${this.config.version}` .blue);
    const wandex = this;


    if (wandex.isClient) {
        wandex.mode = 'client';
        self.wan3 =  new Web3(wan3.currentProvider);
        self.wanmask = wan3;
        self.web3=  new Web3(window.ethereum);
        self.metamask = web3;
        self.wan3.eth.getAccounts().then((accounts)=>{
            if(accounts){
                self.wallet.address = accounts[0];
                self.wallet.tokens = self.config.tokens;
                console.log(`WanMask Connected! Address: ${self.wallet.address}`);
            }
        }).catch((err) => { console.log(`getAccounts ERROR ${err}`.red); });

        self.web3.eth.getAccounts().then((accounts)=>{
            if(accounts.length){
                self.wallet.ethAddress = accounts[0];
                // self.wallet.tokens = self.config.tokens; // TODO add ETH ERC20 TOKENS
                console.log(`MetaMask Connected! Address: ${self.wallet.ethAddress}`);
            }
    }).catch((err) => { console.log(`getAccounts ETH ERROR ${err}`.red); });


    } else {
      wandex.wanmask = false;
      wandex.wan3 = wan3server;
      wandex.web3 = web3server;
      wandex.mode = 'server';
    }
    console.log(`Mode: ${wandex.mode}`.blue);
    pulse.emit('startup', true);
  }

  getTokens(wallet, hideLogs) {
    this.tokens = {};
    const self = this;
    const addr = wallet || self.wallet.address;

    const exchangeAddr = self.config.utilityContracts.exchangeContract.address;
    const provider = new HttpProvider(self.config.wanRPC);
    const eth = new Eth(provider);

    if(addr){
        console.log(`TOKEN BALANCE CHECK`.underline);
        console.log(`ADDRESS: ${addr}` .green)
        console.log('[SYMBOL] APPROVED BALANCE'.bold);
        _.each(self.config.tokens, (tok) => {
            const toker = tok;
            toker.address = toker.address.toLowerCase();
            const contract = new EthContract(eth);
            const tokenObj = contract(tokenAbi);
            const tokenContract = tokenObj.at(tok.address);
            toker.contract = tokenContract;
            toker.contract.allowance(addr, exchangeAddr)
                .then((allow) => {
                toker.allowance = allow[0].toString() || '0';
                if (toker.contract && toker.contract.balanceOf) {
                    toker.contract.balanceOf(addr)
                        .then((shazam) => {
                        toker.balance = shazam[0].toString() || '0';
                        if (!hideLogs) {
                            self.tokens[toker.symbol] = toker;
                            console.log(`[${tok.symbol}] ${wan3.utils.fromWei(tok.allowance)} ${wan3.utils.fromWei(tok.balance)}`);
                        }
                });
            }
          }).catch((err) => { console.log(`[${tok.symbol}] ${err}`.red); });
        });
    } else {
        console.log('NO ADDRESS PASSED'.red);
        console.log('Try running this wandex.getTokens(address);'.red);
    }
  }

  // approve(tokenObj, totalWei) {
  //   const exchangeAddr = this.config.utilityContracts.exchangeContract.address.toLowerCase();
  //   const wallet = this.wallet.address.toLowerCase();
  //   return tokenObj.contract.approve(exchangeAddr, (parseFloat(totalWei)).toString(), {
  //     // gas: 470000,
  //     // gasPrice: 180e9,
  //     from: wallet,
  //   });
  // }
  //
  // approveTaker(tokenOut, totalWei) {
  //   const self = this;
  //   const tokenAddr = self.wallet.tokens[tokenOut].address;
  //   const exchangeAddr = self.config.utilityContracts.exchangeContract.address.toLowerCase();
  //   const wallet = self.config.taker.wanchain.toLowerCase();
  //   const tokenContract = new wan3.eth.Contract(tokenAbi, tokenAddr);
  //   return new Promise((((resolve, reject) => {
  //     if (tokenAddr) {
  //       const approvalReceipt = tokenContract.methods.approve(exchangeAddr, totalWei).send(
  //         {
  //           // gas: 4700000,
  //           // gasPrice: 180e9,
  //           from: wallet,
  //         },
  //       );
  //       resolve(approvalReceipt);
  //     } else {
  //       reject();
  //     }
  //   })));
  // }
  //
  //
  // unlockTaker() {
  //   const taker = this.config.taker.wanchain.toLowerCase();
  //   return this.wan3.eth.personal.unlockAccount(taker, this.config.taker.password);
  // }
  //
  // checkTakerBalance(tokenIn) {
  //   const self = this;
  //   const taker = self.config.taker.wanchain.toLowerCase();
  //   const exchangeAddr = self.config.utilityContracts.exchangeContract.address.toLowerCase();
  //   const takerAllowance = self.wallet.tokens[tokenIn].contract.allowance(taker, exchangeAddr);
  //   takerAllowance.method = 'allowance';
  //   pulse.emit('info', takerAllowance);
  //   return takerAllowance;
  // }
  //
  // exchange(fromAddress, tokenIn, tokenOut, conversionRate, totalVolume, tx, takerAmt, makerAmt) {
  //   const self = this;
  //   self.unlockTaker();
  //   Promise.resolve([]).then(() => {
  //     const exchangeAddress = self.config.utilityContracts.exchangeContract.address;
  //     const exchangeContract = new self.wan3.eth.Contract(self.abi, exchangeAddress);
  //     const makerObj = {
  //       token: tokenOut.address,
  //       address: fromAddress,
  //       amount: makerAmt,
  //     };
  //     const takerPool = self.config.taker.wanchain.toLowerCase();
  //     const takerObj = {
  //       token: tokenIn.address,
  //       address: takerPool,
  //       amount: takerAmt,
  //     };
  //     let duration = 0;
  //     const listenForTx = setInterval(() => {
  //       duration += 1;
  //       // self.getTokens()
  //     },
  //     1000);
  //     exchangeContract.methods.fulfillOrder(
  //       makerObj.token, // maker token contract address - token they are spending
  //       takerObj.token, // taker token contract address - token they are spending
  //       makerObj.address, // address of maker
  //       takerObj.address, // address of taker
  //       makerObj.amount, // amount that the maker is spending
  //       takerObj.amount, // amount that the taker is spending
  //     ).send({
  //       from: takerPool,
  //       gas: 4710000,
  //       gasPrice: 180e9,
  //     }).then((resp) => {
  //       const receipt = resp;
  //       clearInterval(listenForTx);x
  //       receipt.duration = duration;
  //       receipt.status = 'complete';
  //       return pulse.emit('complete', receipt);
  //     }).catch((err) => console.log(`${err}`.red));
  //   });
  // }

  conf() {
    return this.config;
  }
}


module.exports = WRC20;
