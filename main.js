document.addEventListener("DOMContentLoaded", function (event) {
    var gameField = document.getElementById("gameField");
    var rows = gameField.rows.length;
    var level = 2;
    var sum0123 = [0, 0, 0, 0];
    gameField.oncontextmenu = function () {
        return false;
    }
    for (var i = 0; i < rows - 1; i += 1) {
        var row = gameField.rows[i];
        var cols = row.cells.length;
        var sumRow = 0;
        sum0123 = [0, 0, 0, 0];
        for (var j = 0; j < cols - 1; j += 1) {
            var cell = row.cells[j];
            //random int between 0 and int (excl.)
            var rand = Math.floor(Math.random() * 4);
            /*
            if (rand == 0) {
                rand = (sum0123[0] >= 5 + level) ? 1 : rand;
            }
            if (rand == 1) {
                rand = (sum0123[1] >= 16 - level) ? 2 : rand;
            }
            if (rand == 2) {
                rand = (sum0123[2] >= 2 + level) ? 3 : rand;
            }
            if (rand == 3) {
                rand = (sum0123[3] >= 1 + level) ? 1 : rand;
            }*/

            cell.innerHTML = rand;
            sum0123[rand]++;
            sumRow+=rand;
            cell.oncontextmenu = function () {
                if (this.style.backgroundColor !== "yellow") {
                    this.style.backgroundColor = "yellow";
                } else {
                    this.style.backgroundColor = "dimgray";
                }
            }
        }
        row.cells[cols-1].innerHTML = "B: " + sum0123[0] + "\nP: " + sumRow;
    }

});