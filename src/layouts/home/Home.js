import React, { Component } from 'react';
import Admins from './admins.js'
import RoomInfo from './room-details.js'
import TotalSupply from './total-supply.js';
import '../../App.css';
import Web3 from 'web3';
import AddRoomForm from './Add-Room.js';
import ChangeOfficersForm from './change-admins.js';
import OwnerOf from './ownerOf.js';
import Transfer from './Transfer.js';
import TransferFrom from './Transfer-From.js';
import Approve from './Approve.js';

let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"))

let RBAbi = require('../../../abis/RoomBaseAbi.js');
let RBAddress = '0x8273e4b8ed6c78e252a9fca5563adfcc75c91b2a';
let RB = web3.eth.contract(RBAbi).at(RBAddress);

// let ROAbi = require('../../../abis/RoomOwnershipAbi.js');
// let ROAddress = '0x8f0483125fcb9aaaefa9209d8e9d7b9c8b9fb90f';
// let RO = web3.eth.contract(ROAbi).at(ROAddress);

let RRAbi = require('../../../abis/RoomRentingAbi.js');
let RRAddress = '0x9fbda871d559710256a2502a2517b794b482db40';
let RR = web3.eth.contract(RRAbi).at(RRAddress);

let balance = web3.fromWei(web3.eth.getBalance(web3.eth.coinbase)).toString();
let ceo = RR.ceo();
let cfo = RR.cfo();
let coo = RR.coo();
let totalSupply = RR.totalSupply().toString();
console.log("totalSupply: " + totalSupply + " " + typeof totalSupply);
// @dev add error handling here: if there are no rooms this method will fail.
// TODO: Refactor such that we don't use RB, just RR.
let roomInfo = RB.rooms(Number(totalSupply) - 1);
let roomId = Number(totalSupply) - 1;
let hotelId = String(roomInfo[0]).split(',');
let roomNumber = String(roomInfo[1]).split(',');
let minRentTime = String(roomInfo[2]).split(',');
let numBeds = String(roomInfo[3]).split(',');

web3.eth.defaultAccount = web3.eth.accounts[0];

class Home extends Component {
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
      roomInfo: roomInfo
    }
    this.getBalance = this.getBalance.bind(this);
    this.getCeo = this.getCeo.bind(this);
    this.getCfo = this.getCfo.bind(this);
    this.getCoo = this.getCoo.bind(this);
    this.getTotalSupply = this.getTotalSupply.bind(this);
    this.getroomInfo = this.getRoomInfo.bind(this);
  }

  getBalance = () => {
  balance = web3.fromWei(web3.eth.getBalance(web3.eth.coinbase)).toString();
  }
  getCeo = () => {
    ceo = RR.ceo();
  }
  getCfo = () => {
    cfo = RR.cfo();
  }
  getCoo = () => {
    coo = RR.coo();
  }
  getTotalSupply = () => {
    totalSupply = RR.totalSupply().toString();
  }
  getRoomId = () => {
    roomId = Number(totalSupply)-1;
  }
  getRoomInfo = () => {
    if (roomId >= 0){
      console.log("getroomInfo fired!");
      roomInfo = RR.rooms(roomId);
      console.log(typeof roomInfo);
      console.log(roomInfo);
      hotelId = String(roomInfo[0]).split(',');
      roomNumber = String(roomInfo[1]).split(',');
      minRentTime = String(roomInfo[2]).split(',');
      numBeds = String(roomInfo[3]).split(',');
      this.setState({
        hotelId: hotelId,
        roomNumber: roomNumber,
        minRentTime: minRentTime,
        numBeds: numBeds,
      })
    } else {
      console.log("error at Home.js getroomInfo()");
    }
  }

  render() {
    const containerStyle={
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridAutoRow: '90px 90px 90px',
      gridAutoColumn: '60px 60px 60px',
      alignItems: '',
      justifyItems: '',
      gridTemplateAreas: "header header header header main main . sidebar footer footer footer footer",
      /*
      gridColumnStart: '',
      gridColumnEnd: '',
      gridRowStart: '',
      gridRowEnd: '',
      gridTemplateRows: '',
      gridColumnGap: '1em',
      gridRowGap: '',
      gridAutoFlow: ''
      */
}

    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>BookLocal Homepage</h1>
            <p>The page is being modified to read and write to the Truffle testRpc.</p>

            // TODO: call data from blockchain here.
            <div style={containerStyle} className="Container">
              <Admins
                getBalance={this.getBalance}
                balance={balance}
                getCeo={this.getCeo}
                ceo={ceo}
                getCfo={this.getCfo}
                cfo={cfo}
                getCoo={this.getCoo}
                coo={coo}
              />
              <ChangeOfficersForm
                getCfo={this.getCfo}
                cfo={cfo}
                getCoo={this.getCoo}
                coo={coo}
                getBalance={this.getBalance}
              />
              <TotalSupply
                getTotalSupply={this.getTotalSupply}
                totalSupply={totalSupply}
              />
              <RoomInfo
                getRoomId={this.getRoomId}
                roomId={roomId}
                getRoomInfo={this.getRoomInfo}
                hotelId={hotelId}
                roomNumber={roomNumber}
                minRentTime={minRentTime}
                numBeds={numBeds}
              />
              <OwnerOf />
              <Transfer />
              <TransferFrom />
              <Approve />
              <AddRoomForm
                getBalance={this.getBalance}
                getTotalSupply={this.getTotalSupply}
                getRoomId={this.getRoomId}
                getRoomInfo={this.getRoomInfo}
                addHotelId={this.state.addHotelId}
                addRoomNumber={this.state.addRoomNumber}
                addNumBeds={this.state.addNumBeds}
                addRoom={this.addRoom}
                transactionObject={this.transactionObject}
              />
            </div>
            <img id="loader" src='https://loading.io/spinners/double-ring/lg.double-ring-spinner.gif' role="presentation"/>
            // end data call.

            <h2>UPort Authentication</h2>
            <p>This particular box comes with UPort autentication built-in.</p>
            <p>NOTE: To interact with your smart contracts through UPort's web3 instance, make sure they're deployed to the Ropsten testnet.</p>
            <p>In the upper-right corner, you'll see a login button. Click it to login with UPort. There is an authenticated route, "/dashboard", that displays the UPort user's name once authenticated.</p>
            <h3>Redirect Path</h3>
            <p>This example redirects home ("/") when trying to access an authenticated route without first authenticating. You can change this path in the failureRedriectUrl property of the UserIsAuthenticated wrapper on <strong>line 9</strong> of util/wrappers.js.</p>
            <h3>Accessing User Data</h3>
            <p>Once authenticated, any component can access the user's data by assigning the authData object to a component's props.</p>
            <pre><code>
              {"// In component's constructor."}<br/>
              {"constructor(props, { authData }) {"}<br/>
              {"  super(props)"}<br/>
              {"  authData = this.props"}<br/>
              {"}"}<br/><br/>
              {"// Use in component."}<br/>
              {"Hello { this.props.authData.name }!"}
            </code></pre>
            <h3>Further Reading</h3>
            <p>The React/Redux portions of the authentication fuctionality are provided by <a href="https://github.com/mjrussell/redux-auth-wrapper" target="_blank">mjrussell/redux-auth-wrapper</a>.</p>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
