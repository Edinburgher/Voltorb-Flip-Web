import { VoltorbFlip } from "./classes/VoltorbFlip";

document.addEventListener("DOMContentLoaded", function (event) {
    let table: HTMLTableElement = <HTMLTableElement>document.getElementById("gameField");
    let game = new VoltorbFlip(table);


});

