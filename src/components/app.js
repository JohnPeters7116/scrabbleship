import React, { Component } from 'react';
import Board from './board';

export default class App extends Component {
  constructor(props){
    super(props)
  }

  moveIt() {
     setInterval(() =>
     this.setState({
     position: [Math.floor(Math.random() * 15), Math.floor(Math.random() * 15)]
     }), 500);
  }

  componentDidMount() {
    this.moveIt()
  }


  render() {
    return (
      <div>
        <Board/>
      </div>
    );
  }
}
