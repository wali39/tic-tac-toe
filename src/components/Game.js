import React, { Component } from "react";
import Board from "./Board";
import "../App.css";
const calculateWinner = (squares) => {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
export default class Game extends Component {
  state = {
    history: [{ squares: Array(9).fill(null) }],
    stepCount: 0,
    xIsNext: true,
  };
  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepCount + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat({ squares }),
      stepCount: history.length,
      xIsNext: !this.state.xIsNext,
    });
  };

  jumpTo = (step) => {
    this.setState({
      stepCount: step,
      xIsNext: step % 2 === 0,
    });
  };
  render() {
    const history = this.state.history;
    const current = history[this.state.stepCount];
    const winner = calculateWinner(current.squares);
    console.log(winner);
    const moves = history.map((_, move) => {
      const description = move ? "Go To Move #" + move : "Go To Game Start";
      return (
        <li key={move}>
          <button
            style={{
              background: "none",
              border: "1px solid white",
              color: "white",
            }}
            onClick={() => this.jumpTo(move)}
          >
            {description}
          </button>
        </li>
      );
    });
    let status = "";
    if (winner) {
      status = `winner ${winner} 🥰😙!! `;
    } else {
      status = "Next Player " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="con-game">
        <div className="board">
          <h1>Tic Tac Toe</h1>
          <Board onClick={this.handleClick} squares={current.squares} />
          <div>
            <p>{status}</p>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    );
  }
}
