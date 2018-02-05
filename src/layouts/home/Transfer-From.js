import React, { Component } from 'react';
import Web3 from 'web3';

let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"))

let RRAbi = require('../../../abis/RoomRentingAbi.js');
let RRAddress = '0x9fbda871d559710256a2502a2517b794b482db40';
let RR = web3.eth.contract(RRAbi).at(RRAddress);


class TransferFrom extends Component{
  constructor(props){
    super(props)
    this.state = {
      transferFrom: '',
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
    console.log("TransferFrom fired!");
    RR.transferFrom(this.state.transferFrom, this.state.transferTo, this.state.tokenId);
  }

  render(){
    const style={
      backgroundColor: '#4D4D4D',
      color: '',
      textAlign: '',
      padding: '20px',
      fontWeight: 'bold',
      width: '450px',
      border: '50px',
      margin: '200px',
      marginTop: '5px',
      marginBottom: '5px',
      display: '',
      clear: 'both',
      float: 'left',
      paddingTop: '50px',
      paddingRight: '50px',
      paddingBottom: '50px',
      paddingLeft: '50px'
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
    const labelStyle={
      border: "2px solid #383838",
      borderTop: "2px solid red",
      backgroundColor: "white"
    }
    const fieldset={
      border: '2px solid #F4BE41'
    }
    return(
      <div style={style} className="transferFrom">
        <fieldset style={fieldset}>
          <legend style={transferStyle}>Transfer From</legend>
            <label>
            <div style={labelStyle}> Transfer from address: </div>
              <input id="transferFrom" type="text" onChange={this.handleTextChange} value={this.state.transferFrom} />
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

export default TransferFrom
