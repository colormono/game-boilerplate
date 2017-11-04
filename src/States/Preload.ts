namespace Advergame {
    export class Preload extends Phaser.State {

        // music decoded, ready for game
        private _ready: boolean = false;

        // -------------------------------------------------------------------------
        public preload() {
            // Graphics
            this.load.image("Logo", "assets/graphics/logo.png");
            this.load.image("Player", "assets/graphics/player.png");
            this.load.image("Platform", "assets/graphics/wall.png");
            this.load.image("Reward", "assets/graphics/coin.png");

            // Spritesheets
            //this.load.atlasXML("runner", "assets/graphics/runner.xml");

            // Audio
            //this.load.audio("Song", ["assets/audio/song.mp3", "assets/audio/song.ogg", "assets/audio/song.wav"])
        }

        // -------------------------------------------------------------------------
        public create() {
            // Make it responsive
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        }

        // -------------------------------------------------------------------------
        public update() {
            // run only once
            if (this._ready === false) {
                this._ready = true;

                this.game.state.start("Play");
            }
        }
    }
}
