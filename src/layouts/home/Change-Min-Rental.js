import React, { Component } from 'react';
import Web3 from 'web3';

let available;
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));

let RRAbi = require('../../../abis/RoomRentingAbi.js');
let RRAddress = '0x9fbda871d559710256a2502a2517b794b482db40';
let RR = web3.eth.contract(RRAbi).at(RRAddress);


class ChangeMinRental extends Component{
  constructor(props){
    super(props)
    this.state = {
      tokenId : '',
      minRental: '',
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
    console.log("ChangeMinRental fired!");
    available = RR.changeMinRental(this.state.tokenId, this.state.minRental, {from: web3.eth.accounts[0], gas: 3000000});
    available = String(available);
    console.log(available);
    this.setState({
      availability: available,
    });
  }

  render(){
    return(
      <div className="ChangeMinRental">
        <fieldset>
          <legend>Change Minimum Rental Period</legend>
            <label>Room Id:
              <input id="tokenId" type="text" onChange={this.handleTextChange} value={this.state.tokenId} />
              Minimum Rental Period:
              <input id="minRental" type="text" onChange={this.handleTextChange} value={this.state.minRental} />
              <input id="search" type="submit" value="Change Minimum Rental Time" onClick={this.handleSubmit} />
              {this.state.availability}
            </label>
        </fieldset>
      </div>
    )
  }
}

export default ChangeMinRental
