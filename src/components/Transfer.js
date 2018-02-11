import React, { Component } from 'react';
import Web3 from 'web3';

let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"))

let RRAbi = require('../../../abis/RoomRentingAbi.js');
let RRAddress = '0x345ca3e014aaf5dca488057592ee47305d9b3e10';
let RR = web3.eth.contract(RRAbi).at(RRAddress);


class Transfer extends Component{
  constructor(props){
    super(props)
    this.state = {
      transferTo : '',
      tokenId : '',
      ownerOf : '',
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
    RR.transfer(this.state.transferTo, this.state.tokenId);
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
    const transferStyle={
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
    const labelStyle={
      border: "2px solid #383838",
      borderTop: "2px solid red",
      backgroundColor: "white"
    }

    return(
      <div style={style} className="Transfer">
        <fieldset style={fieldset}>
          <legend style={transferStyle}>Transfer</legend>
            <label>
          <div style={labelStyle}> Transfer to address: </div>
              <input id="transferTo" type="text" onChange={this.handleTextChange} value={this.state.transferTo} />
          <div style={labelStyle}> Transfer Token Id: </div>
              <input id="tokenId" type="text" onChange={this.handleTextChange} value={this.state.tokenId} />
              <hr />
              <input id="search" type="submit" value="Transfer" onClick={this.handleSubmit} />
              {this.state.ownerOf}
            </label>
        </fieldset>
      </div>
    )
  }
}

export default Transfer
