import React, { Component } from 'react';

class RoomInfo extends Component{

  componentWillMount(){
    this.props.getRoomId();
    this.props.getRoomInfo();
  }

  render(){
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
    const roomStyle={
      textDecoration: 'overline underline',
      border: '10px #F4BE41',
      borderWidth: '10px',
      backgroundColor: 'white',
      textAlign: 'center',
      fontSize: '40px',
      color: '#3973B5'
    }
    const superStyle={
      border: "2px solid #383838",
      borderTop: "2px solid red",
      backgroundColor: "white"
    }
    const fieldset={
        border: '2px solid #F4BE41'
    }
    return(
      <div style={style} className="roomInfo">
        <fieldset style={fieldset}>
          <legend style={roomStyle}>Room Details</legend>
          <p style={superStyle}>Room ID: {this.props.roomId}</p>
          <p style={superStyle}>Owner: {this.props.hotelId}</p>
          <p style={superStyle}>Renter: {this.props.roomNumber}</p>
          <p style={superStyle}>Minimum Rent Time: {this.props.minRentTime}</p>
          <p style={superStyle}>Number of Beds: {this.props.numBeds}</p>
        </fieldset>
      </div>
    )
  }
}

export default RoomInfo
