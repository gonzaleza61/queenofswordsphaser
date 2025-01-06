import { Scene } from "phaser";
import Phaser from "phaser";
import { EventBus } from "../EventBus";
import Player from "../player/Player";

export class Game extends Scene {
    constructor() {
        super("Game");
    }

    preload() {}

    create() {
        const worldWidth = 6000;
        const worldHeight = 600;

        // Set world bounds
        this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

        // Set camera bounds to match the game world
        this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

        const { width, height } = this.scale;

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

        const tileset = map.addTilesetImage("dtileset", "dtileset");
        const StoneTileset = map.addTilesetImage(
            "StoneTileset",
            "StoneTileset"
        );

        this.platformBlocks = map.createLayer(
            "desertblocktile",
            "dtileset",
            0,
            280
        );

        this.elevatorBlocks = map.createLayer(
            "elevatorObs1",
            "dtileset",
            0,
            280
        );

        this.elevatorBlocks2 = map.createLayer(
            "elevatorObs2",
            "dtileset",
            0,
            280
        );

        this.rockLayer = map.createLayer(
            "rockObstacle",
            "StoneTileset",
            0,
            280
        );

        this.platformBlocks.setCollisionByProperty({ collides: true });
        this.elevatorBlocks.setCollisionByProperty({ collides: true });
        this.elevatorBlocks2.setCollisionByProperty({ collides: true });
        this.rockLayer.setCollisionByProperty({ collides: true });

        let sfx = this.sound.add("desertLevelMusic");
        sfx.loop = true;
        sfx.play();

        this.player = new Player(this, 100, 500);

        this.player.body.setSize(32, 64);
        this.physics.add.collider(this.player, [
            this.platformBlocks,
            this.elevatorBlocks,
            this.elevatorBlocks2,
            this.rockLayer,
        ]);

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

        this.player.play("idle", true);

        this.restartControl = this.add
            .image(920, 50, "restart")
            .setInteractive()
            .setAlpha(0.8)
            .setScrollFactor(0);

        this.leftControl = this.add
            .image(80, 460, "left")
            .setScale(1.3)
            .setInteractive()
            .setAlpha(0.8)
            .setScrollFactor(0);

        this.rightControl = this.add
            .image(200, 460, "right")
            .setScale(1.3)
            .setInteractive()
            .setAlpha(0.8)
            .setScrollFactor(0);
        this.jumpControl = this.add
            .image(800, 460, "jump")
            .setScale(1.3)
            .setInteractive()
            .setAlpha(0.8)
            .setScrollFactor(0);

        this.attackControl = this.add
            .image(920, 460, "attack")
            .setScale(1.3)
            .setInteractive()
            .setAlpha(0.8)
            .setScrollFactor(0);
        this.leftDash = this.add
            .image(80, 365, "leftDash")
            .setInteractive()
            .setAlpha(0.8)
            .setScrollFactor(0);
        this.rightDash = this.add
            .image(200, 365, "rightDash")
            .setInteractive()
            .setAlpha(0.8)
            .setScrollFactor(0);
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
            sfx.stop();
            console.log("game");
        });

        this.tweens.add({
            targets: this.elevatorBlocks,
            y: 100, // Target position
            duration: 2000, // Time in milliseconds
            yoyo: true, // Reverse after reaching the target
            repeat: -1, // Infinite loop
            ease: "Sine.easeInOut", // Smooth easing
            onUpdate: () => {
                // Refresh the body if using static physics
            },
        });

        this.tweens.add({
            targets: this.elevatorBlocks2,
            y: 440, // Target position
            duration: 2000, // Time in milliseconds
            yoyo: true, // Reverse after reaching the target
            repeat: -1, // Infinite loop
            ease: "Sine.easeInOut", // Smooth easing
            onUpdate: () => {
                // Refresh the body if using static physics
            },
        });

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.cameras.main.startFollow(this.player, true, 1, 0, 0, 200);

        EventBus.emit("current-scene-ready", this);
    }

    update() {
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
        }
    }
}

