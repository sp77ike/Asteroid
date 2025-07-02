class Scene2 extends Phaser.Scene{
    constructor(){
        super({key: 'Scene2'})
    }
    gameState = {};

    preload(){
        this.load.image('space', 'assets/blue.png');

        this.load.audio('click', 'assets/button-click-289742.mp3');
         this.load.audio('menu', 'assets/menu.mp3');
    }

    create(){
        //Sounds for this Scene
        this.gameState.click = this.sound.add('click');
        this.gameState.menu = this.sound.add('menu');
        if(this.gameState.menu){
            this.gameState.menu.play({loop: true});
        }
        else{
            console.log('menu.mp3 failed to load');
        }

        //Space background for Scene2
        this.gameState.space = this.add.image(config.width / 2, config.height / 2,'space');
        this.gameState.space.setScale(5.7);

        //Back button
        this.gameState.backButton = this.add.rectangle(90,40,150,50,'0x006994');
        this.gameState.backText = this.add.text(this.gameState.backButton.x,this.gameState.backButton.y,'BACK',{fontSize: '25px', fill: '#FFFFFF'});
        this.gameState.backText.setOrigin(0.5,0.5);
        this.gameState.backButton.setInteractive();
        this.gameState.backButton.on('pointerup', () => {
            this.gameState.click.play();
            this.cameras.main.fade(200,0,0,0,false,function(camera, progress){
                if(progress > 0.9){
                    this.gameState.menu.stop();
                    this.scene.stop('Scene2');
                    this.scene.start('StartScene');
                }
            })
        })

        this.gameState.titleText = this.add.text(config.width / 2, 150, 'CREDITS', {fontSize: '40px', fill: '#FFFFFF'});
        this.gameState.titleText.setOrigin(0.5, 0.5);

        this.gameState.moveTitle = this.tweens.add({
            targets: this.gameState.titleText,
            y: 145,
            ease: 'Linear',
            repeat: -1,
            yoyo: true
        })

        this.gameState.byText = this.add.text(config.width / 2, config.height / 3, 'By Matthew', {fontSize: '25px', fill: '#FFFFFF'})
        this.gameState.byText.setOrigin(0.5, 0.5);

        this.gameState.musicText = this.add.text(config.width / 2, config.height / 3 + 100, 'Music by Goose Ninja', {fontSize: '25px', fill: '#FFFFFF'})
        this.gameState.musicText.setOrigin(0.5, 0.5);

        this.gameState.thanksTital = this.add.text(config.width / 2, config.height / 3 + 200, 'Special Thanks', {fontSize: '30px', fill: '#FFFFFF'})
        this.gameState.thanksTital.setOrigin(0.5, 0.5);

        this.gameState.thanksText = this.add.text(config.width / 2, config.height / 3 + 250, 'Thomas - for helping me figure out VS-Code',
             {fontSize: '25px', fill: '#FFFFFF'})
        this.gameState.thanksText.setOrigin(0.5, 0.5);

        this.gameState.testText = this.add.text(config.width / 2, config.height / 3 + 300, 'YoungMossTheSauceGod and Thomas - for testing',
             {fontSize: '25px', fill: '#FFFFFF'})
        this.gameState.testText.setOrigin(0.5, 0.5);
    }
    update(){
       
    }

}