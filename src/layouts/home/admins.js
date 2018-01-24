import React, { Component } from 'react';

class Admins extends Component{

  componentWillMount(){
    this.props.getBalance();
    this.props.getCeo();
    this.props.getCfo();
    this.props.getCoo();
  }

  render(){
    return(
      <div>
        <fieldset>
          <legend>Admins</legend>
          <p>CEO: {this.props.ceo}</p>
          <p>ETH: {this.props.balance}</p>
          <p>CFO: {this.props.cfo}</p>
          <p>ETH: PlaceholderStatement</p>
          <p>COO: {this.props.coo}</p>
          <p>ETH: PlaceholderStatement</p>
        </fieldset>
      </div>
    )
  }
}


export default Admins
