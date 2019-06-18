import React, { Component } from 'react';
import '../App.css';

class NameCount extends Component() {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <h2 style={{ flexGrow: 2 }}>{this.props.user ? 'You : ' : "CPU : "} {[this.props.count]} </h2>
    )
  }
}

export default NameCount;

