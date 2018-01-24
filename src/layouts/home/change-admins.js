import React, { Component } from 'react';
import Web3 from 'web3';

let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"))

let RRAbi = require('../../../abis/RoomRentingAbi.js');
let RRAddress = '0x9fbda871d559710256a2502a2517b794b482db40';
let RR = web3.eth.contract(RRAbi).at(RRAddress);

class ChangeOfficersForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      cfo : this.props.cfo,
      coo : this.props.coo,
    }
    this.handleTextChange=this.handleTextChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  // componentWillMount(){
  //   this.setState() = {
  //     cfo : this.props.cfo,
  //     coo : this.props.coo,
  //   }
  // }

  handleTextChange = (event) => {
    if(this.state[event.target.id] !== undefined){
      this.setState({[event.target.id]: event.target.value});
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit fired!");
    let cfo = String(this.state.cfo);
    let coo = String(this.state.coo);
    RR.setCFO(cfo, {from: web3.eth.accounts[0], gas: 3000000});
    console.log("RR.setCFO fired!");
    RR.setCOO(coo, {from: web3.eth.accounts[0], gas: 3000000});
    console.log("RR.setCOO fired!");
    this.props.getCfo();
    this.props.getCoo();
    this.props.getBalance();
  }

  render() {
    const formStyle = {
      "backgroundColor": "deepskyblue",
      "flexGrow": 1,
    };
    return (
      <div className="ChangeOfficersForm">
        <fieldset>
          <legend>Change Officers</legend>
          <form style={formStyle}>
            <label>
              CFO:
              <input id="cfo" onChange={this.handleTextChange} type="text" value={this.state.cfo} />
            </label>
            <label>
              COO:
              <input id="coo" onChange={this.handleTextChange} type="text" value={this.state.coo} />
            </label>
            <hr />
            <input id="submit" type="submit" value="Submit" onClick={this.handleSubmit}/>
          </form>
        </fieldset>
      </div>
    );
  }
}

export default ChangeOfficersForm
