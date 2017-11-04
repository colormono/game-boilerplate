namespace Advergame {
    export class Platform extends Phaser.Sprite {
        public _xPosition: number;
        public _yPosition: number;

        // -------------------------------------------------------------------------
        public constructor(game: Phaser.Game) {
            super(game, 0, 0, "Platform");

            // habilitar física
            game.physics.arcade.enable(this, false);
            let body = <Phaser.Physics.Arcade.Body>this.body;

            // inamobile
            body.immovable = true;
            body.allowGravity = false;

        }
    }
}