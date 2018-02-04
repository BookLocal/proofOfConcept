import React, { Component } from 'react';
import Web3 from 'web3';

let transferTo, tokenId, payload;
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"))

let RRAbi = require('../../../abis/RoomRentingAbi.js');
let RRAddress = '0x9fbda871d559710256a2502a2517b794b482db40';
let RR = web3.eth.contract(RRAbi).at(RRAddress);


class Approve extends Component{
  constructor(props){
    super(props)
    this.state = {
      transferTo : '',
      tokenId : '',
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
    console.log("Transfer fired!");
    RR.approve(this.state.transferTo, this.state.tokenId);
  }

  render(){
    return(
      <div className="approve">
        <fieldset>
          <legend>Approve</legend>
            <label>Transfer to address:
              <input id="transferTo" type="text" onChange={this.handleTextChange} value={this.state.transferTo} />
              Transfer Token Id:
              <input id="tokenId" type="text" onChange={this.handleTextChange} value={this.state.tokenId} />
              <input id="search" type="submit" value="Approve" onClick={this.handleSubmit} />
              {this.state.ownerOf}
            </label>
        </fieldset>
      </div>
    )
  }
}

export default Approve
