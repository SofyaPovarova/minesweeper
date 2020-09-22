import React, { Component } from "react";
import Cell from './Cell'

//info for cells will be used in the next stage
const Row = props => {
    let cells = props.cells.map((data, index) => {
        return (
            <Cell
                key={index}
                data={data}
                flagCell={props.flagCell}
                openCell={props.openCell}
            />
        )
    });

    return(
        <div className="row">
            {cells}
        </div>
    )
};

export default Row;