import React, { useState, useEffect } from 'react'
import { useWeb3 } from 'utils/web3Utils'
import UpgradeTswap from 'abis/UpgradeTswap.json'
import ERC20ABI from 'abis/ERC20.json'
import useWallet from 'use-wallet'

const UPGRADER_ADDRESS = '0x110EaE79ebA009c8A277368a70503C7f5aBE5302'
const OLD_TSWAP_ADDRESS = '0x87b2cb871274e7ec5856a89d2f82259e498df338'
const NEW_TSWAP_ADDRESS = '0xac476FF13D6902484721e650eCa3b9f962b280fD'

export function Upgrader () {
  const [isApproved, setIsApproved] = useState(false)
  const { address } = useWallet()

  const web3 = useWeb3()
  useEffect(() => {
    if (web3) {
      getIsApproved()
    }
  }, [web3])

  const doApprove = async () => {
    const accounts = await web3.eth.getAccounts()
    const address = accounts[0]
    const c = new web3.eth.Contract(
      ERC20ABI,
      OLD_TSWAP_ADDRESS)
    c.methods.approve(UPGRADER_ADDRESS, web3.utils.toWei('1000', 'tether')).send({
      from: address,
      gas: 1000000,
      gasPrice: 10 ** 11,
    }).then((allowance) => {
      getIsApproved()
    })
  }

  const getIsApproved = async () => {
    if (!web3) {
      return
    }
    const accounts = await web3.eth.getAccounts()
    const address = accounts[0]
    const c = new web3.eth.Contract(
      ERC20ABI,
      OLD_TSWAP_ADDRESS)
    await c.methods.allowance(address, UPGRADER_ADDRESS).call().then(async (allowance) => {
      console.log('allowance', allowance)
      setIsApproved(allowance > 10 ** 18)
    })
  }

  const doSwap = async () => {
    const accounts = await web3.eth.getAccounts()
    const address = accounts[0]
    const c = new web3.eth.Contract(
      UpgradeTswap.abi,
      UPGRADER_ADDRESS)
    await c.methods.upgradeTokens().send({
      from: address,
      gas: 1000000,
      gasPrice: 10 ** 11,
    })
  }

  return (
    <div>
      <div style={{ color: 'white' }}>
        UPGRADE TSWAP TO NEW VERSION
      </div>
      <div style={{ marginTop: '30px' }}>
        {!isApproved ? <button onClick={doApprove}> APPROVE </button> : <button onClick={doSwap}>SWAP</button>}
      </div>
    </div>
  )
}
