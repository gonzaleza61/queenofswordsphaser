import { Scene } from "phaser";
import { EventBus } from "../EventBus";

export class TitleScreen extends Scene {
    constructor() {
        super("TitleScreen");
    }

    preload() {}

    create() {
        const { centerX, centerY } = this.cameras.main;

        console.log(this.cameras);

        this.add.text(400, 20, "The Queen of Swords").setOrigin(0.5, 0.5);
        this.add
            .text(centerX, centerY, "Press Enter To Start Game")
            .setOrigin(0.5, 0.5);

        this.input.keyboard.on("keydown-ENTER", (e) => {
            this.cameras.main.fadeOut(1000, 0, 0, 0, (camera, progress) => {
                if (progress === 1) {
                    this.scene.start("Game");
                }
            });
        });

        EventBus.emit("current-scene-ready", this);
    }

    update() {}
}

