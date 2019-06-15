import React, { Component } from 'react';
import './App.css';

const PlayerCard = ({ color, symbol, win, round }) => {
  const style = {
    backgroundColor: color,
    backgroundImage: `url(../img/${symbol}.png)`,
    backgroundSize: 'cover',
  }
  return (<div style={style} className={`player-card ${round === 0 ? 'opening-animation' : ''} ${win === color ? 'winner' : ''}`}></div>)
}

const NameCount = ({ user, count }) => {
  return (
    <h2 style={{ flexGrow: 2 }}>{user ? 'You : ' : "CPU : "} {[count]} </h2>
  )
}

const PlayerButton = ({ color, symbol, onselect, disabled }) => {
  const style = {
    backgroundImage: `url(../img/${symbol}.png)`,
    backgroundSize: 'cover',
    backgroundColor: color,
  }
  return (
    <button className='select-btn' style={style} onClick={onselect} disabled={disabled} ></button>
  )
}

class App extends Component {

  constructor(props) {

    super(props)
    this.myinterval = null;
    this.symbols = ['rock', 'paper', 'scissors'];
    this.colors = ['#16B8F8', '#039739', '#F15CB6'];
    this.state = {
      disabled: false,
      disabledSelectors: true,
      playerRed: " ",
      playerYellow: " ",
      winner: " ",
      round: 0,
      redWin: 0,
      yellowWin: 0,
      win: null,
      selectWinner: false,
    }
    this.onReset = this.onReset.bind(this);
    this.startGame = this.startGame.bind(this);
    this.SelectSymbol = this.SelectSymbol.bind(this);
    this.decideWinner = this.decideWinner.bind(this);
  }

  decideWinner = () => {
    const { playerYellow, playerRed } = this.state
    if (playerYellow === playerRed) {
      this.setState(({
        disabledSelectors: true,
        selectWinner: false,
      }))
      return " it's a draw "
    }
    if ((playerRed === 'rock' && playerYellow === "scissors") ||
      (playerRed === 'paper' && playerYellow === "rock") ||
      (playerRed === 'scissors' && playerYellow === "paper")) {
      this.setState((prevState, props) => ({
        redWin: prevState.redWin + 1,
        disabledSelectors: true,
        selectWinner: false,
        win: "#FA5F5C"
      }))
      return (
        "You Win"
      )
    } else {
      this.setState((prevState, props) => ({
        yellowWin: prevState.yellowWin + 1,
        disabledSelectors: true,
        selectWinner: false,
        win: "#F6C318"
      }))
      return "CPU Win"
    }
  }

  // runGame(symbol) {
  //   this.setState((prevState, props) => ({
  //     disabled: true,
  //     playerRed: symbol,
  //     round: prevState.round + 1,
  //     win: null,
  //   }))
  //   let counter = 0;
  //   let myinterval = setInterval(() => {
  //     counter++
  //     this.setState({
  //       // playerRed: this.symbols[Math.floor(Math.random() * this.symbols.length)],
  //       playerYellow: this.symbols[Math.floor(Math.random() * this.symbols.length)],
  //       winner: " "
  //     })
  //     if (counter > 25) {
  //       clearInterval(myinterval)
  //       this.setState({
  //         winner: this.decideWinner(),
  //         disabled: false,
  //       });
  //     }
  //   }, 100)
  // }

  componentDidUpdate(prevState) {
    if (this.state.selectWinner !== prevState.selectWinner) {
      if (this.state.selectWinner) {
        let result = this.decideWinner()
        this.setState({
          winner: result
        })
      }
    }
  }

  SelectSymbol(symbol) {
    clearInterval(this.myinterval);
    this.setState((prevState) => ({
      playerRed: symbol,
      disabled: false,
      selectWinner: true
    }))
  }

  startGame() {
    this.setState((prevState) => ({
      win: null,
      disabled: true,
      disabledSelectors: false,
      round: prevState.round + 1,
    }))
    this.myinterval = setInterval(() => {
      this.setState({
        playerRed: this.symbols[Math.floor(Math.random() * this.symbols.length)],
        playerYellow: this.symbols[Math.floor(Math.random() * this.symbols.length)],
        winner: " "
      })
    }, 150)
  }

  onReset() {
    this.setState({
      disabled: false,
      disabledSelectors: true,
      playerRed: " ",
      playerYellow: " ",
      winner: " ",
      round: 0,
      redWin: 0,
      yellowWin: 0,
      win: null,
      selectWinner: false,
    })
  }

  render() {
    const title = "じゃんけんぽん";
    const subtitle = "jankenpon"
    return (
      <div className='wrapper'>
        <div className="App" >
          <div className='reset-btn-div'>
            <button
              className='reset-btn'
              onClick={this.onReset}
              disabled={this.state.disabled}
            >reset</button>
          </div>
          <h1 style={{ color: '#F5260C' }}>{title}</h1>
          <h2>{subtitle}</h2>
          <div className="board">
            <PlayerCard
              key={this.state.round + "#FA5F5C"}
              color={"#FA5F5C"}
              symbol={this.state.playerRed}
              win={this.state.win}
              round={this.state.round}
            />
            <PlayerCard
              key={this.state.round + "#F6C318" }
              color="#F6C318"
              symbol={this.state.playerYellow}
              win={this.state.win}
              round={this.state.round}
            />
          </div>
          {/* <button className='randomButton' onClick={this.runGame} disabled={this.state.disabled}>
            Rangēmu
          </button> */}
          <div className='counterbox'>
            <NameCount
              user={true}
              count={this.state.redWin}
            />
            <h2 style={{ display: 'inlineBlock' }}>[{this.state.round}]</h2>
            <NameCount
              user={false}
              count={this.state.yellowWin}
            />
          </div>
          <h2> * {this.state.winner} * </h2>
          <div className='selectorBox'>
            {
              this.state.disabledSelectors
                ?
                <button
                  key={this.state.round}
                  onClick={this.startGame}
                  disabled={this.state.disabled}
                  className='randomButton'
                > Start Game</button>
                :
                this.symbols.length !== 0 && this.symbols.map((item, i) => {
                  return (
                    <PlayerButton
                      onselect={() => { this.SelectSymbol(item) }}
                      color={this.colors[i]}
                      key={item}
                      symbol={item}
                      disabled={this.state.disabledSelectors}
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