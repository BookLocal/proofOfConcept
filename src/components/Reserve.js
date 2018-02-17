import React, { Component } from 'react';
import Web3 from 'web3';

let reserve;
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));

let RRAbi = require('../../abis/RoomRentingAbi.js');
let RRAddress = '0x345ca3e014aaf5dca488057592ee47305d9b3e10';
let RR = web3.eth.contract(RRAbi).at(RRAddress);


class Reserve extends Component{
  constructor(props){
    super(props)
    this.state = {
      tokenId : '',
      start: '',
      stop: '',
      accessCode: '',
      availability: ''
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
    console.log("("+web3.toBigNumber(this.state.tokenId)+","+web3.toBigNumber(this.state.start)+","+web3.toBigNumber(this.state.stop)+","+web3.fromAscii(this.state.accessCode,32)+",{from: "+web3.eth.accounts[0]+", gas: 3000000}");
    reserve = RR.reserve(
      web3.toBigNumber(this.state.tokenId),
      web3.toBigNumber(this.state.start),
      web3.toBigNumber(this.state.stop),
      web3.fromAscii(this.state.accessCode,32),
      {from: web3.eth.accounts[0], gas: 3000000},
      (err,res) => {
        if(err){
          console.log(
            'availability: "false"'
          );
          this.setState({
            availability: "Oops! Something went wrong :-("
          })
        }
        console.log(
          'availability: "true"'
        );
        console.log(res);
        this.setState({
          availability: "Success!"
        });
      }
    );
    console.log(reserve);
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
    const fieldset={
      border: '2px solid #F4BE41'
    }
    const legendStyle={
      textDecoration: 'overline underline',
      border: '10px #F4BE41',
      borderWidth: '10px',
      backgroundColor: 'white',
      textAlign: 'center',
      fontSize: '40px',
      color: '#3973B5'
    }
    const labelStyle={
      border: "2px solid #383838",
      borderTop: "2px solid red",
      backgroundColor: "white",
    }
    return(
      <div style={style} className="Reserve">
        <fieldset style={fieldset}>
          <legend style={legendStyle}>Reserve Your Room</legend>
            <label style={labelStyle}>Room Id:
              <input id="tokenId" type="text" onChange={this.handleTextChange} value={this.state.tokenId} />
            <div style={labelStyle}> Start: </div>
              <input id="start" type="text" onChange={this.handleTextChange} value={this.state.start} />
            <div style={labelStyle}> Stop: </div>
              <input id="stop" type="text" onChange={this.handleTextChange} value={this.state.stop} />
            <div style={labelStyle}> Access Code: </div>
              <input id="accessCode" type="text" onChange={this.handleTextChange} value={this.state.accessCode} />
            <hr />
            <input id="search" type="submit" value="Reserve" onClick={this.handleSubmit} />
            {this.state.availability}
          </label>
        </fieldset>
      </div>
    )
  }
}

export default Reserve
