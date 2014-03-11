function Hare() {

    this.move = function (step) {
        console.log('Hare coordinates: ' + this.row + ' ' + this.col);

        var map = Registry.map;//link to global map object

        var moved = false;
        while (!moved) {

            var row = this.row;
            var col = this.col;

            //http://javascript.ru/Math.random
            var move_direction = Math.floor(Math.random() * (7 - 0 + 1)) + 0;
            console.log('move direction = ' + move_direction);
            //        1 0 7
            //        2 X 6
            //        3 4 5

            if (move_direction == 0) {
                row = -step;
            }
            else if (move_direction == 1) {
                row -= step;
                col -= step;
            }
            else if (move_direction == 2) {
                col -= step;
            }
            else if (move_direction == 3) {
                row += step;
                col -= step;
            }
            else if (move_direction == 4) {
                row += step;
            }
            else if (move_direction == 5) {
                row += step;
                col += step;
            }
            else if (move_direction == 6) {
                col += step;
            }
            else if (move_direction == 7) {
                row -= step;
                col += step;
            }
            var cell_is_empty = map.isCellEmpty(row, col);
            console.log('Cell is empty? ' + cell_is_empty);
            if (cell_is_empty) {
                //clear current cell
                map.clearCell(this.row, this.col);
                this.row=row; this.col=col;
                //place hare
                map.placeAnyObject(this.row, this.col, this);
                moved = true;
            }
        }
        console.log('moving hare to ' + row + ', ' + col);

        return {row:this.row, col:this.col};//for console viewing

    }

}