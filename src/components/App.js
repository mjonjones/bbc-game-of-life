import React, { Component } from 'react';
import './App.css';

// Represents the game board and mounts onto index.html when app is running
class App extends Component {

  constructor(){
    super();
    // Number of rows - calculated by Height of board/Cell height (600/20 = 30)
    this.rows = 30;

    // Number of columns - calculated by Width of board/cell width (800/20 = 40)
    this.columns = 40;

    // On start create the board 
    this.board = makeBoard();
  }

  state = {
    cells: [],
  }

  // Creates an 2D array to represent the board
  makeBoard(){
    // Initial Array that becomes the 2D array
    let board = []

    // While i < number of rows, iterate i...
    for (let i=0; i<this.rows; i++){

      // For each index in board, create a new array
      board[i] = [];

      // iterate x through the new row to create the columns of the grid
      for(let x=0; x<this.columns; x++){
        // Initial state for each cell being false (off/dead)
        board[i] [x] = false;
      }

    }
    return board;
  }


  

  

  render() {
    return (
      // Div that represents the board, using App.css
      <div className="board">

      </div>
    );
  }
}

export default App;


