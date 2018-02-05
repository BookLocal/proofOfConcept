import React, { Component } from 'react';
import Web3 from 'web3';

let cancelReservation;
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));

let RRAbi = require('../../../abis/RoomRentingAbi.js');
let RRAddress = '0x9fbda871d559710256a2502a2517b794b482db40';
let RR = web3.eth.contract(RRAbi).at(RRAddress);


class CancelReservation extends Component{
  constructor(props){
    super(props)
    this.state = {
      tokenId : '',
      start: '',
      stop: '',
      reserved: '',
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
    console.log("Cancel Reservation fired!");
    cancelReservation = RR.cancelReservation(this.state.tokenId, this.state.start, this.state.stop, {from: web3.eth.accounts[0], gas: 3000000});
    console.log(cancelReservation);
    this.setState({
      reserved: cancelReservation
    });
  }

  render(){
    return(
      <div className="CancelReservation">
        <fieldset>
          <legend>Cancel Your Room</legend>
            <label>Room Id:
              <input id="tokenId" type="text" onChange={this.handleTextChange} value={this.state.tokenId} />
              Start:
              <input id="start" type="text" onChange={this.handleTextChange} value={this.state.start} />
              Stop:
              <input id="stop" type="text" onChange={this.handleTextChange} value={this.state.stop} />
              <input id="search" type="submit" value="Cancel Reservation" onClick={this.handleSubmit} />
              {this.state.reserved}
            </label>
        </fieldset>
      </div>
    )
  }
}

export default CancelReservation
