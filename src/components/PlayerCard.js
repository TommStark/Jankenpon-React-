import React from 'react';
import '../App.css';

const PlayerCard = ({ color, symbol, win, round }) => {
  const style = {
    backgroundColor: color,
    backgroundImage: `url(../img/${symbol}A.png)`,
    backgroundSize: 'cover',
  }
  return (<div style={style} className={`player-card ${round === 1 ? 'opening-animation' : ''} ${win === color ? 'winner' : ''}`}></div>)
}


export default PlayerCard;