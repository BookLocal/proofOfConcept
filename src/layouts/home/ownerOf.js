import React, { Component } from 'react';
import Web3 from 'web3';

let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"))

let RRAbi = require('../../../abis/RoomRentingAbi.js');
let RRAddress = '0x9fbda871d559710256a2502a2517b794b482db40';
let RR = web3.eth.contract(RRAbi).at(RRAddress);


class OwnerOf extends Component{

  render(){
    return(
      <div className="roomInfo">
        <fieldset>
          <legend>Room Details</legend>
          <input>Room ID: {this.props.roomId}</input>
          <p>Owner: {this.props.hotelId}</p>
        </fieldset>
      </div>
    )
  }
}

export default RoomInfo
