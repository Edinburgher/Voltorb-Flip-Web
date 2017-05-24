"use strict";
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
exports.GameCell = GameCell;
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
exports.InfoCell = InfoCell;
