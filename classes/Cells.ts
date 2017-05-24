enum CELL_STATE {
    REVEALED,
    MARKED,
    NOT_MARKED,
    HIDDEN
}
export class GameCell extends HTMLTableCellElement {
    private _value: number;
    private _state: CELL_STATE;

    constructor() {
        super();
        this.style.backgroundColor = "dimgray";
        this.style.fontSize = "0px";

        // define right click behaviour
        this.oncontextmenu = this.toogleMarked;

        //define left click behaviour
        this.onclick = this.reveal;
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
    public reveal(): number {
        //TODO: Exception throw?
        if (this._state === CELL_STATE.HIDDEN) {
            this.style.fontSize = "48px";
            this.style.backgroundColor = "dimgray";
            this._state = CELL_STATE.REVEALED;
            return this._value;
        }
        return -1;
    }
}

export class InfoCell extends HTMLTableCellElement {
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