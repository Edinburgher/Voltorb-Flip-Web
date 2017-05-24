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

    private init() {
        this.gameTable.rows.forEach((row, i) => {

            row.forEach((cell, j) => {
                let rand: number = Math.floor(Math.random() * 4);

                // write random value to current cell
                cell.value = rand;
                this.gameTable.infoCol[i].addBombOrPoints(rand);
                this.gameTable.infoRow[j].addBombOrPoints(rand);
                
                cell._cell.onclick = () => {
                    var cellValue = cell.reveal()
                    if (cellValue === 0) {

                        alert("Game Over. Score: " + this.score)
                    }
                    this.score *= cellValue;
                    this.scoreSpan.innerHTML = String(cellValue);
                }
            });
        });
        this.gameTable.infoCol.forEach(infoCell => {
            infoCell.setInfo();
        });
        this.gameTable.infoRow.forEach(infoCell => {
            infoCell.setInfo();
        });

        function checkFinished(): boolean {
            let finished: boolean = true;
            return true;
        }
    }
}