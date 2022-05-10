import { PETAL_ADDRESS, TULIP_ADDRESS } from 'config/constants'
import GARDEN_ABI from 'abis/Garden.json'
import ERC20ABI from 'abis/ERC20.json'
import OracleABI from 'abis/Oracle.json'
import TREASURY_ABI from 'abis/Treasury.json'

const GARDEN_ADDRESS = '0x'
const ORACLE_ADDRESS = '0x'
const TREASURY_ADDRESS = '0x'

const getBalance = (balance) => {
  return balance / (10 ** 18)
}

const getDisplayBalance = (balance) => {
  return getBalance(balance)
}

export class GardenModel {
  constructor (web3) {
    this.web3 = web3
    this.garden = new web3.eth.Contract(GARDEN_ABI.abi, GARDEN_ADDRESS)
    this.treasury = new web3.eth.Contract(TREASURY_ABI.abi, TREASURY_ADDRESS)
  }

  async getStakedBalance () {
    const accounts = await this.web3.eth.getAccounts()
    const address = accounts[0]
    return this.garden.methods.balanceOf(address).call()
  }

  async getTotalSupply () {
    return this.garden.methods.totalSupply().call()
  }

  async stake (depositValue) {
    const accounts = await this.web3.eth.getAccounts()
    const address = accounts[0]
    return this.garden.methods.stake(this.web3.utils.toWei(depositValue, 'ether')).send({
      from: address,
      gasLimit: 3000000,
    })
  }

  async getAnnualPercentageRate (petalPrice, tulipPrice) {
    const latestSnapshotIndex = await this.garden.methods.latestSnapshotIndex().call()
    const lastHistory = await this.garden.methods.masonryHistory(latestSnapshotIndex).call()
    const lastRewardsReceived = lastHistory[1]

    const epochRewardsPerShare = lastRewardsReceived / 1e18

    const petal = new this.web3.eth.Contract(
      ERC20ABI,
      PETAL_ADDRESS,
    )
    const gardenPetalBalanceOf = await petal.methods.balanceOf(GARDEN_ADDRESS).call()

    // Mgod formula
    const amountOfRewardsPerDay = epochRewardsPerShare * Number(tulipPrice) * 4
    const masonryTVL = Number(getDisplayBalance(gardenPetalBalanceOf)) * Number(petalPrice)
    return ((amountOfRewardsPerDay * 100) / masonryTVL) * 365
  }

  async getPrice () {
    const c = new this.web3.eth.Contract(
      OracleABI.abi,
      ORACLE_ADDRESS,
    )
    return c.methods.twap(TULIP_ADDRESS, this.web3.utils.toWei('1', 'ether')).call()
  }

  async getStaked () {
    return this.garden.methods.balanceOf(GARDEN_ADDRESS).call()
  }

  async doApprove () {
    const accounts = await this.web3.eth.getAccounts()
    const address = accounts[0]
    const c = new this.web3.eth.Contract(ERC20ABI, PETAL_ADDRESS)
    return c.methods.approve(GARDEN_ADDRESS, this.web3.utils.toWei('100', 'tether')).send({
      from: address,
      gas: 1000000
    })
  }

  async getAllowance () {
    const accounts = await this.web3.eth.getAccounts()
    const address = accounts[0]
    const c = new this.web3.eth.Contract(
      ERC20ABI,
      PETAL_ADDRESS)
    return c.methods.allowance(address, GARDEN_ADDRESS).call({
      gas: 1000000
    })
  }

  async getCurrentEpoch () {
    return this.garden.methods.epoch().call()
  }

  async getNextAllocationTime () {
    return this.treasury.methods.nextEpochPoint().call()
      .then((nextEpochTimestamp) => new Date(nextEpochTimestamp * 1000))
  }

  async doClaimReward () {
    const accounts = await this.web3.eth.getAccounts()
    const address = accounts[0]
    return this.garden.methods.claimReward().send({
      from: address,
      gas: 1000000,
    })
  }

  async doExit () {
    const accounts = await this.web3.eth.getAccounts()
    const address = accounts[0]
    return this.garden.methods.exit().send({
      from: address,
      gas: 1000000,
    })
  }

  async doCanClaim () {
    const accounts = await this.web3.eth.getAccounts()
    const address = accounts[0]
    return this.garden.methods.canClaimReward(address).call()
  }

  async getEarnings () {
    const accounts = await this.web3.eth.getAccounts()
    const address = accounts[0]
    return this.garden.methods.earned(address).call()
  }

  async getBalance () {
    const accounts = await this.web3.eth.getAccounts()
    const address = accounts[0]
    const c = new this.web3.eth.Contract(ERC20ABI, PETAL_ADDRESS)
    return c.methods.balanceOf(address).call()
  }

  async getEpochStartTimer () {
    const accounts = await this.web3.eth.getAccounts()
    const address = accounts[0]
    return this.garden.methods.masons(address).call().then(x => x.epochTimerStart)
  }
}
