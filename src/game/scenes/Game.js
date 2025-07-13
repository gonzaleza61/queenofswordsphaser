import { Scene } from "phaser";
import Phaser from "phaser";
import { EventBus } from "../EventBus";
import Player from "../player/Player";
import Scorpio from "../enemies/Scorpio";
import MobileButton from "../mobileUI/MobileUIButton";
import { MobileUIData } from "../data/MobileUIData";
export class Game extends Scene {
    constructor() {
        super("Game");
    }

    preload() {}

    create() {
        const worldWidth = 6016;
        const worldHeight = 608;

        // Set world bounds
        this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

        // Set camera bounds to match the game world
        this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

        const { height } = this.scale;

        const background = this.add.image(0, 0, "skyBG");
        background.setOrigin(0, 0);
        background.setDisplaySize(1000, 600);
        background.setScrollFactor(0);
        this.clouds = this.add
            .tileSprite(0, 0, 500, height, "cloudsBG")
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setScale(2);
        this.mountainOne = this.add
            .tileSprite(0, 0, 500, height, "mountainOneBG")
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setScale(2);
        this.mountainTwo = this.add
            .tileSprite(0, 0, 500, height, "mountainTwoBG")
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setScale(2);
        this.desertOne = this.add
            .tileSprite(0, 0, 500, height, "desertOneBG")
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setScale(2);
        this.desertTwo = this.add
            .tileSprite(0, 0, 500, height, "desertTwoBG")
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setScale(2);
        this.desertThree = this.add
            .tileSprite(0, 0, 500, height, "desertThreeBG")
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setScale(2);

        const map = this.make.tilemap({ key: "desertblocktile" });

        //Tilesets
        const StoneTileset = map.addTilesetImage(
            "StoneTileset",
            "StoneTileset"
        );
        const tileset = map.addTilesetImage("dtileset", "dtileset");

        const PointerTileset = map.addTilesetImage(
            "PointerTileset",
            "PointerTileset"
        );

        //Layers
        this.deathLayer = map.createLayer("DeathLayer", ["dtileset"], 0, 0);

        this.rockLayer = map.createLayer(
            "rockObstacle",
            ["StoneTileset", "dtileset"],
            0,
            0
        );

        this.platformBlocks = map.createLayer(
            "desertblocktile",
            ["dtileset", "PointerTileset"],
            0,
            0
        );

        this.coinLayer = map.getObjectLayer("Coins");

        this.coins = this.physics.add.staticGroup();

        this.anims.create({
            key: "CoinJump",
            frames: this.anims.generateFrameNumbers("CoinSprite", {
                frames: [0, 1, 2, 3],
            }),
            frameRate: 9,
            repeat: -1,
        });

        this.coinLayer.objects.forEach((coinObj) => {
            const coin = this.coins
                .create(coinObj.x, coinObj.y, "CoinSprite")
                .setScale(1.5);

            coin.play("CoinJump");
        });

        this.destructibleBlocks = this.physics.add.staticGroup();
        this.destructibleLayer = map
            .getObjectLayer("DestructiblePlatform")
            .objects.forEach((obj) => {
                const block = this.destructibleBlocks.create(
                    obj.x,
                    obj.y,
                    "ElevatorTile"
                );
            });

        this.platformBlocks.setCollisionByProperty({ collides: true });
        this.rockLayer.setCollisionByProperty({ collides: true });
        this.deathLayer.setCollisionByProperty({ collides: true });

        //Audio
        this.sfx = this.sound.add("desertLevelMusic");
        this.sfx.loop = true;
        this.sfx.play();
        this.coinAudio = this.sound.add("coinGrab2");

        //Sprites
        this.player = new Player(this, 100, 500);

        // this.physics.world.createDebugGraphic();
        // this.platformBlocks.renderDebug(this.add.graphics(), {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(255, 0, 0, 100),
        // });

        //Enemies
        this.scorpioGroup = this.add.group();
        const scorpioPositions = [
            { x: 775, y: 525 },
            { x: 4000, y: 525 },
            { x: 5000, y: 525 },
        ];
        scorpioPositions.forEach((pos) => {
            const scorpio = new Scorpio(this, pos.x, pos.y);
            this.scorpioGroup.add(scorpio);
        });
        // this.scorpios = this.physics.add.group();

        this.player.body.setSize(32, 64);
        this.physics.add.collider(this.player, [
            this.platformBlocks,
            this.rockLayer,
        ]);

        this.physics.add.collider(this.player, this.deathLayer, () => {
            this.scene.start("Game");
            this.sfx.stop();
        });

        this.physics.add.collider(
            this.player,
            this.destructibleBlocks,

            (player, block) => {
                if (!block.hasTweened) {
                    block.hasTweened = true;

                    this.tweens.add({
                        targets: block,
                        alpha: 0.5,
                        duration: 100,
                        yoyo: true,
                        repeat: 6,
                        onComplete: () => {
                            block.hasTweened = false;
                            block.destroy();
                        },
                    });
                }
            }
        );

        this.physics.add.overlap(
            this.player,
            this.coins,
            this.collectCoin,
            null,
            this
        );

        this.score = 0;

        this.scoreboard = this.add
            .text(50, 50, `SCORE: ${this.score}`, {
                color: "#000000",
            })
            .setScrollFactor(0);

        const debugGraphics = this.add.graphics();
        map.renderDebug(debugGraphics, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(242, 234, 48, 1),
            faceColor: new Phaser.Display.Color(85, 85, 85, 1),
        });

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("KnightIdle", {
                frames: [0, 1, 2, 3],
            }),
            frameRate: 4,
            repeat: -1,
        });

        this.anims.create({
            key: "walk",
            frames: this.anims.generateFrameNumbers("KnightWalk", {
                frames: [0, 1, 2, 3, 4, 5, 6],
            }),
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNumbers("KnightJump", {
                frames: [0, 1, 2, 3, 4, 5],
            }),
            frameRate: 3,
            repeat: 0,
        });

        this.anims.create({
            key: "attack",
            frames: this.anims.generateFrameNames("KnightAttack", {
                frames: [0, 1, 2, 3, 4],
            }),
            frameRate: 12,
            repeat: 0,
        });

        this.anims.create({
            key: "falling",
            frames: this.anims.generateFrameNames("KnightFall", {
                frames: [0, 1, 2],
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: "dashing",
            frames: this.anims.generateFrameNames("KnightDash", {
                frames: [0, 1, 2, 3],
            }),
            frameRate: 12,
            repeat: 0,
        });

        this.anims.create({
            key: "wallgrab",
            frames: this.anims.generateFrameNames("KnightWall", {
                frames: [0, 1, 2],
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.player.play("idle", true);
        // this.scorpio.play("scorpioIdle", true);

        for (const [controlName, config] of Object.entries(MobileUIData)) {
            this[controlName] = new MobileButton(
                this,
                config.x,
                config.y,
                config.key,
                config.scale,
                config.alpha
            );
        }

        this.isMusicOff = false;
        this.isLeftPressed = false;
        this.isRightPressed = false;
        this.isJumpPressed = false;
        this.isAttackPressed = false;
        this.isLeftDashPressed = false;
        this.isRightDashPressed = false;
        this.canDash = true;
        this.isDashing = false;

        this.restartControl.on("pointerdown", () => {
            this.scene.start("Game");
            this.sfx.stop();
        });

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.cameras.main.startFollow(this.player, true, 1, 0, 0, 200);

        EventBus.emit("current-scene-ready", this);
    }

    collectCoin(player, coin) {
        coin.destroy();
        this.sound.play("coinGrab2");
        this.score += 1;
        this.scoreboard.setText(`SCORE: ${this.score}`);
    }

    update() {
        if (this.musicOn) {
            this.musicOn.on("pointerdown", () => {
                this.sfx.stop();
                this.musicOn.setAlpha(0);
                this.musicOff.setAlpha(0.8);
                this.isMusicOff = true;
            });

            if (this.isMusicOff) {
                this.musicOff.on("pointerdown", () => {
                    this.sfx.play();
                    this.musicOn.setAlpha(0.8);
                    this.musicOff.setAlpha(0);
                });
            }
        }

        if (this.leftControl) {
            this.leftControl.on("pointerdown", () => {
                this.isLeftPressed = true;
                this.leftControl.setAlpha(0.5);
            });

            this.leftControl.on("pointerup", () => {
                this.isLeftPressed = false;
                this.leftControl.setAlpha(0.8);
            });

            this.leftControl.on("pointerout", () => {
                this.isLeftPressed = false;
                this.leftControl.setAlpha(0.8);
            });
        }

        if (this.rightControl) {
            this.rightControl.on("pointerdown", () => {
                this.isRightPressed = true;
                this.rightControl.setAlpha(0.5);
            });

            this.rightControl.on("pointerup", () => {
                this.isRightPressed = false;
                this.rightControl.setAlpha(0.8);
            });

            this.rightControl.on("pointerout", () => {
                this.isRightPressed = false;
                this.rightControl.setAlpha(0.8);
            });
        }

        if (this.leftDash) {
            this.leftDash.on("pointerdown", () => {
                this.isLeftDashPressed = true;
                this.leftDash.setAlpha(0.5);
            });

            this.leftDash.on("pointerup", () => {
                this.isLeftDashPressed = false;
                this.leftDash.setAlpha(0.8);
            });

            this.leftDash.on("pointerout", () => {
                this.isLeftDashPressed = false;
                this.leftDash.setAlpha(0.8);
            });
        }

        if (this.rightDash) {
            this.rightDash.on("pointerdown", () => {
                this.isRightDashPressed = true;
                this.rightDash.setAlpha(0.5);
            });

            this.rightDash.on("pointerup", () => {
                this.isRightDashPressed = false;
                this.rightDash.setAlpha(0.8);
            });

            this.rightDash.on("pointerout", () => {
                this.isRightDashPressed = false;
                this.rightDash.setAlpha(0.8);
            });
        }

        if (this.jumpControl) {
            this.jumpControl.on("pointerdown", () => {
                this.isJumpPressed = true;
                this.jumpControl.setAlpha(0.5);
            });

            this.jumpControl.on("pointerup", () => {
                this.isJumpPressed = false;
                this.jumpControl.setAlpha(0.8);
            });

            this.jumpControl.on("pointerout", () => {
                this.isJumpPressed = false;
                this.jumpControl.setAlpha(0.8);
            });
        }

        if (this.attackControl) {
            this.attackControl.on("pointerdown", () => {
                this.isAttackPressed = true;
                this.attackControl.setAlpha(0.5);
            });

            this.attackControl.on("pointerup", () => {
                this.isAttackPressed = false;
                this.attackControl.setAlpha(0.8);
            });

            this.attackControl.on("pointerout", () => {
                this.isAttackPressed = false;
                this.attackControl.setAlpha(0.8);
            });
        }

        if (this.player) {
            // console.log(this.player.body.position.x);

            const cursors = this.input.keyboard.createCursorKeys();

            const camera = this.cameras.main;

            this.clouds.tilePositionX = camera.scrollX * 0.004;
            this.mountainOne.tilePositionX = camera.scrollX * 0.007;
            this.mountainTwo.tilePositionX = camera.scrollX * 0.009;
            this.desertOne.tilePositionX = camera.scrollX * 0.02;
            this.desertTwo.tilePositionX = camera.scrollX * 0.04;
            this.desertThree.tilePositionX = camera.scrollX * 0.08;

            const WASD = this.input.keyboard.addKeys(
                "W, A, S, D, L, Q, E, SPACE"
            );

            if (WASD.L.isDown || this.isAttackPressed) {
                if (this.player.anims.currentAnim?.key !== "attack") {
                    this.player.play("attack", true);
                    this.player.body.setVelocityX(0);

                    // Listen for the animation completion event
                    this.player.once("animationcomplete-attack", () => {
                        this.player.play("idle", true);
                    });
                }
            } else if (
                cursors.left.isDown ||
                WASD.A.isDown ||
                this.isLeftPressed
            ) {
                this.player.body.setVelocityX(-160);
                this.player.setFlipX(true);

                if (
                    this.player.body.blocked.down &&
                    this.player.anims.currentAnim?.key !== "walk" &&
                    this.player.anims.currentAnim?.key !== "attack"
                ) {
                    this.player.play("walk", true);
                }
            } else if (
                cursors.right.isDown ||
                WASD.D.isDown ||
                this.isRightPressed
            ) {
                this.player.body.setVelocityX(160);
                this.player.setFlipX(false);

                if (
                    this.player.body.blocked.down &&
                    this.player.anims.currentAnim?.key !== "walk" &&
                    this.player.anims.currentAnim?.key !== "attack"
                ) {
                    this.player.play("walk", true);
                }
            } else if (
                (WASD.Q.isDown || this.isLeftDashPressed) &&
                this.canDash
            ) {
                if (!this.isDashing) {
                    this.player.play("dashing", true);
                    this.isDashing = true;
                }
                this.leftDash.setAlpha(0.2);
                this.rightDash.setAlpha(0.2);

                this.player.setFlipX(true);
                this.player.body.setVelocityX(-400);
                this.dashTimer = this.time.delayedCall(400, () => {
                    this.canDash = false;
                    this.isDashing = false;
                });
                this.coolDownTimer = this.time.delayedCall(1500, () => {
                    this.canDash = true;
                    this.leftDash.setAlpha(0.8);
                    this.rightDash.setAlpha(0.8);
                });

                this.player.once("animationcomplete-dashing", () => {
                    this.player.play("idle", true);
                });
            } else if (
                (WASD.E.isDown || this.isRightDashPressed) &&
                this.canDash
            ) {
                if (!this.isDashing) {
                    this.player.play("dashing", true);
                    this.isDashing = true;
                }
                this.leftDash.setAlpha(0.2);
                this.rightDash.setAlpha(0.2);
                this.player.setFlipX(false);
                this.player.body.setVelocityX(400);
                this.dashTimer = this.time.delayedCall(400, () => {
                    this.canDash = false;
                    this.isDashing = false;
                });
                this.coolDownTimer = this.time.delayedCall(1500, () => {
                    this.canDash = true;
                    this.leftDash.setAlpha(0.8);
                    this.rightDash.setAlpha(0.8);
                });
                this.player.once("animationcomplete-dashing", () => {
                    this.player.play("idle", true);
                });
            } else {
                this.player.body.setVelocityX(0);
                if (
                    this.player.body.blocked.down &&
                    this.player.anims.currentAnim?.key !== "idle" &&
                    this.player.anims.currentAnim?.key !== "attack" &&
                    this.player.anims.currentAnim?.key !== "dashing"
                ) {
                    this.player.play("idle", true);
                }
            }

            if (
                (this.player.body.velocity.y > 0 ||
                    this.player.body.velocity.y < 0) &&
                this.player.anims.currentAnim?.key !== "jump" &&
                this.player.anims.currentAnim?.key !== "attack" &&
                this.player.anims.currentAnim?.key !== "dashing"
            ) {
                this.player.play("falling", true);
            }

            if (
                (cursors.up.isDown && this.player.body.blocked.down) ||
                (WASD.SPACE.isDown && this.player.body.blocked.down) ||
                (this.isJumpPressed && this.player.body.blocked.down)
            ) {
                this.player.body.setVelocityY(-265);
                this.player.play("jump");
            }

            this.scorpioGroup
                .getChildren()
                .forEach((scorpio) => scorpio.update());

            //WallGrab
            // if (
            //     (this.player.body.blocked.right ||
            //         this.player.body.blocked.left) &&
            //     !this.player.body.blocked.down
            // ) {
            //     this.player.play("wallgrab");
            //     if (
            //         WASD.SPACE.isDown ||
            //         this.isJumpPressed ||
            //         cursors.up.isDown
            //     ) {
            //         this.player.body.setVelocityY(-265);
            //         this.player.body.setVelocityX(265);
            //     }
            // }
        }
    }
}

