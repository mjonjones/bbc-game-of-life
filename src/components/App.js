import React, { Component } from 'react';
import './App.css';
import Cell from './Cell';

// Represents the game board and mounts onto index.html when app is running
export default class App extends Component {

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
    // Represents the live cells on the board
    cells: [],

    // Represents the time before the game 'evolves' 
    evolveTime: 100,

    // Boolean to control start/stop of the game
    running: false,
  }


  //----------------------------------- CONTROLLER FUNCTIONS -------------------------------------------
 
  // TODO: Combine start/stop btns
  // Function to run game
  startGame = () => {
    this.setState({running: true});
    // Call the function that evolves the game
    this.evolveGame();
  }

  // Function to stop game
  // stopGame = () => {
  //   this.setState({running: false});

  //   // Stops the callbacks
  //   if (this.asynchTimeout) {
  //     window.clearTimeout(this.asynchTimeout);
  //     this.asynchTimeout = null;
  //   }
  // }

// ------------------------------------------- BOARD FUNCTIONS ----------------------------------------
  
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
        board[y][x] = false;
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
      for (let x = 0; x < this.columns; x++) {

        // If the cell is true (Live/on), push it to the cells array
        // Note that at the method makeBoard() creates no empty cells to begin with
        if (this.board[y][x]) {
          cells.push({ x, y });
        }
      }
    }

    // Debugging Console log to check that cells are being added.
    console.log("Cells after makeCell() ");
    console.log(cells)

    return cells;
  }

  // Function that calculates the number of neighbours a cell has.
  // Takes the x, y coords of the cell along with the CURRENT game board
  numNeigh(board, x, y) {

    // // instantiation of variable
    // let cellNeighbours = 0;

    // // All the directions of the 8 possible neighbours of the cell
    // const neighbourDirections = [[-1,1], [0,1], [1,1], [-1,0], [1,0], [-1,-1], [0,-1], [1,-1]];

    // // Iterate i through the neighbours array
    // for(let i =0; i < neighbourDirections.length; i++){
    
    //   const direction = neighbourDirections[i];
    //   // Find the x Coord of the neignbour, relative to the input cell x
    //   let xCoord= x + direction[1];
    //   // Find the y Coord of the neignbour, relative to the input cell y
    //   let yCoord= y + direction[0];

    //   // If the neighbour cell is live and the cell Exists on the board ( Few edge cases on the side)
    //   // neighbours + 1
    //   if(board[yCoord][xCoord] && xCoord >= 0 && xCoord < this.columns && yCoord >= 0 && yCoord < this.rows){
    //     cellNeighbours = cellNeighbours + 1; 
        
    //   }
    // }

    // return cellNeighbours;

    let neighbors = 0;
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];

            if (x1 >= 0 && x1 < this.columns && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
                neighbors++;
            }
        }

        return neighbors;
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
    console.log("Recieved click: x =" + x + " , y =" + y)
    if(x>=0 && x <= this.columns && y>= 0 && y <= this.rows){
      this.board[y][x] = !this.board[y][x];
    }

    // Update the cells state and call the function that makes a cell live
    this.setState({ cells: this.makeCells() })
    console.log("Cell State:");
    console.log(this.state.cells);
  }


  // Function that evolves the game through each iteration
  evolveGame(){
    // // Creates a new board
    // let emptyBoard = this.makeBoard();
    // // iterate through all the cells on the grid
    // for (let y = 0; y < this.rows; y++) {
    //   for (let x = 0; x < this.cols; x++) {

    //       // Calculate number of neighbours the cell has
    //       let neighbours = this.calculateCellNeighbours(this.board, x, y);
    //       console.log("neigh " + neighbours);
    //       // Conditions for the GAME OF LIFE
    //       if (this.board[y][x]) {
    //           if (neighbours === 2 || neighbours === 3) {
    //               emptyBoard[y][x] = true;
    //           } else {
    //               emptyBoard[y][x] = false;
    //           }
    //       } else {
    //           if (!this.board[y][x] && neighbours === 3) {
    //               emptyBoard[y][x] = true;
    //           }
    //       }
    //   }
    // }

  
    let newBoard = this.makeBoard();

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                let neighbors = this.numNeigh(this.board, x, y);
                if (this.board[y][x]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x] = true;
                    } else {
                        newBoard[y][x] = false;
                    }
                } else {
                    if (!this.board[y][x] && neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }

        this.board = newBoard;
        // console.log(this.board);
        this.setState({ cells: this.makeCells() });
        console.log(this.cells);


  }

  // ------------------------------- RENDERED HTML ----------------------------------------------------------

  render() {

    const cells = this.state.cells;
    console.log("Re-render");
    console.log(this.board);
    return (
      <div>
        {/* Div that represents the board, using App.css */}
        <div className="board" 
        // On click handler when the player clicks somewhere on the board such as a cell
        onClick={this.handleClick}
        // Saving the reference of where the player clicked, since CSS has been used to create the grid
        ref={ (z) => {this.boardRef = z; }}>
          
          {/* Using JSX to map the cells to the board by the x,y coords*/}
            {cells.map(cell => (
              
              <Cell x={cell.x} y={cell.y} key={`${cell.x}, ${cell.y}`} />
            ))}

        </div>

        {/* Div that holds the run/stop button */}
        <div>
          
              <button onClick={this.startGame}>Evolve</button>
              
        </div>

    </div>
    );
  }
}




