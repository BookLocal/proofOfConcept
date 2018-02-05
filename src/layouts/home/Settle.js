import React, { Component } from 'react';
import Web3 from 'web3';

let settle;
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));

let RRAbi = require('../../../abis/RoomRentingAbi.js');
let RRAddress = '0x9fbda871d559710256a2502a2517b794b482db40';
let RR = web3.eth.contract(RRAbi).at(RRAddress);


class Settle extends Component{
  constructor(props){
    super(props)
    this.state = {
      tokenId : '',
      settle : '',
    }

    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleTextChange=this.handleTextChange.bind(this);
  }

  handleTextChange = (event) => {
    if(this.state[event.target.id] !== undefined){
      this.setState({[event.target.id]: event.target.value});
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Settle fired!");
    settle = RR.settle(this.state.tokenId);
    settle = String(settle);
    console.log(settle);
    this.setState({
      settle: settle,
    });
  }

  render(){
    return(
      <div className="Settle">
        <fieldset>
          <legend>Settle</legend>
            <label>Room Id:
              <input id="tokenId" type="text" onChange={this.handleTextChange} value={this.state.tokenId} />
              <input id="submit" type="submit" value="Settle up" onClick={this.handleSubmit} />
              {this.state.settle}
            </label>
        </fieldset>
      </div>
    )
  }
}

export default Settle
