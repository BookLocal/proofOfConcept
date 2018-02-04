import React, { Component } from 'react';

class TotalSupply extends Component{

  componentWillMount(){
    this.props.getTotalSupply();
  }

  render(){
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
      backgroundColor: "black",
      color: 'white'
    }
    const fieldset={
        border: '2px solid #F4BE41'
    }
    return(
      <div style={style} className="TotalSupply">
        <fieldset style={fieldset}>
          <legend style={totalStyle}>Total Supply</legend>
          <p style={propStyle}>{this.props.totalSupply}</p>
        </fieldset>
      </div>
    )
  }
}


export default TotalSupply
