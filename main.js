var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CELL_STATE;
(function (CELL_STATE) {
    CELL_STATE[CELL_STATE["REVEALED"] = 0] = "REVEALED";
    CELL_STATE[CELL_STATE["MARKED"] = 1] = "MARKED";
    CELL_STATE[CELL_STATE["NOT_MARKED"] = 2] = "NOT_MARKED";
    CELL_STATE[CELL_STATE["HIDDEN"] = 3] = "HIDDEN";
})(CELL_STATE || (CELL_STATE = {}));
var GameCell = (function (_super) {
    __extends(GameCell, _super);
    function GameCell() {
        var _this = _super.call(this) || this;
        _this.style.backgroundColor = "dimgray";
        return _this;
    }
    Object.defineProperty(GameCell.prototype, "value", {
        set: function (v) {
            this._value = v;
            this.innerHTML = String(v);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * toogleMarked
     */
    GameCell.prototype.toogleMarked = function () {
        if (this._state === CELL_STATE.NOT_MARKED) {
            this.mark();
        }
        else {
            this.unmark();
        }
    };
    /**
     * setMarked
     */
    GameCell.prototype.mark = function () {
        this.style.backgroundColor = "yellow";
        this._state = CELL_STATE.MARKED;
    };
    /**
     * setUnmarked
     */
    GameCell.prototype.unmark = function () {
        this.style.backgroundColor = "dimgray";
        this._state = CELL_STATE.MARKED;
    };
    /**
     * reveal
     */
    GameCell.prototype.reveal = function () {
        this.style.fontSize = "48px";
        this.style.backgroundColor = "dimgray";
        this._state = CELL_STATE.REVEALED;
    };
    return GameCell;
}(HTMLTableCellElement));
var InfoCell = (function (_super) {
    __extends(InfoCell, _super);
    function InfoCell(parameters) {
        return _super.call(this) || this;
    }
    /**
     * setInfo
     */
    InfoCell.prototype.setInfo = function (numBombs, sumPoints) {
        this._numBombs = numBombs;
        this._sumPoints = sumPoints;
        this.innerHTML = "B: " + this._numBombs + "<br>P: " + this._sumPoints;
    };
    return InfoCell;
}(HTMLTableCellElement));
document.addEventListener("DOMContentLoaded", function (event) {
    var gameField = document.getElementById("gameField");
    var numRows = gameField.rows.length;
    var playField = gameField.cloneNode(true);
    var infoBoxesRows = [].slice.call(playField.rows);
    var scoreField = document.getElementById("scoreField");
    playField.deleteRow(numRows - 1);
    var level = 2;
    var sumGame = 1;
    var sumColVals = [0, 0, 0, 0, 0];
    var numCol0s = [0, 0, 0, 0, 0];
    var numRow0123 = [0, 0, 0, 0];
    var cols;
    // disable "normal" right click on gameField 
    gameField.oncontextmenu = function () {
        return false;
    };
    // initialise gameField
    for (var i = 0; i < numRows - 1; i += 1) {
        var row = gameField.rows[i];
        cols = row.cells.length;
        var sumRowVals = 0;
        numRow0123 = [0, 0, 0, 0];
        for (var j = 0; j < cols - 1; j += 1) {
            var cell = row.cells[j];
            //random int between 0 and int (excl.)
            var rand = Math.floor(Math.random() * 4);
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
                }
                else {
                    this.style.backgroundColor = "dimgray";
                }
            };
            //define left click behaviour
            cell.onclick = function () {
                if (this.style.fontSize == "0px") {
                    this.style.fontSize = "48px";
                    this.style.backgroundColor = "dimgray";
                    if (this.innerHTML == "0") {
                        alert("Game Over. Score: " + sumGame);
                    }
                    sumGame *= parseInt(this.innerHTML);
                    scoreField.innerHTML = String(sumGame);
                }
            };
        }
        // write info cell for current row
        row.cells[cols - 1].innerHTML = "B: " + numRow0123[0] + "<br>P: " + sumRowVals;
        row.cells[cols - 1].style.fontSize = "32px";
    }
    // write info cells for columns
    var inforow = gameField.rows[numRows - 1];
    for (var i = 0; i < cols - 1; i++) {
        inforow.cells[i].innerHTML = "B: " + numCol0s[i] + "<br>P: " + sumColVals[i];
        inforow.cells[i].style.fontSize = "32px";
    }
    function checkFinished() {
        var finished = true;
        return true;
    }
});
