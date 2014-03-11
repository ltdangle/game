function map(rows, columns) {
    var rows = rows, columns = columns;//private vars

    var map_array = createMap(rows, columns);

    function createMap(rows, columns) {
        var map_array = [];
        for (var r = 0; r < rows; r++) {
            map_array[r] = [];

            for (var c = 0; c < columns; c++) {
                map_array[r][c] = 0;
            }
        }
        return map_array;
    }


    return{
        map: map_array,
        path_overlay: null,

        getRowsCount: function () {
            return rows;
        },
        getColumnsCount: function () {
            return columns;
        },
        plantObstacle: function (row, col, obstacle) {
            if (this.map[row][col] == 0) {
                this.map[row][col] = obstacle;
                return true;
            }
            return false;
        },
        placeHare: function (row, col, hare) {
            if (this.map[row][col] == 0) {

                this.map[row][col] = hare;

                hare.row = row;
                hare.col = col;

                return true;
            }
            return false;
        },
        placeWolf: function (row, col, wolf) {
            if (this.map[row][col] == 0) {

                this.map[row][col] = wolf;

                wolf.row = row;
                wolf.col = col;
                return true;
            }
            return false;
        },
        placeAnyObject: function (row, col, obj) {
            if (this.isCellEmpty(row, col)) {
                this.map[row][col] = obj;
                return {row: row, col: col};
            }
        },
        isCellEmpty: function (row, col) {
            //check if the move is within bounds
            try {
                this.map[row][col];
            }
            catch (e) {
                console.log(e);
                return false;
            }

            if (this.map[row][col] == 0) {
                return true;
            }
            return false;
        },
        clearCell: function (row, col) {
            this.map[row][col] = 0;
        },
        getMatrix: function () {
            var matrix = [];
            for (var r = 0; r < rows; r++) {
                matrix[r] = [];
                for (var c = 0; c < columns; c++) {
                    if (this.map[r][c] != 0) {
                        matrix[r][c] = 1;
                    } else {
                        matrix[r][c] = 0;
                    }
                }
            }
            return matrix;
        },
        buildPathOverlay: function (path) {

            var map_overlay = createMap(rows, columns);
            for (var point = 0; point < path.length; point++) {
                map_overlay[path[point][1]][path[point][0]] = 'p';
            }
            console.log('Path overlay: ');
            console.log(map_overlay);

            this.path_overlay=map_overlay;
            return map_overlay;
        }
    }
}