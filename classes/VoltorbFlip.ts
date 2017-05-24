import { GameTable } from "./Tables"
export class VoltorbFlip {
    private gameTable: GameTable;
    private score: number;
    private level: number;
    private scoreSpan: HTMLSpanElement;
    constructor(table: HTMLTableElement) {
        this.gameTable = new GameTable(table);
        this.init();
        this.score = 1;
        this.level = 1;
        this.scoreSpan = document.getElementById("scoreField");
    }

    private init = () => {

        let rand: number = 0;
        this.gameTable.rows.forEach((row, i) => {
            let max0s: number = this.level;
            let min0s: number = this.level / 2;
            let curr0: number = 0;

            row.forEach((cell, j) => {
                if (curr0 >= max0s) {
                    rand = Math.floor(Math.random() * 3) + 1;
                } else if (curr0 <= min0s) {
                    
                }

                // write random value to current cell
                cell.value = rand;
                this.gameTable.infoCol[i].addBombOrPoints(rand);
                this.gameTable.infoRow[j].addBombOrPoints(rand);

                cell._cell.onclick = () => {
                    var cellValue = cell.reveal();
                    if (cellValue === 0) {
                        alert("Game Over. Score: " + this.score)
                    } else if (cellValue !== -1) {
                        this.score *= cellValue;
                        this.scoreSpan.innerHTML = String(this.score);
                        if (this.checkFinished()) {
                            alert("Congratulations! Score: " + this.score);
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