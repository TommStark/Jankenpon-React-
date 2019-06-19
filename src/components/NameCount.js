import React, { Component } from 'react';
import '../App.css';

export default class NameCount extends Component{
  render() {
    return (
      <h2 style={{ flexGrow: 2 }}>{this.props.user ? 'You : ' : "CPU : "} {[this.props.count]} </h2>
    )
  }
}



