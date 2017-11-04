namespace Advergame {
    export class Reward extends Phaser.Sprite {
        constructor(game: Phaser.Game){
            super(game, 0, 0, "Reward");

            // Habilitar física
            game.physics.arcade.enable(this, false);
            let body = <Phaser.Physics.Arcade.Body>this.body;
            
            body.immovable = true;
            body.allowGravity = false;
        }
    }
}