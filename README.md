# Game of Life

The Game of Life is set in an infinite two-dimensional grid inhabited by “cells”. Every cell interacts with up to eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. 

From an initial seed grid the game "evolves" one iteration at a time. An iteration applies rules to the grid to determine its next state.

This project was created for the BBC Software Engineer Graduate scheme assessment centre.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Prerequisites

* You will require [git](https://git-scm.com/) in order to clone the project from GitHub.

* You will require [Node.js](https://www.npmjs.com/) to access its package manager, [npm](https://www.npmjs.com/), which is used as a build tool and dependency manager.


### Installing

1. Clone the project into a directory of your choosing on your local machine.

2. Open a terminal in the root folder of the project and execute the following command to install the project dependencies:

```
npm install
```

3. Execute the following command the run the application on localhost:3000 : 

```
npm start
```

## Running the tests


## Deployment

Amazon Web Services (AWS) could be used to deploy the application onto the cloud. I would use the following setup:

```
+--------------------------------------------------------+
|     Virtual Private Cloud (VPC)                        |
|   +----------------------------------+                 |
|   |                                  |                 |
|   | Elastic Cloud Compute 2 (EC2)    |                 |
|   | with Elastic IP assigned to it   |--->  S3 for     |
|   |                                  |      storage    |
|   +----------------------------------+                 |
|                                                        |
+--------------------------------------------------------+

```
## Built With

* [ReactJS](https://reactjs.org/) - The web framework used
* [Node.js](https://www.npmjs.com/) - Build tool
* [NPM](https://www.npmjs.com/) - Dependency Management


## Reasoning for choice of technology


## Author

* **Morgan Jones** - *Project Dev* - [mjonjones](https://github.com/mjonjones). Please note that I work off two seperate laptops, which have resulted in two Morgan Jones contributing to this project.

## Acknowledgments

* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

* The README was craeted with guidance from [README Template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2).

