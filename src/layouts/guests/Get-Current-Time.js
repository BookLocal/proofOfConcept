import React, { Component } from 'react';
import Web3 from 'web3';

let getCurrentTime;
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));

let RRAbi = require('../../../abis/RoomRentingAbi.js');
let RRAddress = '0x345ca3e014aaf5dca488057592ee47305d9b3e10';
let RR = web3.eth.contract(RRAbi).at(RRAddress);


class GetCurrentTime extends Component{
  constructor(props){
    super(props)
    this.state = {
      tokenId : '',
      getCurrentTime : '',
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
    console.log("GetCurrentTime fired!");
    getCurrentTime = RR.getCurrentTime(this.state.tokenId);
    console.log(getCurrentTime);
    getCurrentTime = String(getCurrentTime);
    console.log(getCurrentTime);
    this.setState({
      getCurrentTime: getCurrentTime,
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
    }
    const getStyle={
      textDecoration: 'overline underline',
      border: '10px #F4BE41',
      borderWidth: '10px',
      backgroundColor: 'white',
      textAlign: 'center',
      fontSize: '40px',
      color: '#3973B5'
    }
    const fieldset={
      border: '2px solid #F4BE41'
    }
    const roomStyle={
    border: "2px solid #383838",
    borderTop: "2px solid red",
    backgroundColor: "white",
  }
    return(
      <div style={style} className="GetCurrentTime">
        <fieldset style={fieldset}>
          <legend style={getStyle}>GetCurrentTime</legend>
            <label style={roomStyle}>Room Id:
              <input id="tokenId" type="text" onChange={this.handleTextChange} value={this.state.tokenId} />
              <hr />
              <input id="search" type="submit" value="Get Current Time" onClick={this.handleSubmit} />
              {this.state.getCurrentTime}
            </label>
        </fieldset>
      </div>
    )
  }
}

export default GetCurrentTime
