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
    const roomStyle={
      textDecoration: 'overline underline',
      border: '10px #F4BE41',
      borderWidth: '10px',
      backgroundColor: 'white',
      textAlign: 'center',
      fontSize: '40px',
      color: '#3973B5'
    }
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
    const idStyle={
      border: "2px solid #383838",
      borderTop: "2px solid red",
      backgroundColor: "white"
    }
    const fieldset={
        border: '2px solid #F4BE41'
    }
    return(
      <div style={style} className="OwnerOf">
        <fieldset style={fieldset}>
          <legend style={roomStyle}>Room Owner</legend>
            <label style={idStyle}>Room ID:
              <input id="ownerOfSearchBox" type="text" onChange={this.handleTextChange} value={this.state.roomId} />
              <hr />
              <input id="search" type="submit" value="Search" onClick={this.handleSubmit} />
              {this.state.ownerOf}
            </label>
        </fieldset>
      </div>
    )
  }
}

export default OwnerOf
