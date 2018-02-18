import React, { Component } from 'react';
import Web3 from 'web3';

let getRoomInfo, owner, renter, minRentTime, numBeds;
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));

let RRAbi = require('../../abis/RoomRentingAbi.js');
let RRAddress = '0x345ca3e014aaf5dca488057592ee47305d9b3e10';
let RR = web3.eth.contract(RRAbi).at(RRAddress);

class GetRoomInfo extends Component{
  constructor(props){
    super(props)
    this.state = {
      roomId : '',
      owner: '',
      renter: '',
      minRentTime: '',
      numBeds: ''
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
    getRoomInfo = RR.getRoomInfo(this.state.roomId);
    console.log(getRoomInfo);
    owner = String(getRoomInfo[0]).split(',');
    renter = String(getRoomInfo[1]).split(',');
    minRentTime = String(getRoomInfo[2]).split(',');
    numBeds = String(getRoomInfo[3]).split(',');
    this.setState({
      owner: owner,
      renter: renter,
      minRentTime: minRentTime,
      numBeds: numBeds
    });
  }

  render(){
    const style={
      backgroundColor: '#4D4D4D',
      padding: '10px',
      fontWeight: 'bold',
      width: '420px',
      marginTop: '5px',
      marginBottom: '5px',
      /*
      color: '',
      textAlign: '',
      border: '',
      margin: '',
      display: '',
      clear: '',
      float: '',
      paddingTop: '',
      paddingRight: '',
      paddingBottom: '',
      paddingLeft: ''
      */
    }
    const roomStyle={
      textDecoration: 'overline underline',
      border: '10px #F4BE41',
      borderWidth: '10px',
      backgroundColor: 'white',
      textAlign: 'center',
      fontSize: '40px',
      color: '#3973B5'
    }
    const superStyle={
      border: "2px solid #383838",
      borderTop: "2px solid red",
      backgroundColor: "white"
    }
    const fieldset={
        border: '2px solid #F4BE41'
    }
    return(
      <div style={style} className="GetRoomInfo">
        <fieldset style={fieldset}>
          <legend style={roomStyle}>Room Details</legend>
          <label>Room ID:
            <input id="roomId" type="text" onChange={this.handleTextChange} value={this.state.tokenId} />
            <input id="search" type="submit" value="Get Room Info" onClick={this.handleSubmit} />
          </label>
          <p style={superStyle}>Owner: {this.state.owner}</p>
          <p style={superStyle}>Renter: {this.state.renter}</p>
          <p style={superStyle}>Minimum Rent Time: {this.state.minRentTime}</p>
          <p style={superStyle}>Number of Beds: {this.state.numBeds}</p>
        </fieldset>
      </div>
    )
  }
}

export default GetRoomInfo
