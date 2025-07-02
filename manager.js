class manager extends Phaser.Scene {
  constructor() {
    super({ key: 'manager' });
  }

  create() {
    console.log('manager scene started');
    this.scene.start('StartScene');

    // const scenesToControl = ['StartScene', 'Scene1', 'Scene2'];

    // window.SDK_GAME_PAUSE = () => {
    //   console.log('🛑 SDK_GAME_PAUSE triggered');
    //   scenesToControl.forEach(sceneKey => {
    //     if (this.scene.isActive(sceneKey)) {
    //       this.scene.pause(sceneKey);
    //       console.log(`Paused: ${sceneKey}`);
    //     }
    //   });
    //   this.sound.setMute(true);
    // };

    // window.SDK_GAME_START = () => {
    //   console.log('▶️ SDK_GAME_START triggered');
    //   scenesToControl.forEach(sceneKey => {
    //     if (this.scene.isPaused(sceneKey)) {
    //       this.scene.resume(sceneKey);
    //       console.log(`Resumed: ${sceneKey}`);
    //     }
    //   });
    //   this.sound.setMute(false);
    // };
  }
}
