import { Scene } from "phaser";
import { EventBus } from "../EventBus";

export class Game extends Scene {
    constructor() {
        super("Game");
    }

    preload() {
        this.load.setPath("assets");

        this.load.image("qos", "queenofswords.png");
        this.load.image("background", "bg.png");
        this.load.image("ground", "platform.png");
    }

    create() {
        var platforms;
        this.add.image(512, 384, "background");
        this.add.image(40, 550, "qos");

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, "ground").setScale(2).refreshBody();

        platforms.create(600, 400, "ground");
        platforms.create(50, 250, "ground");
        platforms.create(750, 220, "ground");

        EventBus.emit("current-scene-ready", this);
    }
}

