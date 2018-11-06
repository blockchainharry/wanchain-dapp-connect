module.exports = {
  version:'1.0.0',
  wanRPC: 'http://52.14.147.127/testnet',
  ethRPC: 'http://localhost:8545',
  sendOpts: {
    from: '0x020f9ff77973041992ac3ff4ad754b5c8eb88848',
    gas: 4710000,
    gasPrice: 180e9,
  },
  explorer: {
    latest: 'http://18.217.171.41',
  },
  wallets: {
    wanchain: '0x366b1939b61150725e55db07416efb60c38d3790',
  },
  taker: {
    wanchain: '0x020f9ff77973041992ac3ff4ad754b5c8eb88848',
    password: 'test',
  },
  tokens: {
    // devx:{
    //     name:'Wanchain Dev Coin',
    //     symbol:'DEVX',
    //     address:'0xaFac5607E3501b535Ea84368F9D13EfCfb186Bd1'
    // },
    // sum:{
    //     name:'Summer Token',
    //     symbol:'SUM',
    //     address:'0xa949078e0ce2f7b24212e1cd4b5aec6eb016c580'
    // },
    // win:{
    //     name:'Winter Token',
    //     symbol:'WIN',
    //     address:'0xa42df088776eecfcdbdd76b0b74964c504788ce1'
    // },
    // wusd:{
    //     name:'Wusd Token',
    //     symbol:'WUSD',
    //     address:'0xd49de496d046571b7c5d9d29c7368a82f8e8a909',
    //     abi:'./abi/WUSD.json'
    // },
    wmkr: {
      name: 'MakerX',
      symbol: 'WMKR',
      display: 'MKRx',
      address: '0x29204554D51B6d8E7b477fE0fA4769b47F2a00EF',
    },
    wbtc: {
      name: 'BitcoinX',
      symbol: 'WBTC',
      display: 'BTCx',
      address: '0x6a40A70a0Bd72de24918e6Eec3CDc5E131e6B1CF',
      multiplier: 100000000,
    },
    weth: {
      name: 'EthereumX',
      symbol: 'WETH',
      display: 'ETHx',
      address: '0x46397994A7e1E926eA0DE95557A4806d38F10B0d',
    },
    wdai: {
      name: 'DaiX',
      symbol: 'WDAI',
      display: 'DAIx',
      address: '0xcc0Ac621653faAE13daE742ebb34F6E459218fF6',
    },
    wzrx: {
      name: '0xX',
      symbol: 'WZRX',
      display: 'ZRXx',
      address: '0xE7D648256543D2467cA722b7560A92c1dCB654Bb',
    },
  },
  utilityContracts: {
    exchangeContract: {
      address: '0x9abbd236e46eae3ae230f3284d40f9df4ddb677f',
    },
  },
};
