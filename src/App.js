import React, { Component } from 'react';
import './App.css';

const PlayerCard = ({ color, symbol }) => {
  const style = {
    backgroundColor: color,
    backgroundImage: `url(../img/${symbol}.png)`,
    backgroundSize: 'cover',
    border: `black solid 6px`
  }
  return (
    <div style={style} className="player-card">
      {/* <p>{symbol}</p> */}
    </div>
  )
}

class App extends Component {

  constructor(props) {
    super(props)
    this.symbols = ['rock', 'paper', 'scissors']
    this.state = {
      disabled: false,
      playerRed: " ",
      playerYellow: " ",
      winner: ""
    }
  }

  decideWinner = () => {
    const { playerYellow, playerRed } = this.state
    if (playerYellow === playerRed) {
      return " it's a draw "
    }
    if ((playerRed === 'rock' && playerYellow === "scissors") ||
      (playerRed === 'paper' && playerYellow === "rock") ||
      (playerRed === 'scissors' && playerYellow === "paper")) {
      return "red player Wins!"
    } else {
      return "Yellow player Wins!"
    }
  }

  runGame = () => {
    this.setState({
      disabled: true
    })
    let counter = 0;
    let myinterval = setInterval(() => {
      counter++
      this.setState({
        playerRed: this.symbols[Math.floor(Math.random() * this.symbols.length)],
        playerYellow: this.symbols[Math.floor(Math.random() * this.symbols.length)],
        winner: ""
      })
      if (counter > 35) {
        clearInterval(myinterval)
        this.setState({
          winner: this.decideWinner(),
          disabled: false
        })
      }
    }, 120)
  }

  render() {
    const title = "じゃんけんぽん";
    const subtitle = "jankenpon"
    return (
      <div className="App" >
        <h1 style={{ color: '#F5260C' }}>{title}</h1>
        <h2>{subtitle}</h2>
        <div className="board">
          <PlayerCard
            color="#FA5F5C"
            symbol={this.state.playerRed}
          />
          <PlayerCard
            color="#F6C318"
            symbol={this.state.playerYellow}
          />
        </div>
        <h2>{this.state.winner}</h2>
        <button onClick={this.runGame} disabled={this.state.disabled}> 
        Rangēmu 
        </button>
      </div>
    );
  }
}

export default App;
