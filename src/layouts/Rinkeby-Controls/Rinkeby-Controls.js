import React, { Component } from 'react';

import '../../App.css';
import './Rinkeby-Controls.css';
import Web3 from 'web3';
import TotalSupply from '../../components/total-supply.js';
import Reserve from '../../components/Reserve.js';
import GetCurrentTime from '../../components/Get-Current-Time.js';
import AddRoom from '../../components/Add-Room.js';
import AddAccessCode from '../../components/Add-Access-Code.js'
import TextInput from '@aragon/ui';
import Field from '@aragon/ui';

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


let RRAbi = require('../../../abis/RoomRentingAbi.js');
let RRAddress = require('../../../Contract-Addresses/Rinkeby-Address.js');
let RR = web3.eth.contract(RRAbi).at(RRAddress);

let totalSupply = RR.totalSupply((err,res)=>{
  if(err){
    console.log("there is an error with the callback");
  }
  console.log("success!");
  console.log(res);
  totalSupply = Number(res);
});
console.log(totalSupply);
console.log("totalSupply: " + totalSupply + " " + typeof totalSupply);
// @dev add error handling here: if there are no rooms this method will fail.
// TODO: Refactor such that we don't use RB, just RR.
// let roomInfo = RR.rooms(Number(totalSupply) - 1, (err,res)=>{
//   if(err){
//     console.log("there is an error with the callback");
//   }
//   console.log("success!");
//   console.log(res);
// });
// let roomId = Number(totalSupply) - 1;
// let hotelId = String(roomInfo[0]).split(',');
// let roomNumber = String(roomInfo[1]).split(',');
// let minRentTime = String(roomInfo[2]).split(',');
// let numBeds = String(roomInfo[3]).split(',');

web3.eth.defaultAccount = web3.eth.accounts[0];

class RinkebyControls extends Component {
  constructor(props){
    super(props)
    this.state = {
      ceo: '',
      cfo: '',
      coo: '',
      balance: '',
      totalSupply: 0,
      roomId: 0,
      hotelId: 0,
      roomNumber: 0,
      numBeds: 0,
      addHotelId: 0,
      addRoomNumber: 0,
      addNumBeds: 0,
      roomInfo: "roomInfo"
    }
    // this.getBalance = this.getBalance.bind(this);
    // this.getTotalSupply = this.getTotalSupply.bind(this);
    // this.getroomInfo = this.getRoomInfo.bind(this);
  }

  // getTotalSupply = () => {
  //   totalSupply = RR.totalSupply((err,res)=>{
  //     if(err){
  //       console.log("there is an error with the callback");
  //     }
  //     console.log("success!");
  //     console.log(res);
  //   }).toString();
  //   console.log("getTotalSupply fired!");
  //   console.log(totalSupply);
  // }
  // getRoomId = () => {
  //   roomId = Number(totalSupply)-1;
  // }
  // getRoomInfo = () => {
  //   if (roomId >= 0){
  //     console.log("getroomInfo fired!");
  //     roomInfo = RR.rooms(roomId, (err,res)=>{
  //       if(err){
  //         console.log("there is an error with the callback");
  //       }
  //       console.log("success!");
  //       console.log(res);
  //     });
  //     console.log(typeof roomInfo);
  //     console.log(roomInfo);
  //     hotelId = String(roomInfo[0]).split(',');
  //     roomNumber = String(roomInfo[1]).split(',');
  //     minRentTime = String(roomInfo[2]).split(',');
  //     numBeds = String(roomInfo[3]).split(',');
  //     this.setState({
  //       hotelId: hotelId,
  //       roomNumber: roomNumber,
  //       minRentTime: minRentTime,
  //       numBeds: numBeds,
  //     })
  //   } else {
  //     console.log("error at Home.js getroomInfo()");
  //   }
  // }
  textInput = () => (
    <TextInput type="text" />
  )
  fieldLabel = () => (
    <Field label="Enter name here:">
      <input />
    </Field>
  )

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>ETHMemphis Reservation Page</h1>

            <div className="Container">
              <Reserve />
              <AddAccessCode />
              <AddRoom />
              <GetCurrentTime />
              <TotalSupply
                getTotalSupply={this.getTotalSupply}
                totalSupply={totalSupply}
              />
            </div>
            <img id="loader" src='https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif' role="presentation"/>

          </div>
        </div>
      </main>
    )
  }
}

export default RinkebyControls
