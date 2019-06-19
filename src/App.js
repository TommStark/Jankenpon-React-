import React, { Component } from 'react';
import './App.css';

import NameCount from './components/NameCount';
import PlayerCard from './components/PlayerCard';
import PlayerButton from './components/PlayerButton';
import ModalWinner from './components/ModalWinner';

class App extends Component {

  constructor(props) {
    super(props)
    this.myinterval = null;
    this.symbols = ['rock', 'paper', 'scissors'];
    this.difficulty = ['EASY', 'MEDIUM', 'HARD'];
    this.colors = ['#16B8F8', '#039739', '#F15CB6'];
    this.speedy = [170, 110, 70];
    this.rounds = [5, 10, 15];
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
      selectMenu: true,
      speed: null,
      rounds: null,
      clicked: false,
      colorclicked: false,
      modal: false,
      difficulty: ""
    }
    this.onReset = this.onReset.bind(this);
    this.startGame = this.startGame.bind(this);
    this.SelectSymbol = this.SelectSymbol.bind(this);
    this.decideWinner = this.decideWinner.bind(this);
    this.leaveMenu = this.leaveMenu.bind(this)
    this.clear = this.clear.bind(this);
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

  componentDidUpdate(prevState) {
    if (this.state.selectWinner !== prevState.selectWinner) {
      if (this.state.selectWinner) {
        let result = this.decideWinner()
        this.setState({
          winner: result
        })
      }
    }
    if (this.state.round !== prevState.round) {
      if (this.state.round === this.state.rounds && this.state.disabledSelectors && !this.state.modal) {
        setTimeout(() => {
          this.setState({
            modal: true
          })
        }, 1500);
      }
    }
  }

  SelectSymbol(symbol) {
    clearInterval(this.myinterval);
    this.setState((prevState) => ({
      playerRed: symbol,
      disabledSelectors: true,
      selectWinner: true,
      clicked: true
    }))
    setTimeout(() => {
      !this.state.modal && this.setState(() => ({
        disabledSelectors: false,
        clicked: false,
      }))
      !this.state.modal && this.startGame()
    }, 1800);
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
    }, this.state.speed)
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
      selectMenu: true,
      speed: null,
      rounds: null,
      clicked: false,
      colorclicked: false,
      modal: false,
      difficulty: ""
    })
    clearInterval(this.myinterval);
  }

  leaveMenu() {
    this.setState({
      selectMenu: false,
    })
    this.startGame()
  }

  selectDiff(item, diff) {
    this.setState({
      speed: item,
      difficulty: diff
    })
  }

  selectRounds(item) {
    this.setState({
      rounds: item
    })
  }
  clear() {
    clearInterval(this.myinterval);
    console.log('CLEAR')
  }

  render() {
    const title = "じゃんけんぽん";
    const subtitle = "jankenpon"
    const menusubI = "Select Your difficulty"
    const menusubII = "Select Number Of Rounds"
    return (

      <div className='wrapper'>
        {this.state.selectMenu
          ?
          <div className='menu'>
            <div className='App'>
              <h1 style={{ color: '#F5260C', fontSize: '3em' }}>{title}</h1>
              <h2 style={{ fontSize: '1.5em' }}>{menusubI}: <span style={{color:'red'}}>{this.state.difficulty}</span> </h2>
              <div style={{ display: 'flex', flexDirection: "column" }} >
                {
                  this.difficulty.length !== 0 && this.difficulty.map((item, i) => {
                    return (
                      <button style={{
                        backgroundColor: '#FA5F5C',
                        color: 'white',
                        border: 'solid .2rem black',
                        height: '3rem',
                        margin: '.4rem',
                        fontSize: '1.5em',
                        cursor: 'pointer',
                        borderRadius: '50px',
                      }}
                        onClick={() => { this.selectDiff(this.speedy[i], this.difficulty[i]) }}
                        key={item}
                        className='clicked'
                      > {item} </button>
                    )
                  })
                }
              </div>
              <h2 style={{ fontSize: '1.5em', marginTop: '1.5rem' }}>{menusubII}: <span style={{color:'red'}}>{this.state.rounds} </span></h2>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {
                  this.rounds.length !== 0 && this.rounds.map((item, i) => {
                    return (
                      <button style={{
                        backgroundColor: '#F6C318',
                        color: 'white',
                        border: 'solid .2rem black',
                        borderRadius: '50%',
                        height: '4rem',
                        width: '4rem',
                        margin: '.5rem',
                        fontSize: '1.5em',
                        cursor: 'pointer'
                      }}
                        onClick={() => { this.selectRounds(this.rounds[i]) }}
                        key={item}
                        className='clicked'
                      > {item} </button>
                    )
                  })
                }
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }} className={`${this.state.speed && this.state.rounds ? 'winner' : ''}`}>
                <button
                  disabled={this.state.speed && this.state.rounds ? false : true}
                  onClick={this.leaveMenu}
                  className='randomButton clicked'
                > GO </button>
              </div>
            </div>
          </div>
          :
          <div className="App" >
            {
              this.state.modal ?
                <ModalWinner
                  redWin={this.state.redWin}
                  yellowWin={this.state.yellowWin}
                  closeModal={this.onReset}
                  clear={this.clear}
                />
                :
                null
            }
            <div className='reset-btn-div'>
              <button
                className='reset-btn'
                onClick={this.onReset}
                disabled={this.state.disabledSelectors}
              >Back</button>
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
                key={this.state.round + "#F6C318"}
                color="#F6C318"
                symbol={this.state.playerYellow}
                win={this.state.win}
                round={this.state.round}
              />
            </div>
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
                this.symbols.length !== 0 && this.symbols.map((item, i) => {
                  return (
                    <PlayerButton
                      onselect={() => { this.SelectSymbol(item) }}
                      color={this.colors[i]}
                      key={item}
                      symbol={item}
                      disabled={this.state.disabledSelectors}
                      clicked={this.state.clicked}
                    />
                  )
                })
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;