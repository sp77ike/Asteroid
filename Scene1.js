class Scene1 extends Phaser.Scene{
    constructor(){
        super({key: 'Scene1'})
    }

    preload(){
        this.load.image('player', 'assets/playerShip1_orange.png');
        this.load.image('codey', 'assets/meteorBrown_big4.png');
        this.load.image('space', 'assets/blue.png');

        this.load.audio('click', 'assets/button-click-289742.mp3');
        this.load.audio('loading', 'assets/loading.mp3');
        this.load.audio('explosion', 'assets/pixel-explosion-319166.mp3');
    }

    gameState = {
        dead: false,
        playerSpeed: 300
    }

    create(){
        this.gameState.dead = false;

        //Scene sounds
        this.gameState.click = this.sound.add('click');
        this.gameState.expo = this.sound.add('explosion');
        this.gameState.loading = this.sound.add('loading');
        if(this.gameState.loading){
            this.gameState.loading.play({loop: true});
        }
        else{
            console.log('loading.mp3 did not load');
        }
        
        //Scene background
        this.gameState.space = this.add.image(config.width / 2, config.height / 2,'space');
        this.gameState.space.setScale(5.7);
        // adds the player character
        this.gameState.player = this.physics.add.sprite(config.width / 2, config.height / 2, 'player');
        this.gameState.player.setScale(.6);
        this.gameState.cursors = this.input.keyboard.createCursorKeys();

        this.gameState.player.setCollideWorldBounds(true);// allows the player to collide with the screen boarders

        this.gameState.asteroids = this.physics.add.group()

        //adds wasd keys
        this.gameState.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.gameState.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.gameState.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.gameState.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //shows score during playtime
        this.gameState.scoreText = this.add.text(10,10,'Score: ', {fontSize: '20px', fill: '#FFFFFF'})
        this.gameState.scoreText.setOrigin(0,0);

        this.gameState.score = 0;
        this.gameState.spawnDelay = 2000;
        this.gameState.minSpawnDelay = 300;
        this.gameState.spawnIncrease = 50;
        this.lastSpawnTime = 0;

        this.waitTimer = this.time.addEvent({
            delay: 2500,
            callback: function(){
                console.log('waited')
           

                this.spawnTimer = this.time.addEvent({
                    delay: 100, // check every 100 ms
                    callback: () => {
                    const now = this.time.now;

                    if (now - this.lastSpawnTime >= this.gameState.spawnDelay) {
                        this.prepareAsteroid();
                        this.lastSpawnTime = now;
                        this.gameState.score += 1;

                        if (this.gameState.spawnDelay > this.gameState.minSpawnDelay) {
                        this.gameState.spawnDelay = Math.max(this.gameState.spawnDelay - this.gameState.spawnIncrease, this.gameState.minSpawnDelay);
                        }
                    }
                    },
                    callbackScope: this,
                    loop: true
                });

                this.physics.add.collider(this.gameState.asteroids, this.gameState.player, () => {
                    if(this.gameState.dead == false){
                        this.gameState.expo.play();// Plays the sound of explosion
                        this.spawnTimer.remove(false); // remove timer completely on collision
                        this.gameState.dead = true;

                        this.gameState.fire1 = this.add.circle(this.gameState.player.x, this.gameState.player.y, 40, '0xFF0000');
                        this.gameState.fire2 = this.add.circle(this.gameState.player.x, this.gameState.player.y, 20, '0xFFA500');
                    }
                    //shows your final score
                    this.gameState.finalScore = this.add.text(config.width / 2, config.height / 3 - 100, `Final Score: ${this.gameState.score}`,
                        {fontSize: '30px', fill: '#FFFFFF'});
                    this.gameState.finalScore.setOrigin(0.5, 0.5);

                    this.gameState.playButton = this.add.rectangle(config.width / 2, config.height / 3, 300, 70, '0x006994');
                    this.gameState.playText = this.add.text(this.gameState.playButton.x, this.gameState.playButton.y, 'Play Again?', {fontSize: '20px', fill: '#FFFFFF'});
                    this.gameState.playText.setOrigin(0.5, 0.5);

                    this.gameState.creditsButton = this.add.rectangle(config.width / 2, this.gameState.playButton.y + 150, 300, 70, '0x006994');
                    this.gameState.creditText = this.add.text(this.gameState.creditsButton.x, this.gameState.creditsButton.y, 'Credits', {fontSize: '20px', fill: '#FFFFFF'});
                    this.gameState.creditText.setOrigin(0.5, 0.5)

                    this.gameState.playButton.setInteractive();
                    this.gameState.creditsButton.setInteractive();

                    this.gameState.playButton.on('pointerup', () => {
                        this.gameState.click.play();
                        this.cameras.main.fade(200,0,0,0,false,function(camera, progress){
                            if(progress > 0.9){
                                this.gameState.loading.stop();
                                this.gameState.dead = false;
                                this.scene.stop('Scene1');
                                this.scene.start('Scene1');
                            }
                        })
                    })

                    this.gameState.creditsButton.on('pointerup', () => {
                        this.gameState.click.play();
                        this.cameras.main.fade(200,0,0,0,false,function(camera,progress){
                            if(progress > 0.9){
                                this.gameState.loading.stop();
                                this.scene.stop('Scene1');
                                this.scene.start('Scene2');
                            }
                        })
                    })
                });
            },
            callbackScope: this,
            loop: false
        })
    }

    update(){
        
        this.gameState.scoreText.setText(`Score: ${this.gameState.score}`);

        //Controls the X axis movement
        if((this.gameState.aKey.isDown || this.gameState.cursors.left.isDown) && (this.gameState.dKey.isDown || this.gameState.cursors.right.isDown)){
            this.gameState.player.setVelocityX(0);
        }
        else if((this.gameState.aKey.isDown || this.gameState.cursors.left.isDown) && this.gameState.dead == false){
            this.gameState.player.setVelocityX(-1 * this.gameState.playerSpeed);
        }
        else if((this.gameState.dKey.isDown || this.gameState.cursors.right.isDown) && this.gameState.dead == false){
            this.gameState.player.setVelocityX(this.gameState.playerSpeed);
        }
        else{
            this.gameState.player.setVelocityX(0);
        }
        //Controls the Y axis movement
        if((this.gameState.wKey.isDown || this.gameState.cursors.up.isDown) && (this.gameState.sKey.isDown || this.gameState.cursors.down.isDown)){
            this.gameState.player.setVelocityY(0);
        }
        else if((this.gameState.wKey.isDown || this.gameState.cursors.up.isDown) && this.gameState.dead == false){
            this.gameState.player.setVelocityY(-1 * this.gameState.playerSpeed);
        }
        else if((this.gameState.sKey.isDown || this.gameState.cursors.down.isDown) && this.gameState.dead == false){
            this.gameState.player.setVelocityY(this.gameState.playerSpeed);
        }
        else{
            this.gameState.player.setVelocityY(0);
        }
    }

    prepareAsteroid(){
        const width = config.width;
        const height = config.height;

        const speed = 3000;

        const side = Math.floor(Math.random() * 4)

        if(side == 0){
            this.createAsteroid(Math.random() * width, -20, speed);
        }
        else if( side == 1){
            this.createAsteroid(Math.random() * width, height + 20, speed);
        }
        else if(side == 2){
            this.createAsteroid(width + 20, Math.random() * height, speed);
        }
        else if(side == 3){
            this.createAsteroid(-20, Math.random() * height, speed);
        }
    }

createAsteroid(x, y, speed) {
  const rock = this.physics.add.sprite(x, y, 'codey');
  rock.setScale(0.6);
  rock.body.setSize(70,70);
  this.gameState.asteroids.add(rock);

  // Calculate vector from spawn to player
  const dx = this.gameState.player.x - x;
  const dy = this.gameState.player.y - y;

  // Normalize vector to get direction
  const length = Math.sqrt(dx * dx + dy * dy);
  const dirX = dx / length;
  const dirY = dy / length;

  // Calculate a point beyond the player, far off screen
  const offscreenDistance = 1000; // tweak this so it's far enough
  const targetX = this.gameState.player.x + dirX * offscreenDistance;
  const targetY = this.gameState.player.y + dirY * offscreenDistance;

  this.tweens.add({
    targets: rock,
    x: targetX,
    y: targetY,
    ease: 'Linear',
    duration: speed,
    onComplete: () => {
      rock.destroy();
    }
  });
}


}