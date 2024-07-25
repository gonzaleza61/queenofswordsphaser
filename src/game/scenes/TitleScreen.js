import { Scene } from "phaser";
import { EventBus } from "../EventBus";

export class TitleScreen extends Scene {
    constructor() {
        super("TitleScreen");
    }

    preload() {}

    create() {
        this.add.text(10, 10, "Title Screen");
        this.add.text(100, 100, "Press Enter To Start Game");

        this.input.keyboard.on("keydown", (e) => {
            this.scene.start("Game");
        });

        EventBus.emit("current-scene-ready", this);
    }

    update() {}
}

