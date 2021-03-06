(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const VoltorbFlip_1 = require("./classes/VoltorbFlip");
document.addEventListener("DOMContentLoaded", function (event) {
    let game = new VoltorbFlip_1.VoltorbFlip();
});

},{"./classes/VoltorbFlip":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CELL_STATE;
(function (CELL_STATE) {
    CELL_STATE[CELL_STATE["REVEALED"] = 0] = "REVEALED";
    CELL_STATE[CELL_STATE["MARKED"] = 1] = "MARKED";
    CELL_STATE[CELL_STATE["NOT_MARKED"] = 2] = "NOT_MARKED";
})(CELL_STATE || (CELL_STATE = {}));
class GameCell {
    constructor(cell) {
        this.mark = () => {
            this._cell.style.backgroundColor = "yellow";
            this._state = CELL_STATE.MARKED;
        };
        this.unmark = () => {
            this._cell.style.backgroundColor = "dimgray";
            this._state = CELL_STATE.NOT_MARKED;
        };
        this.reveal = () => {
            if (this._state !== CELL_STATE.REVEALED) {
                this._cell.style.fontSize = "48px";
                this._cell.style.backgroundColor = "dimgray";
                this._state = CELL_STATE.REVEALED;
                return this._value;
            }
            return -1;
        };
        this.toogleMarked = () => {
            if (this._state === CELL_STATE.NOT_MARKED) {
                this._cell.style.backgroundColor = "yellow";
                this._state = CELL_STATE.MARKED;
            }
            else if (this._state === CELL_STATE.MARKED) {
                this._cell.style.backgroundColor = "dimgray";
                this._state = CELL_STATE.NOT_MARKED;
            }
        };
        this._cell = cell;
        this._cell.style.backgroundColor = "dimgray";
        this._cell.style.fontSize = "0px";
        this.value = 0;
        this._state = CELL_STATE.NOT_MARKED;
        this._cell.oncontextmenu = this.toogleMarked;
    }
    set value(v) {
        this._value = v;
        this._cell.innerHTML = String(v);
    }
    checkFinishCondition() {
        return (this._value > 1 && this._state !== CELL_STATE.REVEALED);
    }
}
exports.GameCell = GameCell;
class InfoCell {
    constructor(cell) {
        this.addBombOrPoints = (p) => {
            if (p === 0) {
                this._numBombs++;
            }
            else {
                this._sumPoints += p;
            }
        };
        this.setInfo = () => {
            this._cell.innerHTML = ((this._sumPoints > 9) ? ("P:") : ("P: ")) + this._sumPoints + "<br><img src='https://www.pokewiki.de/images/a/ac/Pok%C3%A9monsprite_100_XY.gif'>x" + this._numBombs;
        };
        this._cell = cell;
        this._cell.style.fontSize = "28px";
        this._numBombs = 0;
        this._sumPoints = 0;
    }
}
exports.InfoCell = InfoCell;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cells_1 = require("./Cells");
class GameTable {
    constructor(table) {
        const numRows = table.rows.length;
        const numCols = table.rows[0].cells.length;
        this.rows = new Array(numRows - 1);
        this.infoCol = new Array();
        this.infoRow = new Array();
        for (var i = 0; i < this.rows.length; i++) {
            this.rows[i] = new Array();
        }
        table.oncontextmenu = function () {
            return false;
        };
        for (var i = 0; i < numRows - 1; i++) {
            for (var j = 0; j < numCols - 1; j++) {
                this.rows[i].push(new Cells_1.GameCell(table.rows[i].cells[j]));
            }
            this.infoCol.push(new Cells_1.InfoCell(table.rows[i].cells[numCols - 1]));
        }
        for (var i = 0; i < numCols - 1; i++) {
            this.infoRow.push(new Cells_1.InfoCell(table.rows[numRows - 1].cells[i]));
        }
    }
}
exports.GameTable = GameTable;

},{"./Cells":2}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Tables_1 = require("./Tables");
class VoltorbFlip {
    constructor() {
        this.generateTable = () => {
            let oldTable = document.getElementById("gameField");
            if (oldTable !== null) {
                document.body.removeChild(oldTable);
            }
            let dynTable = document.createElement("table");
            dynTable.id = "gameField";
            dynTable.className = "game inline";
            for (var i = 0; i < this.level + 5; i++) {
                var tr = document.createElement('tr');
                for (var j = 0; j < this.level + 5; j++) {
                    var td = document.createElement("td");
                    tr.appendChild(td);
                }
                dynTable.appendChild(tr);
            }
            document.body.appendChild(dynTable);
            return dynTable;
        };
        this.init = () => {
            this.gameTable = new Tables_1.GameTable(this.generateTable());
            let rand = 0;
            this.gameTable.rows.forEach((row, i) => {
                let max0s = this.level;
                let min0s = this.level / 2;
                let curr0 = 0;
                row.forEach((cell, j) => {
                    if (curr0 >= max0s) {
                        rand = Math.floor(Math.random() * 3) + 1;
                    }
                    else if (curr0 <= min0s) {
                        rand = Math.floor(Math.random() * 4);
                    }
                    else {
                        rand = Math.floor(Math.random() * 4);
                    }
                    cell.value = rand;
                    this.gameTable.infoCol[i].addBombOrPoints(rand);
                    this.gameTable.infoRow[j].addBombOrPoints(rand);
                    cell._cell.onclick = () => {
                        var cellValue = cell.reveal();
                        if (cellValue === 0) {
                            alert("Game Over. Score: " + this.score);
                            this.score = 1;
                            this.level = 1;
                            this.scoreSpan.innerHTML = String(this.score);
                            this.init();
                        }
                        else if (cellValue !== -1) {
                            this.score *= cellValue;
                            this.scoreSpan.innerHTML = String(this.score);
                            if (this.checkFinished()) {
                                alert("Congratulations! Score: " + this.score);
                                this.level++;
                                this.init();
                            }
                        }
                    };
                });
            });
            this.gameTable.infoCol.forEach(infoCell => {
                infoCell.setInfo();
            });
            this.gameTable.infoRow.forEach(infoCell => {
                infoCell.setInfo();
            });
        };
        this.score = 1;
        this.level = 1;
        this.init();
        this.scoreSpan = document.getElementById("scoreField");
    }
    checkFinished() {
        let finished = true;
        this.gameTable.rows.forEach(row => {
            row.forEach(cell => {
                if (cell.checkFinishCondition())
                    finished = false;
            });
        });
        return finished;
    }
}
exports.VoltorbFlip = VoltorbFlip;

},{"./Tables":3}]},{},[1,2,4,3]);
