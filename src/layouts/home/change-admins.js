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
    const style={
      backgroundColor: '#4D4D4D',
      padding: '20px',
      fontWeight: 'bold',
      width: '450px',
      border: '50px',
      margin: '200px',
      marginTop: '5px',
      marginBottom: '5px',
      clear: 'both',
      float: 'left',
      paddingTop: '50px',
      paddingRight: '50px',
      paddingBottom: '50px',
      paddingLeft: '50px'
    }
    const cooStyle={
      border: "2px solid #383838",
      borderTop: "2px solid red",
      backgroundColor: "white",
      textAlign: 'left'
    }
    const fieldset={
        border: '2px solid #F4BE41'
    }
    const  officerStyle={
      textDecoration: 'overline underline',
      border: '10px #F4BE41',
      borderWidth: '10px',
      backgroundColor: 'white',
      textAlign: 'center',
      fontSize: '40px',
      color: '#3973B5'
    }
    const cfoStyle={
      border: "2px solid #383838",
      borderTop: "2px solid red",
      backgroundColor: "white",
      textAlign: 'left'
    }
    const formStyle = {
      "backgroundColor": "",
      "flexGrow": 1,
    };
    return (
      <div style={style}className="ChangeOfficersForm">
        <fieldset style={fieldset}>
          <legend style={officerStyle}>Change Officers</legend>
          <form style={formStyle}>
            <p style={cfoStyle}>
              CFO:
              <input id="cfo" onChange={this.handleTextChange} type="text" value={this.state.cfo} />
            </p>
            <p style={cooStyle}>
              COO:
              <input id="coo" onChange={this.handleTextChange} type="text" value={this.state.coo} />
            </p>
            <hr />
            <input id="submit" type="submit" value="Submit" onClick={this.handleSubmit}/>
          </form>
        </fieldset>
      </div>
    );
  }
}

export default ChangeOfficersForm
