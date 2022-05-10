import * as React from 'react'
import { Button } from 'react-bootstrap'

const ConnectButton = (props) => (
  <Button
      {...props}
      size="lg"
      style={{
        border: 'none',
        backgroundColor: '#80C9B8',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      }}
      disabled={props.disabled}
  >
    {'Connect Wallet'}
  </Button>
)

ConnectButton.defaultProps = {
  disabled: false,
  icon: null,
}

export default ConnectButton
