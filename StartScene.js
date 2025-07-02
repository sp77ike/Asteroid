class StartScene extends Phaser.Scene{
    constructor(){
        super({key: 'StartScene'})
    }

    preload(){
        this.load.image('space', 'assets/blue.png');
        this.load.image('player', 'assets/playerShip1_orange.png');
        this.load.image('rock', 'assets/meteorBrown_big4.png');

        this.load.audio('click', 'assets/button-click-289742.mp3');
        this.load.audio('menu', 'assets/menu.mp3');
    }

    gameState = {};

    create(){
        console.log('atempting manager start');
        this.scene.launch('manager');

        //Sounds for game
        this.gameState.click = this.sound.add('click');
        this.gameState.menu = this.sound.add('menu');
        if(this.gameState.menu){
            this.gameState.menu.play({loop: true});
        }
        else{
            console.log('menu.mp3 failed to load');
        }
        // adds background to Scene
        this.gameState.space = this.add.image(config.width / 2, config.height / 2, 'space');
        this.gameState.space.setScale(5.7);

        this.gameState.ship = this.add.sprite(config.width / 4, config.height / 2, 'player');
        this.gameState.rock = this.add.sprite(config.width - (config.width / 4), config.height / 2, 'rock');

        this.gameState.moveStuff = this.tweens.add({
            targets: [this.gameState.ship, this.gameState.rock],
            y: config.height / 2 + 5,
            ease: 'Linear',
            repeat: -1,
            yoyo: true
        })

        
        this.gameState.titleText = this.add.text(config.width / 2, 150, 'ASTEROID DODGER', {fontSize: '40px', fill: '#FFFFFF'});
        this.gameState.titleText.setOrigin(0.5, 0.5);

        this.gameState.moveTitle = this.tweens.add({
            targets: this.gameState.titleText,
            y: 145,
            ease: 'Linear',
            repeat: -1,
            yoyo: true
        })

        this.gameState.playButton = this.add.rectangle(config.width / 2, config.height / 2, 300, 70, '0x006994');
        this.gameState.playText = this.add.text(this.gameState.playButton.x, this.gameState.playButton.y,'PLAY', {fontSize: '25px', fill: '#FFFFFF'});
        this.gameState.playText.setOrigin(0.5, 0.5);

        this.gameState.playButton.setInteractive();
        this.gameState.playButton.on('pointerup', () => {
            this.gameState.click.play();
            this.cameras.main.fade(200,0,0,0,false,function(camera, progress){
                if(progress > 0.9){
                    this.gameState.menu.stop();
                    this.scene.stop('StartScene');
                    this.scene.start('Scene1');
                }
            });
            
        })
    }
    update(){
        
    }
}