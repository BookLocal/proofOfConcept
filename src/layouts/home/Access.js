import React, { Component } from 'react';
import Web3 from 'web3';

let access;
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));

let RRAbi = require('../../../abis/RoomRentingAbi.js');
let RRAddress = '0x9fbda871d559710256a2502a2517b794b482db40';
let RR = web3.eth.contract(RRAbi).at(RRAddress);


class Access extends Component{
  constructor(props){
    super(props)
    this.state = {
      tokenId : '',
      access : '',
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
    console.log("Access fired!");
    access = RR.checkAvailable(this.state.tokenId);
    access = String(access);
    console.log(access);
    this.setState({
      access: access,
    });
  }

  render(){
    return(
      <div className="Access">
        <fieldset>
          <legend>Access</legend>
            <label>Room Id:
              <input id="tokenId" type="text" onChange={this.handleTextChange} value={this.state.tokenId} />
              <input id="search" type="submit" value="Gain Access" onClick={this.handleSubmit} />
              {this.state.access}
            </label>
        </fieldset>
      </div>
    )
  }
}

export default Access
