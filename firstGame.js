const config = {
     width: 1450,
     height: 780,
     type: Phaser.AUTO,
     backgroundColor: 0x000000,

     physics:{
          default: 'arcade',
          arcade:{
               gravity: {y: 0},
               enableBody: true
          }
     },

     scene: [
          StartScene,
          Scene1,
          Scene2,
     ]
}

var game = new Phaser.Game(config);