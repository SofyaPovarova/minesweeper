import React from "react";

const Clock = props => {
    let minutes = Math.floor(props.time / 60);
    let seconds = props.time - minutes*60 || 0;

    let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    let time = `${minutes}:${formattedSeconds}`;

    return (
        <div className="clock">
            <p>{time}</p>
        </div>
    )
};

export default Clock;