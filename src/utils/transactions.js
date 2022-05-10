import ERC20ABI from 'abis/ERC20'
import { TULIP_ADDRESS, PETAL_ADDRESS } from 'config/constants'

const PAIR_ADDRESS = '0x'

const getTulipBalance = async (web3, address) => {
  const erc20 = new web3.eth.Contract(ERC20ABI, TULIP_ADDRESS)
  return erc20.methods.balanceOf(address).call()
}

const getPetalBalance = async (web3, address) => {
  const erc20 = new web3.eth.Contract(ERC20ABI, PETAL_ADDRESS)
  return erc20.methods.balanceOf(address).call()
}

const getTokenBalance = async (web3, tokenAddress, address) => {
  const erc20 = new web3.eth.Contract(ERC20ABI, tokenAddress)
  return erc20.methods.balanceOf(address).call()
}

const doApprove = async (web3, tokenAddress, spender) => {
  const accounts = await web3.eth.getAccounts()
  const address = accounts[0]
  const c = new web3.eth.Contract(
    ERC20ABI,
    tokenAddress)
  c.methods.approve(spender, web3.utils.toWei('100', 'tether')).send({
    from: address,
    gas: 1000000
  })
}

const approvePetal = async (web3, spender) => {
  doApprove(web3, PETAL_ADDRESS, spender)
}

const approveTulip = async (web3, spender) => {
  doApprove(web3, TULIP_ADDRESS, spender)
}

const approvePair = async (web3, spender) => {
  doApprove(web3, PAIR_ADDRESS, spender)
}

const getAllowance = async (web3, tokenAddress, address, spender) => {
  const c = new web3.eth.Contract(
    ERC20ABI,
    tokenAddress)
  const allowance = await c.methods.allowance(address, spender).call()
  return allowance
}

const getIsApproved = async (web3, tokenAddress, address, spender) => {
  const c = new web3.eth.Contract(
    ERC20ABI,
    tokenAddress)
  const allowance = await c.methods.allowance(address, spender).call()
  return allowance > 10 ** 20
}

const isPetalApproved = async (web3, address, spender) => {
  return await getIsApproved(web3, PETAL_ADDRESS, address, spender)
}

const isTulipApproved = async (web3, address, spender) => {
  return await getIsApproved(web3, TULIP_ADDRESS, address, spender)
}

const isPairApproved = async (web3, address, spender) => {
  return await getIsApproved(web3, PAIR_ADDRESS, address, spender)
}

export {
  approvePair,
  getTulipBalance,
  getPetalBalance,
  approvePetal,
  approveTulip,
  isPetalApproved,
  isTulipApproved,
  isPairApproved,
  getTokenBalance,
  doApprove,
  getIsApproved,
  getAllowance,
}
