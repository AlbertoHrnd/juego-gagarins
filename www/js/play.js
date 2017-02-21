var playState={
  create: function(){

    velocidad=0;    
    puntuacion=0;
    bulletTime=0;
    stars = [];


    this.vigilaSensores();

    //game.add.image(0, 0, 'bg');

    this.escribeTextos(); 

    // Generar estrellas
    star = game.make.sprite(0, 0, 'estrella');

    console.log(ancho+":::::"+alto);

    texture1 = game.add.renderTexture(ancho, alto, 'texture1');
    texture2 = game.add.renderTexture(ancho, alto, 'texture2');
    texture3 = game.add.renderTexture(ancho, alto, 'texture3');
    game.add.sprite(0, 0, texture1);
    game.add.sprite(0, 0, texture2);
    game.add.sprite(0, 0, texture3);

    t = texture1;
    s = 2;

    //  50 sprites per layer
    for (var i = 0; i < 150; i++)
    {
        if (i == 50)
        {
            //  With each 50 stars we ramp up the speed a little and swap to the next texture
            s = 4;
            t = texture2;
        }
        else if (i == 100)
        {
            s = 5;
            t = texture3;
        }

        stars.push( { x: game.world.randomX, y: game.world.randomY, speed: s, texture: t });
    }


    // Balas
    bullets = game.add.physicsGroup();
    bullets.createMultiple(32, 'bala', false);
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true); 
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
      

    player = game.add.sprite(this.inicioX(), alto-60, 'cohete');

    game.physics.arcade.enable(player);

    player.body.collideWorldBounds = true;

    game.input.onDown.add(this.fireBullet, this);
  },

  update: function() {
    player.body.velocity.x = velocidad * 350;

    // Actualiza estrellas
    for (var i = 0; i < 150; i++)
    {
        //  Update the stars y position based on its speed
        stars[i].y += stars[i].speed;

        if (stars[i].y > alto)
        {
            //  Off the bottom of the screen? Then wrap around to the top
            stars[i].x = game.world.randomX;
            stars[i].y = -32;
        }

        if (i == 0 || i == 50 || i == 100)
        {
            //  If it's the first star of the layer then we clear the texture
            stars[i].texture.renderXY(star, stars[i].x, stars[i].y, true);
        }
        else
        {
            //  Otherwise just draw the star sprite where we need it
            stars[i].texture.renderXY(star, stars[i].x, stars[i].y, false);
        }
    }
  },

  fireBullet: function() {
    if (game.time.time > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(player.x + 17, player.y);
            bullet.body.velocity.y = -400;
            bullet.body.angularVelocity=200;
            bulletTime = game.time.time + 100;
        }
    }
  },

  inicioX: function() {
    return this.numeroAleatorioHasta(ancho-53);
  },

  numeroAleatorioHasta: function(limite) {
    return Math.floor(Math.random() * limite);
  },

  vigilaSensores: function() {

    function onError() {
      console.log('Error!!');
    }

    function onSuccess(datosAceleracion) {
      registraDireccion(datosAceleracion);
    }

    function registraDireccion(datosAceleracion){
      velocidad = datosAceleracion.y;
    }

    navigator.accelerometer.watchAcceleration(onSuccess, onError,{frequency: 10});
  },

  escribeTextos: function() {
    var bar = game.add.graphics();
    bar.beginFill(0xff0000, 0.8);
    bar.drawRect(0, 0, ancho, 40);
    

    lblScoreText = game.add.text(15,4, "PUNTOS", {fontSize:'10px', fill:'#fff'});
    scoreText= game.add.text(15,16, puntuacion, {fontSize:'20px', fill:'#300'});
    
    var estiloAviso = { fontSize: "20px", fill: "#833"};
    avisoText = game.add.text(380, 16, "", estiloAviso);
  }, 
};