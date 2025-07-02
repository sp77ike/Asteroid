class manager extends Phaser.Scene{
    constructor(){
        super({key: 'manager'})
    }

    create(){
        const scenesToControl = ['StartScene', 'Scene1', 'Scene2']; // your scene keys

        window.SDK_GAME_PAUSE = () => {
            scenesToControl.forEach(sceneKey => {
                this.scene.pause(sceneKey);
            });
            this.sound.setMute(true);
            console.log('All scenes paused by SDK');
        };

        window.SDK_GAME_START = () => {
            scenesToControl.forEach(sceneKey => {
                this.scene.resume(sceneKey);
            });
            this.sound.setMute(false);
            console.log('All scenes resumed by SDK');
        }

         window.SDK_OPTIONS = {
            gameId: "your_game_id_here",
            onEvent: (event) => {
                console.log("SDK event:", event.name);
                if (event.name === "SDK_READY") {
                // Show banner ad as soon as SDK is ready
                if (typeof sdk !== 'undefined' && typeof sdk.showBanner === 'function') {
                    sdk.showBanner();
                    console.log("Banner ad shown");
                }
                }
            }
            };

            // Inject the SDK script if not already present
            if (!document.getElementById('gamemonetize-sdk')) {
            const script = document.createElement('script');
            script.id = 'gamemonetize-sdk';
            script.src = 'https://api.gamemonetize.com/sdk.js';
            document.head.appendChild(script);
        }
    }
}