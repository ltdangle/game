
var settings = {
    rows: ko.observable(20).extend({ numeric: 0 }),
    columns: ko.observable(7).extend({ numeric: 0 }),
    turns: ko.observable(5).extend({ numeric: 0 }),
    turn_seconds: ko.observable(2).extend({ numeric: 0 }),
    bushes_number: ko.observable(8).extend({ numeric: 0 }),
    bushes_ttl: ko.observable(2).extend({ numeric: 0 }),
    trees_number: ko.observable(8).extend({ numeric: 0 }),
    trees_ttl: ko.observable(3).extend({ numeric: 0 }),
    wolf_step: ko.observable(1).extend({ numeric: 0 }),
    hare_step: ko.observable(1).extend({ numeric: 0 })
};

ko.applyBindings(settings, document.getElementById('game-inputs'));


var game = app(document.getElementById('game-container'));

var game_inputs = document.getElementById('game-inputs');

game_inputs.addEventListener('click', function (e) {
    if (e.target.id == 'start-game') {
        //build map
        game.buildMap(settings.rows(), settings.columns());

        //populate map
        game.plantObstacles(settings.trees_number(), 'tree');
        game.plantObstacles(settings.bushes_number(), 'bush');

        //set bushes time to live
        game.bushes_tick_counter = 0;
        game.bushes_ttl = settings.bushes_ttl();

        //set trees time to live
        game.trees_tick_counter = 0;
        game.trees_ttl = settings.trees_ttl();

        //place the hare
        game.placeHare();

        //place the hare
        game.placeWolf();

        //render map
        game.render();

        var ticks_count = 0;

        function play() {

            //check if wolf caught hare
            if (game.isGameOver()) {
                alert('Game over!');
                clearTimeout(hare_timeout);
                clearTimeout(wolf_timeout);
                clearInterval(game.tick);
                return;
            }
            ;

            //cycle bushes
            if (game.bushes_ttl == game.bushes_tick_counter) {
                game.removeObstacles('bush');
                game.plantObstacles(settings.bushes_number(), 'bush');
                game.bushes_tick_counter = 0;
                game.render();
            }

            //cycle trees
            if (game.trees_ttl == game.trees_tick_counter) {
                game.removeObstacles('tree');
                game.plantObstacles(settings.trees_number(), 'tree');
                game.trees_tick_counter = 0;
                game.render();
            }

            //if all steps are used - end game
            if (ticks_count == settings.turns()) {
                clearInterval(game.tick);
                alert('No more turns. Game over!');
            }

            //move hare
            function move_hare() {
                game.hare.move(settings.hare_step());
                game.render();
            }

            var hare_timeout = setTimeout(move_hare, 500);

            //move wolf
            function move_wolf() {
                game.wolf.move(settings.wolf_step());
                game.render();
            }

            var wolf_timeout = setTimeout(move_wolf, 1000);

            ticks_count++;
            game.bushes_tick_counter++;
            game.trees_tick_counter++;


        }

        game.tick = setInterval(play, settings.turn_seconds() * 1000);
    }
    else if (e.target.id == 'stop-game') {
        clearInterval(game.tick);
    }
    else if (e.target.id == 'pause-game') {
        alert('Продолжить игру? ');
    }


});