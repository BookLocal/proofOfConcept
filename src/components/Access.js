import React, { Component } from 'react';
import Web3 from 'web3';

let access;
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));

let RRAbi = require('../../abis/RoomRentingAbi.js');
let RRAddress = '0x345ca3e014aaf5dca488057592ee47305d9b3e10';
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
    access = RR.access(web3.toBigNumber(this.state.tokenId));
    console.log(access);
    this.setState({
      access: access,
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
      <div style={style} className="Access">
        <fieldset style={fieldset}>
          <legend style={legendStyle}>Access</legend>
            <label style={labelStyle}>Room Id:
              <input id="tokenId" type="text" onChange={this.handleTextChange} value={this.state.tokenId} />
              <hr />
              <input id="search" type="submit" value="Gain Access" onClick={this.handleSubmit} />
              {this.state.access}
            </label>
        </fieldset>
      </div>
    )
  }
}

export default Access
