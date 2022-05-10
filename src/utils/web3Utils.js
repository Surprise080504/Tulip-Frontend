import { createContext, useEffect, useState, useContext } from 'react'
import { useWallet } from 'use-wallet'
import Web3 from 'web3'

const Web3Context = createContext(null)

const useWeb3 = () => {
  const web3Context = useContext(Web3Context)

  if (web3Context === null) {
    throw new Error('useWeb3 can only be used inside UseWeb3Provider')
  }

  return web3Context.web3
}

const UseWeb3Provider = ({ children }) => {
  const { ethereum } = useWallet()
  const [web3, setWeb3] = useState(null)
  const web3Context = useContext(Web3Context)

  useEffect(async () => {
    if (ethereum) {
      setWeb3(new Web3(ethereum))
    }
  }, [ethereum])

  if (web3Context !== null) {
    throw new Error('UseWeb3Provider already declared, this must be a singleton')
  }

  return (
    <Web3Context.Provider value={{ web3 }}>
      {children}
    </Web3Context.Provider>
  )
}

export { useWeb3, UseWeb3Provider }
