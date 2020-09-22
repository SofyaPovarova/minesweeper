import React, {Component} from "react";
import Row from './Row'

class Field extends Component{
    constructor(props) {
        super(props);

        this.state = {
            field: this.createField(props)
        }
        this.openCell = this.openCell.bind(this);
        this.flagCell = this.flagCell.bind(this);
        this.tryOpenAround = this.tryOpenAround.bind(this);
        this.checkAround = this.checkAround.bind(this);
        this.checkAround = this.checkAround.bind(this);
    }

    //при перересовке поля вызывается change this method
    componentWillReceiveProps(nextProps) {
        if ( nextProps.status === "start" && this.props.openedCells > 0) {
            console.log("CompWillReceive")
            this.setState({
                field: this.createField(nextProps)
            });
        }
    }

    //create matrix with objects with info about cell
    createField (props) {
        let field = [];
        for (let i=0; i< props.rows; i++) {
            field.push([]);
            for (let j=0; j< props.columns; j++) {
                field[i].push({
                    x:j,
                    y:i,
                    isOpen: false,
                    minesAround: 0,
                    hasMine: false,
                    hasFlag: false
                });
            }
        }

        //randomly put mines
        for(let i=0; i< this.props.mines; i++) {
            let randomRow = Math.floor(Math.random() * props.rows);
            let randomColumn = Math.floor( Math.random() * props.columns);

            let cell = field[randomRow][randomColumn];

            if (cell.hasMine) {
                i--;
            } else {
                cell.hasMine = true;
            }
        }

        console.table(field);
        return field;
    };

    //сделать эти 2 метода получше
    checkAround (cell) {
        let minesAround = 0;
        for (let row = -1; row <= 1; row++) {
            for (let col = -1; col <= 1; col++) {
                if (!(row === 0 && col === 0) &&
                    cell.y + row >= 0 && cell.x + col >= 0 &&
                    cell.y + row < this.state.field.length &&
                    cell.x + col < this.state.field[0].length &&
                    this.state.field[cell.y + row][cell.x + col].hasMine) {
                    minesAround++;
                }
            }
        }
        return minesAround;
    };

    tryOpenAround (cell) {
        let field = this.state.field;
        for (let row = -1; row <= 1; row++) {
            for (let col = -1; col <= 1; col++){
                if (!(row === 0 && col === 0) &&
                    cell.y + row >= 0 && cell.x + col >= 0 &&
                    cell.y + row < field.length &&
                    cell.x + col < field[0].length &&
                    !field[cell.y + row][cell.x + col].hasMine &&
                    !field[cell.y + row][cell.x + col].isOpen) {
                    this.openCell(field[cell.y + row][cell.x + col])
                }
            }
        }
    };

    showAllMines () {
        let field = this.state.field
        for (let i = 0; i < this.props.rows; i++) {
            for (let j = 0; j < this.props.columns; j++) {
                if (field[i][j].hasMine) {
                    field[i][j].isOpen = true;
                }
            }
        }
        this.setState(field)
    }

    openCell = (cell) => {
        if (this.props.status === "lose") {
            return;
        }

        new Promise(resolve =>  {
            if (this.props.status === "start") this.props.startGame();
            let mines = this.checkAround(cell);
            resolve(mines);
        }).then( minesAround => {
            let field = this.state.field;
            let currentCell = field[cell.y][cell.x];

            if (currentCell.hasMine && this.props.openedCells === 0) {
                //console.log("From mine" )
                let newRows = this.createField(this.props);
                this.setState({field: newRows}, () =>{
                    this.openCell(cell);
                })
            } else {
                if (!currentCell.isOpen && !currentCell.hasFlag) {
                    this.props.incOpenedCells();

                    currentCell.isOpen = true;
                    currentCell.minesAround = minesAround;

                    this.setState({field});

                    if (!currentCell.hasMine && minesAround === 0) {
                        this.tryOpenAround(cell);
                    }

                    if (currentCell.hasMine && this.props.openedCells !== 0) {
                        this.showAllMines();
                        this.props.endGame();
                    }

                    this.props.winGame()

                }
            }
        });
    };

    flagCell (cell) {
        if (this.props.status === "lose") {
            return;
        }

        let field = this.state.field;

        if ( this.props.flags <= 0 && !cell.hasFlag || this.props.flags >= 10 && cell.hasFlag) {
            return
        }
        cell.hasFlag = !cell.hasFlag;
        this.setState({ field });
        this.props.changeFlagAmount(cell.hasFlag ? -1 : 1);
        this.props.winGame();
    };

    render() {
        return (
            <div className="board">
                {this.state.field.map((row,index) => {
                    return (
                        <Row
                            key={index}
                            cells={row}
                            flagCell={this.flagCell}
                            openCell={this.openCell}
                        />
                    )
                })}
            </div>
        )
    }
}

export default Field;

