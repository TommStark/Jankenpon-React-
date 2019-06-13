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

const PlayerButton = ({ color, symbol, onselect }) => {
  const style = {
    border: `white solid 3px`,
    padding: 0,
    height: '10em',
    flex: 1,
    backgroundImage: `url(../img/${symbol}.png)`,
    backgroundSize: 'cover',
    backgroundColor: color,
    margin: '10px'
    // transform: 'rotateZ(90deg)',        
  }
  return (
    <button style={style} onClick={onselect}></button>
  )
}

// onClick={() => { console.log(symbol) }}

class App extends Component {

  constructor(props) {
    super(props)
    this.symbols = ['rock', 'paper', 'scissors']
    this.colors = ['#16B8F8', '#039739', '#F15CB6']
    this.state = {
      disabled: false,
      playerRed: " ",
      playerYellow: " ",
      winner: ""
    }
    this.runGame = this.runGame.bind(this);
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

  runGame(symbol) {
    this.setState({
      disabled: true,
      playerRed:symbol
    })
    let counter = 0;
    let myinterval = setInterval(() => {
      counter++
      this.setState({
        // playerRed: this.symbols[Math.floor(Math.random() * this.symbols.length)],
        playerYellow: this.symbols[Math.floor(Math.random() * this.symbols.length)],
        winner: ""
      })
      if (counter > 25) {
        clearInterval(myinterval)
        this.setState({
          winner: this.decideWinner(),
          disabled: false
        })
      }
    }, 100)
  }

  render() {
    const title = "じゃんけんぽん";
    const subtitle = "jankenpon"
    return (
      <div className='wrapper'>
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
          {/* <button className='randomButton' onClick={this.runGame} disabled={this.state.disabled}>
            Rangēmu
          </button> */}
          <div className='selectorBox'>
            {
              this.symbols.length !== 0 && this.symbols.map((item, i) => {
                return (
                  <PlayerButton
                    onselect={()=>{this.runGame(item)}}
                    color={this.colors[i]}
                    key={item}
                    symbol={item}
                  />
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;