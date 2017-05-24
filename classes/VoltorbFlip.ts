import { GameTable } from "./Tables"
export class VoltorbFlip {
    private gameTable: GameTable;
    private score: number;
    private level: number;
    private scoreSpan: HTMLSpanElement = document.getElementById("scoreField");
    constructor(table: HTMLTableElement) {
        this.gameTable = new GameTable(table);
        this.init();
    }

    private init() {
        let numRows: number = table.rows.length;
        let level: number = 2;

        let sumGame: number = 1;
        let sumColVals: number[] = [0, 0, 0, 0, 0];
        let numCol0s: number[] = [0, 0, 0, 0, 0];
        let numRow0123: number[] = [0, 0, 0, 0];
        let cols: number;



        // initialise gameField
        for (let i = 0; i < numRows - 1; i += 1) {
            let row: HTMLTableRowElement = table.rows[i];
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


                if (this.innerHTML == "0") {
                    alert("Game Over. Score: " + sumGame)
                }
                sumGame *= parseInt(this.innerHTML);
                scoreSpan.innerHTML = String(sumGame);

                //define left click behaviour
                cell.onclick = function () {
                    if (this.style.fontSize == "0px") {
                        this.style.fontSize = "48px";
                        this.style.backgroundColor = "dimgray";

                    }
                }
            }

            // write info cell for current row
            row.cells[cols - 1].innerHTML = "B: " + numRow0123[0] + "<br>P: " + sumRowVals;
            row.cells[cols - 1].style.fontSize = "32px";
        }

        // write info cells for columns
        let inforow = table.rows[numRows - 1]
        for (let i = 0; i < cols - 1; i++) {
            inforow.cells[i].innerHTML = "B: " + numCol0s[i] + "<br>P: " + sumColVals[i];
            inforow.cells[i].style.fontSize = "32px";
        }

        function checkFinished(): boolean {
            let finished: boolean = true;
            return true;
        }
    }
}