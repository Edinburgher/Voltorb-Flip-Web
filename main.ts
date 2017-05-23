document.addEventListener("DOMContentLoaded", function (event) {
    var gameField: HTMLTableElement = <HTMLTableElement> document.getElementById("gameField");
    var scoreField = document.getElementById("scoreField");
    var rows = gameField.rows.length;
    var level = 2;
    var sumGame = 1;

    var sumColVals = [0, 0, 0, 0, 0];
    var numCol0s = [0, 0, 0, 0, 0];
    var numRow0123 = [0, 0, 0, 0];
    gameField.oncontextmenu = function () {
        return false;
    }
    for (var i = 0; i < rows - 1; i += 1) {
        var row = gameField.rows[i];
        var cols = row.cells.length;
        var sumRowVals = 0;
        numRow0123 = [0, 0, 0, 0];
        for (var j = 0; j < cols - 1; j += 1) {
            var cell = row.cells[j];
            //random int between 0 and int (excl.)
            var rand = Math.floor(Math.random() * 4);
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

            cell.innerHTML = String(rand);
            numRow0123[rand]++;
            if (rand === 0) {
                numCol0s[j]++;
            }
            sumRowVals += rand;
            sumColVals[j] += rand;
            cell.style.fontSize = "0px";
            cell.oncontextmenu = function () {
                if (this.style.backgroundColor !== "yellow" && this.style.fontSize == "0px") {
                    this.style.backgroundColor = "yellow";
                } else {
                    this.style.backgroundColor = "dimgray";
                }
            }
            cell.onclick = function () {
                if (this.style.fontSize == "0px") {
                    this.style.fontSize = "48px";
                    this.style.backgroundColor = "dimgray";
                    if (this.innerHTML == "0") {
                        alert("Game Over. Score: " + sumGame)
                    }
                    sumGame *= parseInt(this.innerHTML);
                    scoreField.innerHTML = String(sumGame);
                }
            }
        }

        row.cells[cols - 1].innerHTML = "B: " + numRow0123[0] + "<br>P: " + sumRowVals;
        row.cells[cols - 1].style.fontSize = "32px";
    }
    var inforow = gameField.rows[rows - 1]
    for (var i = 0; i < cols - 1; i++) {
        inforow.cells[i].innerHTML = "B: " + numCol0s[i] + "<br>P: " + sumColVals[i];
        inforow.cells[i].style.fontSize = "32px";
    }


});

function checkFinished(): boolean {
    return true;
}