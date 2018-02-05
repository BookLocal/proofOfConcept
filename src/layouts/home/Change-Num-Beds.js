import React, { Component } from 'react';
import Web3 from 'web3';

let available;
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));

let RRAbi = require('../../../abis/RoomRentingAbi.js');
let RRAddress = '0x9fbda871d559710256a2502a2517b794b482db40';
let RR = web3.eth.contract(RRAbi).at(RRAddress);


class ChangeNumBeds extends Component{
  constructor(props){
    super(props)
    this.state = {
      tokenId : '',
      numBeds: '',
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
    console.log("ChangeNumBeds fired!");
    available = RR.changeNumBeds(this.state.tokenId, this.state.numBeds, {from: web3.eth.accounts[0], gas: 3000000});
    available = String(available);
    console.log(available);
    this.setState({
      availability: available,
    });
  }

  render(){
    return(
      <div className="ChangeNumBeds">
        <fieldset>
        <legend>Change Number of Beds</legend>
            <label>Room Id:
              <input id="tokenId" type="text" onChange={this.handleTextChange} value={this.state.tokenId} />
              Number of Beds:
              <input id="numBeds" type="text" onChange={this.handleTextChange} value={this.state.numBeds} />
              <input id="search" type="submit" value="Change Number of Beds" onClick={this.handleSubmit} />
              {this.state.availability}
            </label>
        </fieldset>
      </div>
    )
  }
}

export default ChangeNumBeds
