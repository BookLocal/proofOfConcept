import React, { Component } from 'react';
import '../../App.css';
import './EthMemphis-Reservations.css';
import Web3 from 'web3';
import Reserve from '../../components/Reserve.js';
import TextInput from '@aragon/ui';
import Field from '@aragon/ui';

class EthMemphis extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  textInput = () => (
    <TextInput type="text" />
  )
  fieldLabel = () => (
    <Field label="Enter name here:">
      <input />
    </Field>
  )

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <div className="spinner">
            <h1>ETHMemphis Reservation Page</h1>

            <div className="Container">
              <Reserve />
            </div>
            <img id="loader" src='https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif' role="presentation"/>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default EthMemphis
