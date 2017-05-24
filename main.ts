enum CELL_STATE {
    REVEALED,
    MARKED,
    NOT_MARKED,
    HIDDEN
}
class GameCell extends HTMLTableCellElement {
    private _value: number;
    private _state: CELL_STATE;

    constructor() {
        super();
        this.style.backgroundColor = "dimgray";
    }

    public set value(v: number) {
        this._value = v;
        this.innerHTML = String(v);
    }

    /**
     * toogleMarked
     */
    public toogleMarked() {
        if (this._state === CELL_STATE.NOT_MARKED) {
            this.mark();
        } else {
            this.unmark();
        }
    }

    /**
     * setMarked
     */
    private mark() {
        this.style.backgroundColor = "yellow";
        this._state = CELL_STATE.MARKED;
    }

    /**
     * setUnmarked
     */
    private unmark() {
        this.style.backgroundColor = "dimgray";
        this._state = CELL_STATE.MARKED;
    }

    /**
     * reveal
     */
    public reveal() {
        this.style.fontSize = "48px";
        this.style.backgroundColor = "dimgray";
        this._state = CELL_STATE.REVEALED;
    }
}


class InfoCell extends HTMLTableCellElement {
    private _numBombs: number;
    private _sumPoints: number;

    constructor(parameters) {
        super();
    }

    /**
     * setInfo
     */
    public setInfo(numBombs: number, sumPoints: number) {
        this._numBombs = numBombs;
        this._sumPoints = sumPoints;
        this.innerHTML = "B: " + this._numBombs + "<br>P: " + this._sumPoints;
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    let gameField: HTMLTableElement = <HTMLTableElement>document.getElementById("gameField");
    let numRows: number = gameField.rows.length;
    let playField: HTMLTableElement = <HTMLTableElement>gameField.cloneNode(true);
    let infoBoxesRows: HTMLTableRowElement[];

    let scoreField: HTMLSpanElement = document.getElementById("scoreField");
    playField.deleteRow(numRows-1);
    let level: number = 2;

    let sumGame: number = 1;
    let sumColVals: number[] = [0, 0, 0, 0, 0];
    let numCol0s: number[] = [0, 0, 0, 0, 0];
    let numRow0123: number[] = [0, 0, 0, 0];
    let cols: number;

    // disable "normal" right click on gameField 
    gameField.oncontextmenu = function () {
        return false;
    }

    // initialise gameField
    for (let i = 0; i < numRows - 1; i += 1) {
        let row: HTMLTableRowElement = gameField.rows[i];
        cols = row.cells.length;
        let sumRowVals: number = 0;
        numRow0123 = [0, 0, 0, 0];
        for (let j = 0; j < cols - 1; j += 1) {
            let cell: GameCell = <GameCell>row.cells[j];
            //random int between 0 and int (excl.)
            let rand: number = Math.floor(Math.random() * 4);
            /*
            if (rand == 0) {
                rand = (sumRow0123[0] >= 5 + level) ? 1 : rand;
            }
            if (rand == 1) {
                rand = (sumRow0123[1] >= 16 - level) ? 2 : rand;
            }
            if (rand == 2) {
                rand = (sumRow0123[2] >= 2 + level) ? 3 : rand;
            }
            if (rand == 3) {
                rand = (sumRow0123[3] >= 1 + level) ? 1 : rand;
            }*/

            // write random value to current cell
            cell.innerHTML = String(rand);
            numRow0123[rand]++;
            if (rand === 0) {
                numCol0s[j]++;
            }
            sumRowVals += rand;
            sumColVals[j] += rand;

            // "hide" cell value
            cell.style.fontSize = "0px";

            // define right click behaviour
            cell.oncontextmenu = function () {
                if (this.style.backgroundColor !== "yellow" && this.style.fontSize == "0px") {
                    this.style.backgroundColor = "yellow";
                } else {
                    this.style.backgroundColor = "dimgray";
                }
            }

            //define left click behaviour
            cell.onclick = function () {
                if (this.style.fontSize == "0px") {
                    this.style.fontSize = "48px";
                    this.style.backgroundColor = "dimgray";
                    if (this.innerHTML == "0") {
                        alert("Game Over. Score: " + sumGame)
                    }
                    sumGame *= parseInt(this.innerHTML);
                    scoreField.innerHTML = String(sumGame);
                }
            }
        }

        // write info cell for current row
        row.cells[cols - 1].innerHTML = "B: " + numRow0123[0] + "<br>P: " + sumRowVals;
        row.cells[cols - 1].style.fontSize = "32px";
    }

    // write info cells for columns
    let inforow = gameField.rows[numRows - 1]
    for (let i = 0; i < cols - 1; i++) {
        inforow.cells[i].innerHTML = "B: " + numCol0s[i] + "<br>P: " + sumColVals[i];
        inforow.cells[i].style.fontSize = "32px";
    }

    function checkFinished(): boolean {
        let finished: boolean = true;
        return true;
    }
});

