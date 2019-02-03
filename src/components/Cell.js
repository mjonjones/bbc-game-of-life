import React, { Component } from 'react';
import './App.css';


export default class Cell extends Component {

    render(){
        // x, y coords for the cells, passed via App.js
        const {x, y} = this.props;
        return(
            // Use of in-line styles to adjust the cells x-y coordinates
            <div className="cell" style={{
                left: `${20* x + 1}px`,
                top: `${20 * y + 1}px`,
                width: `${20 - 1}px`,
                height: `${20 - 1}px`,
            }}></div>
        );
    }
}
