import React from 'react'
import { Button } from 'react-bootstrap'

const WalletCard = ({ icon, onConnect, title }) => (
  <Button fullwidth="true" onClick={onConnect} className="wallet-button">
    <span style={{ marginRight: '1rem', height: '2rem' }}>{icon}</span>
    <span>{title}</span>
  </Button>
)

export default WalletCard
