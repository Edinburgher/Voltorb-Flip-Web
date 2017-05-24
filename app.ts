import { VoltorbFlip } from "./classes/VoltorbFlip";

document.addEventListener("DOMContentLoaded", function (event) {
    let table: HTMLTableElement = <HTMLTableElement>document.getElementById("gameField");
    let game = new VoltorbFlip(table);

    /*if (rand == 0) {
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
});

