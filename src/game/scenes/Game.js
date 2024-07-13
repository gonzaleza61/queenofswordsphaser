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
    }

    create() {
        this.add.image(512, 384, "background");
        this.add.image(40, 712, "qos");

        EventBus.emit("current-scene-ready", this);
    }
}

