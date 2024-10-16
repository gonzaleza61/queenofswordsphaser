import { Scene } from "phaser";
import { EventBus } from "../EventBus";
import Player from "../player/Player";

export class Game extends Scene {
    constructor() {
        super("Game");
    }

    preload() {
        // this.load.setPath("assets");
        // this.load.image("qos", "queenofswords.png");
        // // this.load.image("background", "bg.png");
        // this.load.image("ground", "platform.png");
        // this.load.image("left", "leftcontrol.png");
        // this.load.image("right", "rightcontrol.png");
        // this.load.image("jump", "jumpcontrol.png");
    }

    create() {
        var platforms;

        this.add.image(512, 384, "background");

        platforms = this.physics.add.staticGroup();
        this.player = new Player(this, 50, 100);
        this.physics.add.collider(this.player, platforms);

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("KnightIdle", {
                frames: [0, 1, 2, 3],
            }),
            frameRate: 8,
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

        platforms.create(400, 568, "ground").setScale(3).refreshBody();

        platforms.create(600, 400, "ground");
        platforms.create(50, 250, "ground");
        platforms.create(750, 220, "ground");

        this.leftControl = this.add
            .image(70, 500, "left")
            .setScale(1.5)
            .setInteractive()
            .setAlpha(0.8)
            .setScrollFactor(0);

        this.rightControl = this.add
            .image(200, 500, "right")
            .setScale(1.5)
            .setInteractive()
            .setAlpha(0.8)
            .setScrollFactor(0);
        this.jumpControl = this.add
            .image(700, 500, "jump")
            .setScale(1.5)
            .setInteractive()
            .setAlpha(0.8)
            .setScrollFactor(0);

        this.isLeftPressed = false;
        this.isRightPressed = false;
        this.isJumpPressed = false;

        this.cameras.main.fadeIn(1000, 0, 0, 0);
        // this.cameras.main.setBounds(800, 600);
        this.cameras.main.startFollow(this.player);

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

