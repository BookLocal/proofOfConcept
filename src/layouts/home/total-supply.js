import React, { Component } from 'react';

class TotalSupply extends Component{

  componentWillMount(){
    this.props.getTotalSupply();
  }

  render(){
    return(
      <div className="TotalSupply">
        <fieldset>
          <legend>Total Supply</legend>
          <p>{this.props.totalSupply}</p>
        </fieldset>
      </div>
    )
  }
}


export default TotalSupply
