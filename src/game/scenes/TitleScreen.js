import { Scene } from "phaser";
import { EventBus } from "../EventBus";

export class TitleScreen extends Scene {
    constructor() {
        super("TitleScreen");
    }

    preload() {}

    create() {
        const { centerX, centerY } = this.cameras.main;
        this.add
            .text(centerX, centerY, "Press Enter To Start Game")
            .setOrigin(0.5, 0.5);

        this.input.keyboard.on("keydown-ENTER", (e) => {
            this.scene.start("Game");
        });

        EventBus.emit("current-scene-ready", this);
    }

    update() {}
}

