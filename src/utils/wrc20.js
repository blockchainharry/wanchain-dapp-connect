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
}


module.exports = WRC20;
