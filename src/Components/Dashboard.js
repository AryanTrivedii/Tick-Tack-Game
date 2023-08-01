import React, { useState, useEffect, useRef } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  return (
    <div className="board">
      {squares.map((square, index) => (
        <Square key={index} value={square} onSquareClick={() => handleClick(index)} />
      ))}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Dashboard = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [reset, setReset] = useState(false);

  const boardRef = useRef(null);

  useEffect(() => {
    if (calculateWinner(squares)) {
      setWinner(calculateWinner(squares));
    } else if (squares.every((square) => square !== null)) {
      setWinner('It\'s a Tie!');
    }
  }, [squares]);

  useEffect(() => {
    if (reset) {
      setSquares(Array(9).fill(null));
      setXIsNext(true);
      setWinner(null);
      setReset(false);
    }
  }, [reset]);

  const handlePlay = (nextSquares) => {
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const resetBoard = () => {
    setReset(true);
  };

  return (
    <div className="tic-tac-toe-game">
      <h1>Tic-Tac-Toe</h1>
      <Board xIsNext={xIsNext} squares={squares} onPlay={handlePlay} />
      <div className="status">
        {winner ? `Winner: ${winner}` : `Next Player: ${xIsNext ? 'X' : 'O'}`}
      </div>
      {winner && (
        <div className="popup">
          <div className="popup-inner">
            <h2>{winner}</h2>
            <button onClick={resetBoard}>Reset Board</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
