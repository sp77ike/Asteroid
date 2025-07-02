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
          manager,
          StartScene,
          Scene1,
          Scene2,
     ]
}

var game = new Phaser.Game(config);

window.game = game;

window.SDK_GAME_PAUSE = () => {
  console.log('SDK_GAME_PAUSE fired!');
  window.game.sound.setMute(true);
  window.game.scene.pause('StartScene');
  window.game.scene.pause('Scene1');
  window.game.scene.pause('Scene2');
  // Also mute audio if you want
};

window.SDK_GAME_START = () => {
  console.log('SDK_GAME_START fired!');
  window.game.sound.setMute(false);
  window.game.scene.resume('StartScene');
  window.game.scene.resume('Scene1');
  window.game.scene.resume('Scene2');
  // Unmute audio here too
};

//window.SDK_OPTIONS?.onEvent({ name: 'SDK_GAME_PAUSE' });
//game.scene.launch('manager');