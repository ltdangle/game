var Registry = {map: null, app: null};

function app(el) {
    var container_el = el;

    var app_obj = {
        el: container_el,

        map: null,
        hare: null,
        wolf: null,

        buildMap: function (rows, columns) {
            this.map = map(rows, columns);
            Registry.map = this.map;//global link to map object, dirty hack
        },

        getMap: function () {
            return this.map;
        },

        plantObstacles: function (n, type) {
            var i;

            for (i = 0; i < n; i++) {
                //create obstacle
                if (type == 'tree') {
                    var obstacle = new Tree();
                }
                else if (type == 'bush') {
                    var obstacle = new Bush();
                }
                //plant obstacle randomly on the map
                var planted = false;
                while (!planted) {
                    //calculate random coordinates
                    //http://javascript.ru/Math.random
                    var row = Math.floor(Math.random() * (this.map.getRowsCount() - 1 - 0 + 1)) + 0;
                    var col = Math.floor(Math.random() * (this.map.getColumnsCount() - 1 - 0 + 1)) + 0;

                    //plant the obstacle
                    planted = this.map.plantObstacle(row, col, obstacle);
                }
            }
        },
        removeObstacles: function (type) {
            var map = game.getMap().map;

            for (var r = 0; r < map.length; r++) {
                for (var c = 0; c < map[r].length; c++) {
                    if (type == 'tree') {
                        if (map[r][c] instanceof Tree) {
                            map[r][c] = 0;
                        }
                    } else if (type == 'bush') {
                        if (map[r][c] instanceof Bush) {
                            map[r][c] = 0;
                        }
                    }

                }
            }
        },
        placeHare: function () {
            this.hare = new Hare();
            //plant hare randomly on the map
            var planted = false;
            while (!planted) {
                //calculate random coordinates
                //http://javascript.ru/Math.random
                var row = Math.floor(Math.random() * (this.map.getRowsCount() - 1 - 0 + 1)) + 0;
                var col = Math.floor(Math.random() * (this.map.getColumnsCount() - 1 - 0 + 1)) + 0;

                //plant the obstacle
                planted = this.map.placeHare(row, col, this.hare);
            }
        },

        placeWolf: function () {
            this.wolf = new Wolf();
            //plant hare randomly on the map
            var planted = false;
            while (!planted) {
                //calculate random coordinates
                //http://javascript.ru/Math.random
                var row = Math.floor(Math.random() * (this.map.getRowsCount() - 1 - 0 + 1)) + 0;
                var col = Math.floor(Math.random() * (this.map.getColumnsCount() - 1 - 0 + 1)) + 0;

                //plant the obstacle
                planted = this.map.placeWolf(row, col, this.wolf);
            }
        },

        render: function () {
            var map = game.getMap().map;

            var el = document.createElement('div');


            for (var r = 0; r < map.length; r++) {

                var row = document.createElement('div');

                for (var c = 0; c < map[r].length; c++) {

                    var cell = document.createElement('div');
                    cell.style.display = 'table-cell';
                    cell.style.minWidth = '5em';
                    cell.style.textAlign = 'center';
                    cell.style.border = '1px solid grey';

                    if (game.getMap().path_overlay) {

                        if (game.getMap().path_overlay[r][c] == 'p') {
                            cell.style.backgroundColor = '#cccccc';
                        }
                    }

                    if (map[r][c] == 0) {
                        cell.innerHTML = '&nbsp;';
                    } else if (map[r][c] instanceof Hare) {
                        cell.style.backgroundColor = 'grey    ';
//                        cell.innerHTML = 'Hare';
                    } else if (map[r][c] instanceof Wolf) {
                        cell.style.backgroundColor = 'blue';
//                        cell.innerHTML = 'Wolf';

                    } else if (map[r][c] instanceof Tree) {
                        cell.style.backgroundColor = 'darkgreen';
//                        cell.innerHTML = 'Tree';

                    } else if (map[r][c] instanceof Bush) {
                        cell.style.backgroundColor = 'lightgreen';
//                        cell.innerHTML = 'Bush';

                    }


                    row.appendChild(cell);
                }

                el.appendChild(row);
            }
            this.el.innerHTML = '';
            this.el.appendChild(el);
        },

        isGameOver: function () {
            var row_diff = Math.abs(this.hare.row - this.wolf.row);
            var col_diff = Math.abs(this.hare.col - this.wolf.col);
            console.log('Coordinates diff : ' + row_diff + ', ' + col_diff);
            if (row_diff <= 1 && col_diff <= 1) {
                return true;
            }
            return false;

        }

    }

    Registry.app = app_obj;

    return app_obj;
}