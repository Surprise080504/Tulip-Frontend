import ERC20ABI from 'abis/ERC20.json'

export class BouquetModel {
  constructor (web3, vaultAddress, wantAddress) {
    this.web3 = web3
    this.vaultAddress = vaultAddress
    this.wantAddress = wantAddress
    this.bouquet = null
    this.wantToken = new web3.eth.Contract(ERC20ABI, wantAddress)
  }

  async doApprove () {
    const accounts = await this.web3.eth.getAccounts()
    const address = accounts[0]
    return this.wantToken.methods.approve(this.vaultAddress, this.web3.utils.toWei('100', 'tether')).send({
      from: address,
      gas: 1000000,
      gasPrice: 10 ** 11,
    })
  }

  async doWithdraw () {
    return null
  }

  async doWithdrawAll () {
    return null
  }

  async compound () {
    return null
  }

  async getLpBalance () {
    return 0
  }

  async getDeposited () {
    return 0
  }

  async getStaked () {
    return 0
  }

  async getAllowance () {
    const accounts = await this.web3.eth.getAccounts()
    const address = accounts[0]
    return this.wantToken.methods.allowance(address, this.vaultAddress).call().then(console.log)
  }
}
