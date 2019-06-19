import React from 'react';
import '../App.css';

const PlayerButton = ({ color, symbol, onselect, disabled, clicked }) => {
  const style = {
    backgroundImage: `url(../img/${symbol}B.png)`,
    backgroundSize: 'cover',
    backgroundColor: clicked ? 'rgb(167, 143, 139)' : color,
  }
  return (
    <button className='select-btn clicked' style={style} onClick={onselect} disabled={disabled} ></button>
  )
}


export default PlayerButton;