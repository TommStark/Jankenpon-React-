import React from 'react';
import '../App.css';

const ModalWinner = ({ redWin, yellowWin, closeModal, clear }) => {
  const winner = () => {
    if (redWin > yellowWin) {
      return ' You Win The Game'
    } else if (redWin < yellowWin) {
      return ' CPU Win The Game'
    } else {
      return 'TABLAS'
    }
  }
  return (
    <div id="open-modal" className="modal-window" >
      {clear()}
      <div>
        <h1>{winner()} </h1>
        <h2>You: {redWin} vs CPU: {yellowWin}</h2>
        <button
          href="#"
          title="Close"
          onClick={closeModal}
          className='winner'
          style={{
            backgroundColor: '#FA5F5C',
            color: 'white',
            border: 'solid .1rem black',
            margin: '.4rem',
            fontSize: '1.1em',
            cursor: 'pointer',
            borderRadius: '50px',
            padding: '.4em'
          }}
        >Back to Menu</button>
      </div>
    </div >
  )
}

export default ModalWinner;

