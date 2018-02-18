import React, { Component } from 'react';
import Web3 from 'web3';

let addAccessCode;
let web3 = window.web3
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

class AddAccessCode extends Component{
  constructor(props){
    super(props)
    this.state = {
      addAccessCode : ''
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
    console.log("addAccessCode fired!");
    addAccessCode = RR.addAccessCode(
      web3.fromAscii(this.state.addAccessCode,32),
      (err,res)=>{
        if(err){
          console.log("there is an error with the callback");
        } else {
        console.log("success!");
        }
        console.log(res);
      }
    );
    console.log(addAccessCode);
    this.setState({
      addAccessCode: addAccessCode,
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
    <div style={style} className="AddAccessCode">
      <fieldset style={fieldset}>
        <legend style={legendStyle}>AccessCode</legend>
          <label style={labelStyle}>AccessCode:
            <input id="addAccessCode" type="text" onChange={this.handleTextChange} value={this.state.addAccessCode} />
            <hr />
            <input id="submit" type="submit" value="AddAccess" onClick={this.handleSubmit} />
            {this.state.addAccessCode}
          </label>
      </fieldset>
    </div>
  )
}
}


export default AddAccessCode
