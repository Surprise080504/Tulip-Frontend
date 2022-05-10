const getData = (pairID, setPrice, setLiquidity) => {
  return fetch('https://7ng6kythprhcjaby3nodr77leu.appsync-api.us-west-2.amazonaws.com/graphql', {
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0',
      Accept: '*/*',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      Referer: 'https://www.defined.fi/',
      'content-type': 'application/json',
      'x-amz-user-agent': 'aws-amplify/3.0.4',
      'X-Api-Key': 'da2-4isjqg3vu5c5leyskyr2tw2tja',
      Origin: 'https://www.defined.fi',
      Connection: 'keep-alive',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'cross-site',
      TE: 'trailers',
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({ operationName: 'GetPairMetadata', variables: { pairId: `${pairID}:42262` }, query: 'query GetPairMetadata($pairId: String!) {\n  pairMetadata(pairId: $pairId) {\n    price\n    exchangeId\n    fee\n    id\n    liquidity\n    liquidityToken\n    nonLiquidityToken\n    pairAddress\n    priceChange\n    priceChange1\n    priceChange12\n    priceChange24\n    priceChange4\n    tickSpacing\n    volume\n    volume1\n    volume12\n    volume24\n    volume4\n    token0 {\n      address\n      decimals\n      name\n      networkId\n      pooled\n      price\n      symbol\n      __typename\n    }\n    token1 {\n      address\n      decimals\n      name\n      networkId\n      pooled\n      price\n      symbol\n      __typename\n    }\n    __typename\n  }\n}\n' })
  }).then(x => x.json().then(d => d.data.pairMetadata)).catch((e) => {
    console.log(e)
  })
}

const getPrice = (pairID, chainId = 42262) => {
  return fetch('https://7ng6kythprhcjaby3nodr77leu.appsync-api.us-west-2.amazonaws.com/graphql', {
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0',
      Accept: '*/*',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      Referer: 'https://www.defined.fi/',
      'content-type': 'application/json',
      'x-amz-user-agent': 'aws-amplify/3.0.4',
      'X-Api-Key': 'da2-4isjqg3vu5c5leyskyr2tw2tja',
      Origin: 'https://www.defined.fi',
      Connection: 'keep-alive',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'cross-site',
      TE: 'trailers',
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({ operationName: 'GetPairMetadata', variables: { pairId: `${pairID}:${chainId}` }, query: 'query GetPairMetadata($pairId: String!) {\n  pairMetadata(pairId: $pairId) {\n    price\n    exchangeId\n    fee\n    id\n    liquidity\n    liquidityToken\n    nonLiquidityToken\n    pairAddress\n    priceChange\n    priceChange1\n    priceChange12\n    priceChange24\n    priceChange4\n    tickSpacing\n    volume\n    volume1\n    volume12\n    volume24\n    volume4\n    token0 {\n      address\n      decimals\n      name\n      networkId\n      pooled\n      price\n      symbol\n      __typename\n    }\n    token1 {\n      address\n      decimals\n      name\n      networkId\n      pooled\n      price\n      symbol\n      __typename\n    }\n    __typename\n  }\n}\n' })
  }).then(x => x.json().then(d => {
    return Number(d.data.pairMetadata.price)
  })).catch((e) => {
    console.log(e)
  })
}

const getPetalPrice = () => {
  const PETAL_ID = '0x48b819c83bc0cba256d92488b9400199bc4e5842'
  return getPrice(PETAL_ID)
}

const getTulipPrice = () => {
  const ROSE_ID = '0x219083f53b3c28e679aa9f233920c536c01c6ed9'
  return getPrice(ROSE_ID)
}

const getRosePrice = () => {
  const ROSE_ID = '0xfb9bd52abe613a5c4a20e9fc09462a2ec5f2d1b2'
  return getPrice(ROSE_ID)
}

const getOapePrice = () => {
  const ROSE_ID = '0x89173608b1a56411e546c3c9adf5965410e3bceb'
  return getPrice(ROSE_ID)
}

const getDunePrice = () => {
  const DUNE_ID = '0x0a3ede29c4c7e892ac3e0a024c718e725a37dc39'
  return getPrice(DUNE_ID)
}

const getYuzuPrice = () => {
  const YUZU_ID = '0x27146afc961853d00b830b801209e7cb4c04ba4a'
  return getPrice(YUZU_ID)
}
const getFtmPrice = () => {
  const FTM = '0x1a8a4dc716e9379e84e907b0c740d2c622f7cfb7'
  return getPrice(FTM, '250')
}

const getUSDCPrice = () => {
  const USDC = '0xdf50fbde8180c8785842c8e316ebe06f542d3443'
  return getPrice(USDC, '1')
}

const getUSDTPrice = () => {
  const USDT = '0x3416cf6c708da44db2624d63ea0aaef7113527c6'
  return getPrice(USDT, '1')
}

const getWethPrice = () => {
  const WETH = '0x28c9d3e689b5d3629afc2d69ef6a2799578574e0'
  return getPrice(WETH)
}

const getTswapPrice = () => {
  const TSWAP = '0xdf75176bc2cf8acbd6c8c199622c85aa4f0195fb'
  return getPrice(TSWAP)
}

export {
  getFtmPrice,
  getUSDCPrice,
  getUSDTPrice,
  getWethPrice,
  getTswapPrice,

  getData,
  getPrice,
  getPetalPrice,
  getTulipPrice,
  getRosePrice,
  getOapePrice,
  getDunePrice,
  getYuzuPrice,
}
