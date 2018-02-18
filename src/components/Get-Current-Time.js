import React, { Component } from 'react';
import Web3 from 'web3';
let response;
let web3 = window.web3;
// stolen code zone vvv

if (typeof web3 !== 'undefined') {
  // Use Mist/MetaMask's provider
  web3 = new Web3(window.web3.currentProvider);
  console.log("first case");
} else {
  console.log('No web3? You should consider trying MetaMask!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
}

let RRAbi = require('../../abis/RoomRentingAbi.js');
let RRAddress = require('../../Contract-Addresses/Rinkeby-Address.js');
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
    this.getTime=this.getTime.bind(this);
  }

  handleTextChange = (event) => {
    if(this.state[event.target.id] !== undefined){
      this.setState({[event.target.id]: event.target.value});
    }
  }

  getTime = () => {
    console.log("GetCurrentTime fired!");
    RR.getCurrentTime(this.state.tokenId, (err,res)=>{
      if(err){
        console.log("there is an error with the callback");
      }
      console.log("success!");
      response = Number(res);
      console.log(res);
    });
    console.log(response);
    this.setState({
      getCurrentTime: response,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.getTime();
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
              <input
                id="tokenId"
                type="text"
                ref={(input) => {this.getCurrentTime = input}}
                onChange={this.handleTextChange}
                value={this.state.tokenId}
                onClick={this.handleSubmit}
              />
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
