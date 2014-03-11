//init app -> choose where to render game
var game = app(document.getElementById('game-container'));

//build map
game.buildMap(20, 7);

console.log('Initial map:');
console.log(game.getMap().map);

//populate map
game.plantObstacles(8, 'tree');
game.plantObstacles(8, 'bush');

//place the hare
game.placeHare();

//place the hare
game.placeWolf();

//show the map
console.log('Populated map:');
console.log(game.getMap().map);

//render map
console.log('Render map to screen...');
game.render();

//move hare
function move_hare() {
    game.hare.move();
    game.render();
}

setTimeout(move_hare, 500);

//move wolf
function move_wolf() {
    game.wolf.move();
    game.render();
}

setTimeout(move_wolf, 1000);
