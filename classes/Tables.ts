import { GameCell, InfoCell } from "./Cells";
export class GameTable {
    rows: GameCell[][];
    infoRow: InfoCell[];
    infoCol: InfoCell[];
    constructor(table: HTMLTableElement) {
        const numRows = table.rows.length;
        const numCols = table.rows[0].cells.length;
        for (var i = 0; i < numRows; i++) {
            for (var j = 0; j < numCols; j++) {
                this.rows[i][j] = <GameCell>table.rows[i].cells[j];
                this.infoCol.push(<InfoCell>table.rows[i].cells[numCols - 1]);
            }
        }

        this.infoRow = <InfoCell[]>Array.from(table.rows[numRows-1].cells);
        this.infoRow.pop();
        this.infoCol.pop();
    }
}
