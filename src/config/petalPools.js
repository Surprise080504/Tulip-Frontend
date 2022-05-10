import {
  OLD_TULIP_ADDRESS,
  OLD_BUD_ADDRESS,
  OLD_PETAL_ADDRESS,
  GENESIS_POOLS_ADDRESS,
  USDT_ADDRESS,
  WROSE_ADDRESS,
  TSWAP_ADDRESS,
} from 'config/constants'
import PetalGenesisRewardPool from 'abis/PetalGenesisRewardPool.json'
import PETAL_LOGO from 'assets/img/petal.png'

const CHEF_ADDRESS = '0x096132Bd5645E8C88dDBa70E29408e71abf2C909'

export const LiquidationPools = {
  OldPetalGenesisPool: {
    abi: PetalGenesisRewardPool.abi,
    address: CHEF_ADDRESS,
    logo: PETAL_LOGO,
    pool: 'OldPetalGenesisPool',
    icon: '',
    name: 'Deposit $OLD-PETAL & Earn $PTL',
    depositToken: 'OLD-PETAL',
    earnToken: 'PTL',
    _pid: 0,
    tokenName: 'OLD-PETAL',
    depositTokenAddress: OLD_PETAL_ADDRESS,
    finished: false,
    closedForStaking: false,
    RATIO: 100 / 100,
  },
}

export default LiquidationPools
