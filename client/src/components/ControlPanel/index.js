import React from "react";
import Clock from "./Clock"
import FlagCounter from "./FlagCounter"
import ResetButton from "./ResetButton";


const Header = props => {
    return (
        <div className="controlPanel">
            <FlagCounter flags={props.flags} />
            <ResetButton status={props.status} resetGame={props.resetGame}/>
            <Clock time={props.time}/>
        </div>
    );
};

export default Header;
