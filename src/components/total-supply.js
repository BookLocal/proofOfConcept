import React, { Component } from 'react';
import Web3 from 'web3';

let web3 = window.web3;

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

let totalSupply;
RR.totalSupply((err,res)=>{
  if(err){
    console.log("there is an error with the callback");
  }
  console.log("success!");
  console.log(Number(res));
  totalSupply = Number(res);
})
console.log(totalSupply);
console.log("totalSupply: " + totalSupply + " " + typeof totalSupply);

class TotalSupply extends Component{
  constructor(props){
    super(props)
    this.state = {
      totalSupply : totalSupply
    }

    this.getTotalSupply=this.getTotalSupply.bind(this);
  }

  getTotalSupply = () => {
    RR.totalSupply((err,res)=>{
      if(err){
        console.log("there is an error with the callback");
      }
      console.log("success!");
      console.log(Number(res));
      totalSupply = Number(res);
      this.setState({
        totalSupply: totalSupply
      })
    })
  }

  componentWillMount(){
    this.getTotalSupply();

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
    const totalStyle={
      textDecoration: 'overline underline',
      border: '10px #F4BE41',
      borderWidth: '10px',
      backgroundColor: 'white',
      textAlign: 'center',
      fontSize: '40px',
      color: '#3973B5'
    }
    const propStyle={
      border: "2px solid #383838",
      borderTop: "2px solid red",
      backgroundColor: "white",
    }
    const fieldset={
        border: '2px solid #F4BE41'
    }
    return(
      <div style={style} className="TotalSupply">
        <fieldset style={fieldset}>
          <legend style={totalStyle}>Total Supply</legend>
          <p style={propStyle}>{this.state.totalSupply}</p>
          <input type="submit" value="Get Total Supply" onClick={this.getTotalSupply} />
        </fieldset>
      </div>
    )
  }
}


export default TotalSupply
