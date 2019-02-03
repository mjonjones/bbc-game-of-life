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
    this.board = this.makeBoard();
  }

  state = {
    cells: [],
  }

  // Creates an 2D array to represent the board
  makeBoard(){
    // Initial Array that becomes the 2D array
    let board = []

    // While i < number of rows, iterate i...
    for (let y=0; y<this.rows; y++){

      // For each index in board, create a new array
      board[y] = [];

      // iterate x through the new row to create the columns of the grid
      for(let x=0; x<this.columns; x++){
        // Initial state for each cell being false (off/dead)
        board[y] [x] = false;
      }

    }
    return board;
  }


  // Creates the cells for the 2D Array
  makeCells(){

    // Initialise the Array of Cells
    let cells =[];

    // Iterate through each of the 'rows' of the 2D array
    for(let y =0; y< this.rows; y++){

      // Iterate through each of the 'Columns' of the 2D array
      for (let x = 0; x < this.cols; x++) {

        // If the cell is true (Live/on), push it to the cells array
        // Note that at the method makeBoard() creates no empty cells to begin with
        if (this.board[y][x]) {
          cells.push({ x, y });
        }
      }
    }

    return cells;
  }
  
  // Since clicking an area of the board is relative to the client area (Where the board is located), this
  // method has been created in order to identify where the coordinate is on the browser, relative to the board
  getElementCoords(){

    // Location on the board using the boardRef when the div is clicked
    const boardLocation = this.boardRef.getBoundingClientRect();

    // Area on the DOM (Document Object Model)
    const doc = document.documentElement;

    return{
      // X coord 
      x: (boardLocation.left + window.pageXOffset) - doc.clientLeft,

      // Y coord
      y: (boardLocation.top + window.pageYOffset) - doc.clientTop,
    };
  }


  // Method that handles the click on the board
  handleClick = (event) => {

    // Represents the coordOffset
    const elementCoords = this.getElementCoords();
    const offsetX = event.clientX - elementCoords.x;
    const offsetY = event.clientY - elementCoords.y;

    const x = Math.floor(offsetX/20);
    const y = Math.floor(offsetY/20);

    // If the Coordinates are on the game board, set the state of teh cell (live/dead) to the opposite
    // of its current state.
    if(x>=0 && x <= this.columns && y>= 0 && y <= this.rows){
      this.board[y] [x] = !this.board[y] [x];
    }

    // Update the cells state and call the function that makes a cell live
    this.setState({ cells: this.makeCells() })
  }


  render() {
    return (
      // Div that represents the board, using App.css
      <div className="board" 
      // On click handler when the player clicks somewhere on the board such as a cell
      onClick={this.handleClick}
      // Saving te reference of where the player clicked, since CSS has been used to create the grid
      ref={ (z) => {this.boardRef = z; }}>
      
      </div>
    );
  }
}

export default App;


