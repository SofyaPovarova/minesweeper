import React, {Component} from 'react';
import './App.css';
import bomb from "./bomb.png";
import Field from "./components/Field"
import ControlPanel from "./components/ControlPanel";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: "start",// reset running lose win
            rows: 9,
            columns: 8,
            flags: 10,
            mines: 10,
            openedCells: 0,
            time: 0,
        };
        this.intervals=[];
        this.tick = this.tick.bind(this);
        this.incOpenedCells = this.incOpenedCells.bind(this);
        this.winGame = this.winGame.bind(this);
        this.startGame = this.startGame.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.endGame = this.endGame.bind(this);
        this.changeFlagAmount = this.changeFlagAmount.bind(this);
    }

    tick () {
        if ( this.state.status === "play") {
            let time = this.state.time + 1;
            this.setState({time});
        }
    };

    setInterval (fn, t) {
        this.intervals.push(setInterval(fn,t));
    };

    startGame () {
        this.setState({
            status: "play"
        }, () => {
            console.log(this.state.status)
            this.setInterval(this.tick, 1000);
        });

    };

    endGame () {
        this.setState({
            status: "lose"
        })
    };

    winGame () {
        if (this.state.openedCells + this.state.mines === this.state.rows * this.state.columns) {
            this.setState({
                status: "win"
            });
        }
    };

    incOpenedCells (){
        this.setState( prevState => {
            return {
                openedCells: prevState.openedCells + 1
            }
        });
    };

    resetGame () {
        console.log("THE resett")
        this.setState({
            status: "start",//waiting reset play ended
            flags: 10,
            openedCells: 0,
            time: 0,
        });
        this.intervals.map(clearInterval);
    };

    changeFlagAmount (amount) {
        let flags =  this.state.flags + amount;
        this.setState({flags});
    };

    render(){
        return (
            <div className="minesweeper">
                <div className="header">
                    <p className="gameName" data-text="Minesweeper">Minesweeper</p>
                    <img className="minesweeper-logo" src={bomb}/>
                </div>
                <ControlPanel
                    flags={this.state.flags}
                    status={this.state.status}
                    resetGame={this.resetGame}
                    time={this.state.time}/>
                <Field
                    columns={this.state.columns}
                    rows={this.state.rows}
                    mines={this.state.mines}
                    flags={this.state.flags}
                    openedCells={this.state.openedCells}
                    incOpenedCells={this.incOpenedCells}
                    startGame={this.startGame}
                    resetGame={this.resetGame}
                    endGame={this.endGame}
                    winGame={this.winGame}
                    status={this.state.status}
                    changeFlagAmount={this.changeFlagAmount}
                />
            </div>
        );
    }
}

export default App;
