enum CELL_STATE {
    REVEALED,
    MARKED,
    NOT_MARKED
}
export class GameCell {
    private _value: number;
    private _state: CELL_STATE;
    public _cell: HTMLTableCellElement;

    constructor(cell: HTMLTableCellElement) {
        this._cell = cell;
        this._cell.style.backgroundColor = "dimgray";
        this._cell.style.fontSize = "0px";
        this.value = 0;
        this._state = CELL_STATE.NOT_MARKED;

        // define right click behaviour
        this._cell.oncontextmenu = this.toogleMarked;
    }

    public set value(v: number) {
        this._value = v;
        this._cell.innerHTML = String(v);
    }
    /**
 * setMarked
 */
    private mark = () => {
        this._cell.style.backgroundColor = "yellow";
        this._state = CELL_STATE.MARKED;
    }

    /**
     * setUnmarked
     */
    private unmark = () => {
        this._cell.style.backgroundColor = "dimgray";
        this._state = CELL_STATE.NOT_MARKED;
    }

    /**
     * reveal
     */
    public reveal = (): number => {
        //TODO: Exception throw?
        if (this._state !== CELL_STATE.REVEALED) {
            this._cell.style.fontSize = "48px";
            this._cell.style.backgroundColor = "dimgray";
            this._state = CELL_STATE.REVEALED;
            return this._value;
        }
        return -1;
    }

    /**
     * toogleMarked
     */
    public toogleMarked = () => {
        if (this._state === CELL_STATE.NOT_MARKED) {
            this._cell.style.backgroundColor = "yellow";
            this._state = CELL_STATE.MARKED;
        } else if(this._state === CELL_STATE.MARKED) {
            this._cell.style.backgroundColor = "dimgray";
            this._state = CELL_STATE.NOT_MARKED;
        }
    }

    /**
     * checkFinishCondition
     */
    public checkFinishCondition(): boolean {
        return (this._value > 1 && this._state !== CELL_STATE.REVEALED);
    }

}

export class InfoCell {
    private _numBombs: number;
    private _sumPoints: number;
    public _cell: HTMLTableCellElement;

    constructor(cell: HTMLTableCellElement) {
        this._cell = cell;
        this._cell.style.fontSize = "28px";
        //this._cell.style.textAlign = "left";
        this._numBombs = 0;
        this._sumPoints = 0;
    }

    public addBombOrPoints = (p: number) => {
        if (p === 0) {
            this._numBombs++;
        } else {
            this._sumPoints += p;
        }
    }

    /**
     * setInfo
     */
    public setInfo = () => {
        this._cell.innerHTML = ((this._sumPoints>9)? ("P:") : ("P:")) + this._sumPoints + "<br><img src='https://www.pokewiki.de/images/a/ac/Pok%C3%A9monsprite_100_XY.gif'>x" + this._numBombs;
    }
}