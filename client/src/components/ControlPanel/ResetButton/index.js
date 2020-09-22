import React from "react";

const ResetButton = props => {
    let emoji = props.status === "start" ? "🙂" :
        props.status === "play"  ? "🤩"   :
            props.status === "win"   ? "🥳" : "🙁";
    return (
        <div className="reset" onClick={() => props.resetGame()}>
            <p><span role="img">{emoji}</span></p>
        </div>
    )
};

export default ResetButton;