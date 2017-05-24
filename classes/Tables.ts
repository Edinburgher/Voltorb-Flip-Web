import { GameCell, InfoCell } from "./Cells";
export class GameTable {
    rows: GameCell[][];
    public infoRow: InfoCell[];
    public infoCol: InfoCell[];
    constructor(table: HTMLTableElement) {        
        const numRows = table.rows.length;
        const numCols = table.rows[0].cells.length;
        this.rows = new Array<Array<GameCell>>(numRows-1);
        this.infoCol = new Array<InfoCell>();
        this.infoRow = new Array<InfoCell>();

        for (var i = 0; i < this.rows.length; i++) {
            this.rows[i] = new Array<GameCell>();
        }
        // disable "normal" right click on gameField 
        table.oncontextmenu = function () {
            return false;
        }
        for (var i = 0; i < numRows -1 ; i++) {
            for (var j = 0; j < numCols -1; j++) {
                this.rows[i].push(new GameCell(table.rows[i].cells[j]));
            }
            this.infoCol.push(new InfoCell(table.rows[i].cells[numCols - 1]));
        }
        for (var i = 0; i < numCols-1; i++) {
            this.infoRow.push(new InfoCell(table.rows[numRows - 1].cells[i]));
        }        
    }
}
