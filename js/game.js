var Advergame;
(function (Advergame) {
    var Global = /** @class */ (function () {
        function Global() {
        }
        // game size
        Global.GAME_WIDTH = 1024;
        Global.GAME_HEIGHT = 640;
        return Global;
    }());
    Advergame.Global = Global;
})(Advergame || (Advergame = {}));
window.onload = function () {
    Advergame.Global.game = new Advergame.Game();
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Advergame;
(function (Advergame) {
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = 
            // init game
            _super.call(this, Advergame.Global.GAME_WIDTH, Advergame.Global.GAME_HEIGHT, Phaser.AUTO, "content") || this;
            // states
            _this.state.add("Boot", Advergame.Boot);
            _this.state.add("Preload", Advergame.Preload);
            _this.state.add("Play", Advergame.Play);
            // start
            _this.state.start("Boot");
            return _this;
        }
        return Game;
    }(Phaser.Game));
    Advergame.Game = Game;
})(Advergame || (Advergame = {}));
var Advergame;
(function (Advergame) {
    var Platform = /** @class */ (function (_super) {
        __extends(Platform, _super);
        // -------------------------------------------------------------------------
        function Platform(game) {
            var _this = _super.call(this, game, 0, 0, "Platform") || this;
            // habilitar física
            game.physics.arcade.enable(_this, false);
            var body = _this.body;
            // inamobile
            body.immovable = true;
            body.allowGravity = false;
            return _this;
        }
        return Platform;
    }(Phaser.Sprite));
    Advergame.Platform = Platform;
})(Advergame || (Advergame = {}));
var Advergame;
(function (Advergame) {
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        // -------------------------------------------------------------------------
        function Player(game) {
            var _this = _super.call(this, game, 0, 0, "Player") || this;
            // centrar sprite horizonalmente
            _this.anchor.x = 0.5;
            // habilitar física
            game.physics.arcade.enable(_this, false);
            var body = _this.body;
            // gravedad
            body.allowGravity = true;
            return _this;
            // que no se vaya de la pantalla
            //body.collideWorldBounds = true;
        }
        return Player;
    }(Phaser.Sprite));
    Advergame.Player = Player;
})(Advergame || (Advergame = {}));
var Advergame;
(function (Advergame) {
    var Reward = /** @class */ (function (_super) {
        __extends(Reward, _super);
        function Reward(game) {
            var _this = _super.call(this, game, 0, 0, "Reward") || this;
            // Habilitar física
            game.physics.arcade.enable(_this, false);
            var body = _this.body;
            body.immovable = true;
            body.allowGravity = false;
            return _this;
        }
        return Reward;
    }(Phaser.Sprite));
    Advergame.Reward = Reward;
})(Advergame || (Advergame = {}));
var Advergame;
(function (Advergame) {
    var Boot = /** @class */ (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.create = function () {
            this.game.state.start("Preload");
        };
        return Boot;
    }(Phaser.State));
    Advergame.Boot = Boot;
})(Advergame || (Advergame = {}));
var Advergame;
(function (Advergame) {
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        function Play() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._jumpTimer = 0;
            // status
            _this._gameOver = false;
            _this._justDown = false;
            _this._justUp = false;
            return _this;
        }
        // -------------------------------------------------------------------------
        Play.prototype.render = function () {
            // Main layer render
            if (this._gameOver) {
                this.game.debug.text("Game Over", 32, 32);
            }
            else {
                this.game.debug.text("Hello", 32, 32);
            }
            this.game.debug.inputInfo(32, 64);
        };
        // -------------------------------------------------------------------------
        Play.prototype.create = function () {
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
            this._player = new Advergame.Player(this.game);
            this._player.position.set(96, 64 * 1);
            this.world.add(this._player);
            // plataformas
            var _platform = new Advergame.Platform(this.game);
            _platform.position.set(10, 300);
            _platform.scale.setTo(10, 1);
            var _platform2 = new Advergame.Platform(this.game);
            _platform2.position.set(300, this.game.height - 100);
            _platform2.scale.setTo(30, 1);
            // crear un grupo de plataformas
            this._platforms = this.game.add.physicsGroup();
            this._platforms.add(_platform);
            this._platforms.add(_platform2);
            // agregar plataformas al mundo
            this.world.add(this._platforms);
            var platformsAnim = this.game.add.tween(this._platforms).to({ y: -50 }, 2000, "Linear", true, 0, -1, true);
            // recompensas
            var recompensa = new Advergame.Reward(this.game);
            recompensa.position.set(750, 450);
            this._rewards = this.game.add.physicsGroup();
            this._rewards.add(recompensa);
            this.game.world.add(this._rewards);
            // Flasheando con gráficos 
            // Add a graphics object to our game
            var graphics = this.game.add.graphics(0, 0);
            // Create an array to hold the points that make up our triangle
            var points = [];
            // Add 4 Point objects to it
            points.push(new Phaser.Point());
            points.push(new Phaser.Point());
            points.push(new Phaser.Point());
            // Position one top left, top right and botto mmiddle
            points[0].x = this.game.width;
            points[0].y = 0;
            points[1].x = this.game.width * 2;
            points[1].y = 0;
            points[2].x = this.game.width * 1.5;
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
        };
        // -------------------------------------------------------------------------
        Play.prototype.update = function () {
            if (!this._gameOver) {
                this.updatePhysics();
                // mover camera
                this.camera.x = this._player.x - 96;
                // check if player is still on screen
                if (this._player.y > this.game.height) {
                    console.log("GAME OVER");
                    this._gameOver = true;
                }
            }
        };
        // -------------------------------------------------------------------------
        Play.prototype.collectReward = function (player, reward) {
            // eliminar el reward de la pantalla
            reward.kill();
        };
        // -------------------------------------------------------------------------
        Play.prototype.updatePhysics = function () {
            var body = this._player.body;
            // colisiones
            var platformCollision = this.physics.arcade.collide(this._player, this._platforms);
            // overlaps
            var rewardOverlap = this.game.physics.arcade.overlap(this._player, this._rewards, this.collectReward, null, this);
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
        };
        return Play;
    }(Phaser.State));
    Advergame.Play = Play;
})(Advergame || (Advergame = {}));
var Advergame;
(function (Advergame) {
    var Preload = /** @class */ (function (_super) {
        __extends(Preload, _super);
        function Preload() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // music decoded, ready for game
            _this._ready = false;
            return _this;
        }
        // -------------------------------------------------------------------------
        Preload.prototype.preload = function () {
            // Graphics
            this.load.image("Logo", "assets/graphics/logo.png");
            this.load.image("Player", "assets/graphics/player.png");
            this.load.image("Platform", "assets/graphics/wall.png");
            this.load.image("Reward", "assets/graphics/coin.png");
            // Spritesheets
            //this.load.atlasXML("runner", "assets/graphics/runner.xml");
            // Audio
            //this.load.audio("Song", ["assets/audio/song.mp3", "assets/audio/song.ogg", "assets/audio/song.wav"])
        };
        // -------------------------------------------------------------------------
        Preload.prototype.create = function () {
            // Make it responsive
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        };
        // -------------------------------------------------------------------------
        Preload.prototype.update = function () {
            // run only once
            if (this._ready === false) {
                this._ready = true;
                this.game.state.start("Play");
            }
        };
        return Preload;
    }(Phaser.State));
    Advergame.Preload = Preload;
})(Advergame || (Advergame = {}));
//# sourceMappingURL=game.js.map