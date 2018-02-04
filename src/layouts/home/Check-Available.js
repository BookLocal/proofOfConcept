import React, { Component } from 'react';
import Web3 from 'web3';

let tokenId, time, available;
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));

let RRAbi = require('../../../abis/RoomRentingAbi.js');
let RRAddress = '0x9fbda871d559710256a2502a2517b794b482db40';
let RR = web3.eth.contract(RRAbi).at(RRAddress);


class CheckAvailable extends Component{
  constructor(props){
    super(props)
    this.state = {
      tokenId : '',
      time: '',
      availability: '',
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
    console.log("CheckAvailable fired!");
    available = RR.checkAvailable(this.state.tokenId, this.state.time);
    available = String(available);
    console.log(available);
    this.setState({
      availability: available,
    });
  }

  render(){
    return(
      <div className="CheckAvailable">
        <fieldset>
          <legend>Check availability</legend>
            <label>Room Id:
              <input id="tokenId" type="text" onChange={this.handleTextChange} value={this.state.tokenId} />
              Time:
              <input id="time" type="text" onChange={this.handleTextChange} value={this.state.time} />
              <input id="search" type="submit" value="Check Availability" onClick={this.handleSubmit} />
              {this.state.availability}
            </label>
        </fieldset>
      </div>
    )
  }
}

export default CheckAvailable
