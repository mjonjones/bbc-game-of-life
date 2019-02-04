# Workings

This file has been used to record my logic for design choices throughout the project, rough notes, possible requirements and any ideas.


## Scenarios

My psedo code and visual understanding of what each 'scenario' looks like:


```
Scenario: 0


+--+--+--+      +--+--+--+ 
|  |  |  |      |  |  |  |
+--+--+--+      +--+--+--+
|  | |  | ---> |  |  |  |
+--+--+--+      +--+--+--+
|  |  |  |      |  |  |  |
+--------+      +--------+

```

```
Scenario: 1

+--+--+--+      +--+--+--+ 
|  |  |  |      |  |  |  |
+--+--+--+      +--+--+--+
|  |0 |  | ---> |  |  |  |
+--+--+--+      +--+--+--+
|  |  |  |      |  |  |  |
+--------+      +--------+

if (cell.liveCellNeighbours < 2){
    cell.cellLive = false
}
```

```
Scenario: 2

if (cell.liveCellNeighbours < 3){
    cell.cellLive = false
}
```

```
Scenario: 3

if (cell.liveCellNeighbours == 3 || 2){
    cell.cellLive = true
}
```

```
Scenario: 4

if (cell.liveCellNeighbours == 3 && cell.celllive = false ){
    cell.cellLive = true
}
```

```
Scenario: 4

if (cell.liveCellNeighbours == 3 && cell.celllive = false ){
    cell.cellLive = true
}
```

```
Scenario: 5

+--+--+--+      +--+--+--+ 
|  |  |  |      |  |  |  |
+--+--+--+      +--+--+--+
|0 |0 |0 | ---> |  |  |  |
+--+--+--+      +--+--+--+
|  |  |  |      |  |  |  |
+--------+      +--------+
```

## Assumptions

1. When a cell on the grid is 'live', its true neigbours are those which are also 'live' in horizontal, vertical and diagonal directions.

    This has been dervived from the fact  "_The Game of Life is set in an infinite two-dimensional...._" - Thus a cell cannot have fewer than two neighbours, unless we are referring to live neighbours.

2. The initial state of the game is three adjacent horizontal live cells, as shown in the document (Scenario 6) or is a grid with 0 live cells (Scenario 5)

3. Scenarios 5 and 6 contradict eachothers logic since they rely on different initial starting grids. Therefore Scenarios 5 and 6 will never occur in the **same** game.

    It is also worth mentioning that Scenario 0 & 5 are incredibly similar if not the same.


## Requirements

- I want a live cell to die if it has fewer than 2 live neighbours.

- I want a live cell to die if it has more than 3 live neighbours.

- I want a cell to stay live if it has 2 or 3 live neighbours.

- I want a dead cell to become live if it has exactly 3 live neighbours

## Rough notes

### Possible components

Cell Component/class:
* Boolean liveCell - true if live, false if dead
* liveNeighbours - integer number of live cells adjacent or diagonal to the cell.

Grid component/class:
* Start with a 3x3 grid?

Button to 'evolve' state of game:
* Onclick handler that sends an event to cells


Alternativley could use a 2D array


### Using a 2D array

A 2d Array could be used to make the grid and then allow the user to click the individual cells.
However, since the cells are no longer components, the entire board must be clicked instead. This is possible but the specific coordinates of the cells will need to be calculated using a method.

From here the X, Y coordinates can be stored in the 2D Array for every live cell and can be used to work out the number of neighnours it has
