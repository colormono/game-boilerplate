namespace Advergame {
    export class Player extends Phaser.Sprite {

        // -------------------------------------------------------------------------
        public constructor(game: Phaser.Game) {
            super(game, 0, 0, "Player");

            // centrar sprite horizonalmente
            this.anchor.x = 0.5;

            // habilitar física
            game.physics.arcade.enable(this, false);
            let body = <Phaser.Physics.Arcade.Body>this.body;
            
            // gravedad
            body.allowGravity = true;

            // que no se vaya de la pantalla
            //body.collideWorldBounds = true;
        }
    }
}