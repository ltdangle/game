var game = app(document.getElementById('game-container'));

var game_inputs = document.getElementById('game-inputs');

game_inputs.addEventListener('click', function (e) {
    if (e.target.id == 'start-game') {
        var rows_input = document.getElementById('rows');
        var rows = parseInt(rows_input.value);

        var columns_input = document.getElementById('columns');
        var columns = parseInt(columns_input.value);

        //build map
        game.buildMap(rows, columns);

        var bushes_number_input = document.getElementById('bushes_number');
        var bushes_number = parseInt(bushes_number_input.value);


        var trees_number_input = document.getElementById('trees_number');
        var trees_number = parseInt(trees_number_input.value);

        var bushes_ttl_input = document.getElementById('bushes_ttl');
        var bushes_ttl = parseInt(bushes_ttl_input.value);

        var trees_ttl_input = document.getElementById('trees_ttl');
        var trees_ttl = parseInt(trees_ttl_input.value);

        var hare_step_input=document.getElementById('hare_step');
        var hare_step=parseInt(hare_step_input.value);

        var wolf_step_input=document.getElementById('wolf_step');
        var wolf_step=parseInt(wolf_step_input.value);

        //populate map
        game.plantObstacles(trees_number, 'tree');
        game.plantObstacles(bushes_number, 'bush');

        //set bushes time to live
        game.bushes_tick_counter=0;
        game.bushes_ttl=bushes_ttl;

        //set trees time to live
        game.trees_tick_counter=0;
        game.trees_ttl=trees_ttl;

        //place the hare
        game.placeHare();

        //place the hare
        game.placeWolf();

        //render map
        game.render();

        var turn_seconds_input = document.getElementById('turn_seconds');
        var turn_seconds = parseInt(turn_seconds_input.value);

        var turns_input = document.getElementById('turns');
        var turns = parseInt(turns_input.value);


        var ticks_count = 0;


        function play() {

            //check if wolf caught hare
            if (game.isGameOver()){
                alert('Game over!');
                clearTimeout(hare_timeout);
                clearTimeout(wolf_timeout);
                clearInterval(game.tick);
                return;
            };

            //cycle bushes
            if (game.bushes_ttl==game.bushes_tick_counter){
                game.removeObstacles('bush');
                game.plantObstacles(bushes_number, 'bush');
                game.bushes_tick_counter=0;
                game.render();
            }

            //cycle trees
            if (game.trees_ttl==game.trees_tick_counter){
                game.removeObstacles('tree');
                game.plantObstacles(bushes_number, 'tree');
                game.trees_tick_counter=0;
                game.render();
            }

            //if all steps are used - end game
            if (ticks_count == turns) {
                clearInterval(game.tick);
                alert('No more turns. Game over!');
            }

            //move hare
            function move_hare() {
                game.hare.move(hare_step);
                game.render();
            }

            var hare_timeout=setTimeout(move_hare, 500);

            //move wolf
            function move_wolf() {
                game.wolf.move(wolf_step);
                game.render();
            }

            var wolf_timeout=setTimeout(move_wolf, 1000);

            ticks_count++;
            game.bushes_tick_counter++;
            game.trees_tick_counter++;


        }

        game.tick = setInterval(play, turn_seconds * 1000);
    }
    else if (e.target.id == 'stop-game') {
        clearInterval(game.tick);
    }
    else if (e.target.id == 'pause-game') {
        alert('Продолжить игру? ');
    }


});