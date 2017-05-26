import { GameTable } from "./Tables"
export class VoltorbFlip {
    private gameTable: GameTable;
    private score: number;
    private level: number;
    private scoreSpan: HTMLSpanElement;
    constructor() {
        this.score = 1;
        this.level = 1;
        this.init();
        this.scoreSpan = document.getElementById("scoreField");
    }

    private generateTable = (): HTMLTableElement => {
        let oldTable = document.getElementById("gameField");
        if (oldTable !== null) {
            document.body.removeChild(oldTable);
        }

        let dynTable = document.createElement("table");
        dynTable.id = "gameField";
        dynTable.className = "game inline";
        for (var i = 0; i < this.level + 5; i++) {
            var tr: HTMLTableRowElement = document.createElement('tr');
            for (var j = 0; j < this.level + 5; j++) {
                var td: HTMLTableCellElement = document.createElement("td");
                tr.appendChild(td);
            }
            dynTable.appendChild(tr);
        }
        document.body.appendChild(dynTable);
        return dynTable;
    }
    
    private init = () => {
        this.gameTable = new GameTable(this.generateTable());
        let rand: number = 0;
        this.gameTable.rows.forEach((row, i) => {
            let max0s: number = this.level;
            let min0s: number = this.level / 2;
            let curr0: number = 0;

            row.forEach((cell, j) => {
                if (curr0 >= max0s) {
                    rand = Math.floor(Math.random() * 3) + 1;
                } else if (curr0 <= min0s) {
                    rand = Math.floor(Math.random() * 4);
                } else {
                    rand = Math.floor(Math.random() * 4);
                }

                // write random value to current cell
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
                    } else if (cellValue !== -1) {
                        this.score *= cellValue;
                        this.scoreSpan.innerHTML = String(this.score);
                        if (this.checkFinished()) {
                            alert("Congratulations! Score: " + this.score);
                            this.level++;
                            this.init();
                        }
                    }
                }
            });
        });

        //write Data to infoCells
        this.gameTable.infoCol.forEach(infoCell => {
            infoCell.setInfo();
        });
        this.gameTable.infoRow.forEach(infoCell => {
            infoCell.setInfo();
        });
    }

    checkFinished(): boolean {
        let finished: boolean = true;
        this.gameTable.rows.forEach(row => {
            row.forEach(cell => {
                if (cell.checkFinishCondition())
                    finished = false;
            });
        });
        return finished;
    }
}