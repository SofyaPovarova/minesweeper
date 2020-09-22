import React from "react";
import target from "../../../../target.png"
import fired from "../../../../fired.png"

const Cell = (props) => {
    const renderCell = () => {
        if (props.data.isOpen){
            if (props.data.hasMine) {
                return (
                    <div className="cell fired"
                         onContextMenu={
                             e => {
                                 e.preventDefault();
                             }}
                         onClick={() => props.openCell(props.data)}>
                        <img className="target" src={fired}></img>
                    </div>
                )
            } else if (props.data.minesAround > 0) {
                return (
                    <div className="cell opened"
                         onContextMenu={
                             e => {
                                 e.preventDefault();
                             }}
                         onClick={() => props.openCell(props.data)}>
                        <p className="num">{props.data.minesAround}</p>
                    </div>
                )
            } else {
                return (
                    <div className="cell opened"
                         onContextMenu={
                             e => {
                                 e.preventDefault();
                             }}
                         onClick={() => props.openCell(props.data)}>
                    </div>
                )
            }
        } else if (props.data.hasFlag) {
            return (
                <div className="cell closed"
                     onContextMenu={
                         e => {
                             e.preventDefault();
                             props.flagCell(props.data);
                         }}
                     onClick={() => props.openCell(props.data)}>
                    <img className="target" src={target}></img>
                </div>
            )
        } else {
            return (
                <div className="cell closed"
                     onContextMenu={
                         e => {
                             e.preventDefault();
                             props.flagCell(props.data);
                         }}
                     onClick={() => props.openCell(props.data)}>
                </div>
            )
        }
    };

    return renderCell()

};

export default Cell;