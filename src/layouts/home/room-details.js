import React, { Component } from 'react';

class RoomInfo extends Component{

  componentWillMount(){
    this.props.getRoomId();
    this.props.getRoomInfo();
  }

  render(){
    return(
      <div className="roomInfo">
        <fieldset>
          <legend>Room Details</legend>
          <p>Room ID: {this.props.roomId}</p>
          <p>Owner: {this.props.hotelId}</p>
          <p>Renter: {this.props.roomNumber}</p>
          <p>Minimum Rent Time: {this.props.minRentTime}</p>
          <p>Number of Beds: {this.props.numBeds}</p>
        </fieldset>
      </div>
    )
  }
}

export default RoomInfo
