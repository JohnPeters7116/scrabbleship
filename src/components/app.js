import React, { Component } from 'react';
import Board from './board';

class App extends Component {
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
        <h1>ScrabbleShip</h1>
        <Board/>
      </div>
    );
  }
}

export default App;
