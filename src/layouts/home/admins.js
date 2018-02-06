import React, { Component } from 'react';

class Admins extends Component{

  componentWillMount(){
    this.props.getBalance();
    this.props.getCeo();
    this.props.getCfo();
    this.props.getCoo();
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
    const ceoStyle={
      border: "2px solid #383838",
      borderTop: "2px solid red",
      backgroundColor: "white"
    }
    const ethStyle={
      border: "2px solid #383838",
      borderTop: "2px solid red",
      backgroundColor: "white"
    }
    const cfoStyle={
      border: "2px solid #383838",
      borderTop: "2px solid red",
      backgroundColor: "white"
    }
    const adminStyle={
      textDecoration: 'overline underline',
      border: '10px #F4BE41',
      borderWidth: '10px',
      backgroundColor: 'white',
      textAlign: 'center',
      fontSize: '40px',
      color: '#3973B5'
    }
    const ethStyle1={
      border: "2px solid #383838",
      borderTop: "2px solid red",
      backgroundColor: "white",
    }
    const fieldset={
      border: '2px solid #F4BE41'
    }
    const cooStyle={
      border: "2px solid #383838",
      borderTop: "2px solid red",
      backgroundColor: "white",
    }
    const ethStyle2={
      border: "2px solid #383838",
      borderTop: "2px solid red",
      backgroundColor: "white",
    }
    return(
      <div style={style}>
        <fieldset style={fieldset}>
          <legend style={adminStyle}>Admins</legend>
          <p style={ceoStyle}>CEO: {this.props.ceo}</p>
          <p style={ethStyle}>ETH: {this.props.balance}</p>
          <p style={cfoStyle}>CFO: {this.props.cfo}</p>
          <p style={ethStyle1}>ETH: PlaceholderStatement</p>
          <p style={cooStyle}>COO: {this.props.coo}</p>
          <p style={ethStyle2}>ETH: PlaceholderStatement</p>
        </fieldset>
      </div>
    )
  }
}


export default Admins
