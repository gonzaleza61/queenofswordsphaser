import { Scene } from "phaser";
import { EventBus } from "../EventBus";
import Player from "../player/Player";

export class Game extends Scene {
    constructor() {
        super("Game");
    }

    preload() {}

    create() {
        var platforms;

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

        platforms = this.physics.add.staticGroup();
        this.player = new Player(this, 500, 490);
        this.physics.add.collider(this.player, platforms);

        this.player.body.setSize(32, 64);

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
            repeat: -1,
        });
        this.player.play("idle", true);

        platforms.create(400, 568, "ground");
        platforms.create(600, 568, "ground");
        platforms.create(800, 568, "ground");
        platforms.create(900, 568, "ground");
        platforms.create(1200, 568, "ground");

        this.leftControl = this.add
            .image(2600, 500, "left")
            .setScale(1.5)
            .setInteractive()
            .setAlpha(0.8)
            .setScrollFactor(0);

        this.rightControl = this.add
            .image(2750, 500, "right")
            .setScale(1.5)
            .setInteractive()
            .setAlpha(0.8)
            .setScrollFactor(0);
        this.jumpControl = this.add
            .image(3400, 500, "jump")
            .setScale(1.5)
            .setInteractive()
            .setAlpha(0.8)
            .setScrollFactor(0);

        this.isLeftPressed = false;
        this.isRightPressed = false;
        this.isJumpPressed = false;

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

        if (this.player) {
            const cursors = this.input.keyboard.createCursorKeys();
            const WASD = this.input.keyboard.addKeys("W, A, S, D, SPACE");
            if (cursors.left.isDown || WASD.A.isDown || this.isLeftPressed) {
                this.player.body.setVelocityX(-160);
                this.mountainOne.tilePositionX -= 0.1;
                this.clouds.tilePositionX -= 0.15;
                this.mountainTwo.tilePositionX -= 0.2;
                this.desertOne.tilePositionX -= 0.6;
                this.desertTwo.tilePositionX -= 0.8;
                this.desertThree.tilePositionX -= 1;
                this.player.setFlipX(true);
                if (this.player.body.touching.down) {
                    this.player.play("walk", true);
                }
            } else if (
                cursors.right.isDown ||
                WASD.D.isDown ||
                this.isRightPressed
            ) {
                this.player.body.setVelocityX(160);

                this.mountainOne.tilePositionX += 0.1;
                this.clouds.tilePositionX += 0.15;
                this.mountainTwo.tilePositionX += 0.2;
                this.desertOne.tilePositionX += 0.6;
                this.desertTwo.tilePositionX += 0.8;
                this.desertThree.tilePositionX += 1;

                this.player.setFlipX(false);
                if (this.player.body.touching.down) {
                    this.player.play("walk", true);
                }
            } else {
                this.player.body.setVelocityX(0);
                if (this.player.body.touching.down) {
                    this.player.play("idle", true);
                }
            }

            if (
                (cursors.up.isDown && this.player.body.touching.down) ||
                (WASD.SPACE.isDown && this.player.body.touching.down) ||
                (this.isJumpPressed && this.player.body.touching.down)
            ) {
                this.player.body.setVelocityY(-330);
                this.player.play("jump");
            }
        }
    }
}

