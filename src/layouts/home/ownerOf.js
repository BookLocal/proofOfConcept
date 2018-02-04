import React, { Component } from 'react';
import Web3 from 'web3';

let ownerOf;
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"))

let RRAbi = require('../../../abis/RoomRentingAbi.js');
let RRAddress = '0x9fbda871d559710256a2502a2517b794b482db40';
let RR = web3.eth.contract(RRAbi).at(RRAddress);


class OwnerOf extends Component{
  constructor(props){
    super(props)
    this.state = {
      ownerOfSearchBox : 0,
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
    console.log("OwnerOf Search fired!");
    ownerOf = RR.ownerOf(this.state.roomId);
    console.log(ownerOf);
    this.setState({
      ownerOf: ownerOf,
    })
  }

  render(){
    return(
      <div className="OwnerOf">
        <fieldset>
          <legend>Room Owner</legend>
            <label>Room Id:
              <input id="ownerOfSearchBox" type="text" onChange={this.handleTextChange} value={this.state.roomId} />
              <input id="search" type="submit" value="Search" onClick={this.handleSubmit} />
              {this.state.ownerOf}
            </label>
        </fieldset>
      </div>
    )
  }
}

export default OwnerOf
