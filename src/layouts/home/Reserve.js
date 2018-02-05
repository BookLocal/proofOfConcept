import React, { Component } from 'react';
import Web3 from 'web3';

let reserve;
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));

let RRAbi = require('../../../abis/RoomRentingAbi.js');
let RRAddress = '0x9fbda871d559710256a2502a2517b794b482db40';
let RR = web3.eth.contract(RRAbi).at(RRAddress);


class Reserve extends Component{
  constructor(props){
    super(props)
    this.state = {
      tokenId : '',
      start: '',
      stop: '',
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
    console.log("Reserve fired!");
    reserve = RR.reserve(this.state.tokenId, this.state.start, this.state.stop,{from: web3.eth.accounts[0], gas: 3000000});
    console.log(reserve);
  }

  render(){
    return(
      <div className="Reserve">
        <fieldset>
          <legend>Reserve Your Room</legend>
            <label>Room Id:
              <input id="tokenId" type="text" onChange={this.handleTextChange} value={this.state.tokenId} />
              Start:
              <input id="start" type="text" onChange={this.handleTextChange} value={this.state.start} />
              Stop:
              <input id="stop" type="text" onChange={this.handleTextChange} value={this.state.stop} />
              <input id="search" type="submit" value="Reserve" onClick={this.handleSubmit} />
              {this.state.availability}
            </label>
        </fieldset>
      </div>
    )
  }
}

export default Reserve
