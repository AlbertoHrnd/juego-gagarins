var loadState = {
	preload: function () {
		var loadingLabel = game.add.text(80,80, "Cargando...", {fontSize: '50px', fill: '#ffffff'});

		game.stage.backgroundColor='#000';

		game.load.image('fondoMenu', 'assets/fondoMenu.png');

      	game.load.image('estrella', 'assets/estrella.png');

     	game.load.image('cohete', 'assets/cohete.png');
     	game.load.image('bala', 'assets/bala.png');  	

	},

	create: function() {
		game.state.start('menu');
	}
};