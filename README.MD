# wanchain dapp connect

Wanchain + Ethereum blockchain utility package to be used with WanMask and MetaMask (from client). From the server, you can also interact with both blockchains.

### Install


// node
npm install wanchain-dapp-connect


### Prerequisites

- <a href="https://chrome.google.com/webstore/detail/wanmask/omnkcjdohbnjfjmlaiboojplahajnenj?hl=fr">WanMask Chrome Extension</a>

### Usage (client or server)

```
const WanDapp = require('wanchain-dapp-connect');
wandapp = new WanDapp();

```

#### WanMask (wanchain)
```
wandapp.wanmask // wan3 object
wandapp.wallet.address

wandapp.wan3.eth.getAccounts().then(function(act){
console.log('active wanchain account',act)
});

```

#### MetaMask (ethereum)
```
wandapp.wanmask // wan3 object
wandapp.wallet.ethAddress


wandapp.web3.eth.getAccounts().then(function(act){
console.log('active meta mask account',act)
});

```

Client: when used on the client you will need to have wanmask open and running.




