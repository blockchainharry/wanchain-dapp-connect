# wanchain dapp connect

Wanchain + Ethereum blockchain utility package to be used with WanMask and MetaMask (from client). From the server, you can also interact with both blockchains.


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
wandapp.wanmask.currentProvider.isWanMask // true
wandapp.wallet.address


// client
wandapp.wanmask.eth.getAccounts().then(function(act){
console.log('active MetaMask account',act)
});

// server
wandapp.wan3.eth.getAccounts().then(function(act){
console.log('active MetaMask account',act)
});

```

#### MetaMask (ethereum)
```
wandapp.metamask // web3 object
wandapp.metamask.currentProvider.isMetaMask // true
wandapp.wallet.ethAddress

// client
wandapp.metamask.eth.getAccounts().then(function(act){
console.log('active MetaMask account',act)
});

// server
wandapp.web3.eth.getAccounts().then(function(act){
console.log('active MetaMask account',act)
});

```

Client: when used on the client you will need to have wanmask open and running.




