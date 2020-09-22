import React from "react";

const FlagCounter = props => {
    return (
        <div className="flagCounter" >
            <div className="amountOfBombs">
                <p>💣{props.flags}</p>
            </div>
        </div>
    )
};

export default FlagCounter;