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
        this.load.spritesheet("soldier", "soldierspritesheet.png", {
            frameWidth: 32,
            frameHeight: 44,
        });
    }

    create() {
        var platforms;

        this.add.image(512, 384, "background");

        platforms = this.physics.add.staticGroup();
        this.player = new Player(this, 40, 100);
        this.add.image(10, 40, "soldier").setScale(2);
        this.physics.add.collider(this.player, platforms);

        platforms.create(400, 568, "ground").setScale(2).refreshBody();

        platforms.create(600, 400, "ground");
        platforms.create(50, 250, "ground");
        platforms.create(750, 220, "ground");

        EventBus.emit("current-scene-ready", this);
    }

    update() {
        if (this.player) {
            const cursors = this.input.keyboard.createCursorKeys();
            const WASD = this.input.keyboard.addKeys("W, A, S, D, SPACE");
            if (cursors.left.isDown || WASD.A.isDown) {
                this.player.body.setVelocityX(-160);
            } else if (cursors.right.isDown || WASD.D.isDown) {
                this.player.body.setVelocityX(160);
            } else {
                this.player.body.setVelocityX(0);
            }

            if (
                (cursors.up.isDown && this.player.body.touching.down) ||
                (WASD.SPACE.isDown && this.player.body.touching.down)
            ) {
                this.player.body.setVelocityY(-330);
            }
        }
    }
}

