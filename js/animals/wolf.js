function Wolf() {

    this.move = function (step) {
        console.log('Wolf coordinates: ' + this.row + ' ' + this.col);

        var map = Registry.map;//link to global map object
        var hare = Registry.app.hare;//link to global hare object


        //find the shortest path to hare
        //use Pathfinder.js to find shortest path
        var matrix = map.getMatrix();

        matrix[this.row][this.col] = 0;//set this nodes walkable for pathfinder
        matrix[hare.row][hare.col] = 0;//set this nodes walkable for pathfinder

        console.log('Pathfinder matrix: ');
        console.log(matrix);

        var grid = new PF.Grid(map.getColumnsCount(), map.getRowsCount(), matrix);
        var finder = new PF.AStarFinder({
            allowDiagonal: true
        });

        var path = finder.findPath(this.col, this.row, hare.col, hare.row, grid);
        console.log('Shortest path: ');
        console.log(path);

        map.buildPathOverlay(path);

        var first_move = {row: path[step][1], col: path[step][0]};

        var self = this;

        function moveWolf() {
            var cell_is_empty = map.isCellEmpty(first_move.row, first_move.col);
            if (cell_is_empty) {
                //clear current cell
                map.clearCell(self.row, self.col);
                //place wolf
                map.placeAnyObject(first_move.row, first_move.col, self);
                self.row = first_move.row, self.col = first_move.col;
                Registry.app.render();
            }

            console.log('moving wolf to ' + first_move.row + ', ' + first_move.col);
        }

        setTimeout(moveWolf,500);

        return {row: this.row, col: this.col};//for console viewing
    }

}