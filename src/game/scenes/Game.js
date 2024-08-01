import { Scene } from "phaser";
import { EventBus } from "../EventBus";
import Player from "../player/Player";

export class Game extends Scene {
    constructor() {
        super("Game");
    }

    preload() {
        this.load.setPath("assets");

        this.load.image("qos", "queenofswords.png");
        this.load.image("background", "bg.png");
        this.load.image("ground", "platform.png");
        this.load.image("left", "leftcontrol.png");
        this.load.image("right", "rightcontrol.png");
        this.load.image("jump", "jumpcontrol.png");
        this.load.spritesheet("soldier", "soldierspritesheet.png", {
            frameWidth: 32,
            frameHeight: 44,
        });
    }

    create() {
        var platforms;

        this.add.image(512, 384, "background");
        this.leftControl = this.add
            .image(70, 500, "left")
            .setScale(1.5)
            .setInteractive();
        this.rightControl = this.add
            .image(200, 500, "right")
            .setScale(1.5)
            .setInteractive();
        this.jumpControl = this.add
            .image(700, 500, "jump")
            .setScale(1.5)
            .setInteractive();

        platforms = this.physics.add.staticGroup();
        this.player = new Player(this, 40, 100);
        this.add.image(10, 40, "soldier").setScale(2);
        this.physics.add.collider(this.player, platforms);

        platforms.create(400, 568, "ground").setScale(2).refreshBody();

        platforms.create(600, 400, "ground");
        platforms.create(50, 250, "ground");
        platforms.create(750, 220, "ground");

        this.isLeftPressed = false;
        this.isRightPressed = false;
        this.isJumpPressed = false;

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        EventBus.emit("current-scene-ready", this);
    }

    update() {
        if (this.leftControl) {
            this.leftControl.on("pointerdown", (e) => {
                this.isLeftPressed = true;
                this.leftControl.setAlpha(0.5);
            });

            this.leftControl.on("pointerup", (e) => {
                this.isLeftPressed = false;
                this.leftControl.setAlpha(1);
            });
        }

        if (this.rightControl) {
            this.rightControl.on("pointerdown", (e) => {
                this.isRightPressed = true;
                this.isRightPressed.setAlpha(0.5);
            });

            this.rightControl.on("pointerup", (e) => {
                this.isRightPressed = false;
                this.isRightPressed.setAlpha(1);
            });
        }

        if (this.jumpControl) {
            this.jumpControl.on("pointerdown", (e) => {
                this.isJumpPressed = true;
                this.jumpControl.setAlpha(0.5);
            });

            this.jumpControl.on("pointerup", (e) => {
                this.isJumpPressed = false;
                this.jumpControl.setAlpha(1);
            });
        }

        if (this.player) {
            const cursors = this.input.keyboard.createCursorKeys();
            const WASD = this.input.keyboard.addKeys("W, A, S, D, SPACE");
            if (cursors.left.isDown || WASD.A.isDown || this.isLeftPressed) {
                this.player.body.setVelocityX(-160);
            } else if (
                cursors.right.isDown ||
                WASD.D.isDown ||
                this.isRightPressed
            ) {
                this.player.body.setVelocityX(160);
            } else {
                this.player.body.setVelocityX(0);
            }

            if (
                (cursors.up.isDown && this.player.body.touching.down) ||
                (WASD.SPACE.isDown && this.player.body.touching.down) ||
                (this.isJumpPressed && this.player.body.touching.down)
            ) {
                this.player.body.setVelocityY(-330);
            }
        }
    }
}

