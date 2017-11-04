namespace Advergame {
    export class Play extends Phaser.State {

        // brand
        private logo: Phaser.Sprite;

        // player
        private _player: Player;
        private _jumpTimer: number = 0;

        // plataformas
        private _platforms: Phaser.Group;

        // rewards
        private _rewards: Phaser.Group;
        
        // status
        private _gameOver: boolean = false;

        // input
        private _jumpKey: Phaser.Key;
        private _justDown: boolean = false;
        private _justUp: boolean = false;

        // -------------------------------------------------------------------------
        public render() {
            // Main layer render
            if(this._gameOver){
                this.game.debug.text("Game Over", 32, 32);
            } else {
                this.game.debug.text("Hello", 32, 32);
            }
            this.game.debug.inputInfo(32, 64);
        }
        
        // -------------------------------------------------------------------------
        public create() {
            console.log('Hello!');

            // logo
            this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'Logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.logo.scale.setTo(0.2, 0.2);
            this.game.add.tween(this.logo.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);

            // camara
            this.camera.bounds = null;

            // física
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.physics.arcade.gravity.y = 2400;

            // player
            this._player = new Player(this.game);
            this._player.position.set(96, 64 * 1);
            this.world.add(this._player);

            // plataformas
            let _platform = new Platform(this.game);
            _platform.position.set(10, 300);
            _platform.scale.setTo(10, 1);

            let _platform2 = new Platform(this.game);
            _platform2.position.set(300, this.game.height-100);
            _platform2.scale.setTo(30, 1);

            // crear un grupo de plataformas
            this._platforms = this.game.add.physicsGroup();
            this._platforms.add(_platform);
            this._platforms.add(_platform2);
            
            // agregar plataformas al mundo
            this.world.add(this._platforms);
            const platformsAnim = this.game.add.tween(this._platforms).to({ y:-50 }, 2000, "Linear", true, 0, -1, true);

            // recompensas
            let recompensa = new Reward(this.game);
            recompensa.position.set(750, 450);

            this._rewards = this.game.add.physicsGroup();
            this._rewards.add(recompensa);
            this.game.world.add(this._rewards);


            // Flasheando con gráficos 

            // Add a graphics object to our game
            var graphics = this.game.add.graphics(0, 0);
        
            // Create an array to hold the points that make up our triangle
            var points: Phaser.Point[] = [];
            // Add 4 Point objects to it
            points.push(new Phaser.Point());
            points.push(new Phaser.Point());
            points.push(new Phaser.Point());
    
            // Position one top left, top right and botto mmiddle
            points[0].x = this.game.width;
            points[0].y = 0;
    
            points[1].x = this.game.width*2;
            points[1].y = 0;
    
            points[2].x = this.game.width*1.5;
            points[2].y = this.game.height;
    
            // set fill color to red in HEX form.  The following is equal to 256 red, 0 green and 0 blue.  
            // Do at 50 % alpha, meaning half transparent
            graphics.beginFill(0x00CCFF, 0.5);
            
            // Finally draw the triangle, false indicates not to cull ( remove unseen values )
            graphics.drawTriangle(points, false);
    
            // Draw circle about screen's center, with 200 pixels radius
            //graphics.beginFill(0x00ff00, 1.0);
            //graphics.drawCircle(this.game.width / 2, this.game.height / 2, 200);
            

            // -> inputs

            // key
            this._jumpKey = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

            // mouse
            this.game.input.onDown.add(function () {
                this._justDown = true;
            }, this);
            this.game.input.onUp.add(function () {
                this._justUp = true;
            }, this);
        }

        // -------------------------------------------------------------------------
        public update() {
            if(!this._gameOver) {
                this.updatePhysics();

                // mover camera
                this.camera.x = this._player.x - 96;

                // check if player is still on screen
                if (this._player.y > this.game.height) {
                    console.log("GAME OVER");
                    this._gameOver = true;
                }
            }
        }

        // -------------------------------------------------------------------------
        private collectReward(player, reward) {
            // eliminar el reward de la pantalla
            reward.kill();
        }

        // -------------------------------------------------------------------------
        private updatePhysics() {
            let body = <Phaser.Physics.Arcade.Body>this._player.body;

            // colisiones
            let platformCollision = this.physics.arcade.collide(this._player, this._platforms);

            // overlaps
            let rewardOverlap = this.game.physics.arcade.overlap(this._player, this._rewards, this.collectReward, null, this);

            // set body velocity
            body.velocity.x = 100;

            // read keyboard
            if (this._jumpKey.justDown) {
                this._justDown = true;
            }
            if (this._jumpKey.justUp) {
                this._justUp = true;
            }

            // start jump
            if (this._justDown && body.touching.down && this.game.time.now > this._jumpTimer) {
                body.velocity.y = -1000;
                this._jumpTimer = this.game.time.now + 150;
                this._justDown = false;
            }

            // if down pressed, but player is going up, then clear it
            if (body.velocity.y <= 0) {
                this._justDown = false;
            }

            // if key is released then clear down press
            if (this._justUp) {
                this._justDown = false;
            }

            // just up was processed - clear it
            this._justUp = false;
        }
    }
}