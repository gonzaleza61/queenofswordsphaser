import { Scene } from "phaser";
import { EventBus } from "../EventBus";

export class TitleScreen extends Scene {
    constructor() {
        super("TitleScreen");
    }

    preload() {
        // this.load.setPath("assets");
        // this.load.image("background", "bg.png");
    }

    create() {
        const { centerX, centerY } = this.cameras.main;

        const titlescreen = this.add
            .image(centerX, centerY, "titleBG")
            .setScale(0.6);
        titlescreen.setOrigin(0.5, 0.5);

        this.add.text(3000, 200, "The Queen of Swords").setOrigin(0.5, 0.5);
        this.add
            .text(centerX, centerY, "Press Enter To Start Game", {
                color: "#fff",
            })
            .setOrigin(0.5, 0.5);

        this.input.keyboard.once("keydown-ENTER", () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.on("camerafadeoutcomplete", () => {
                this.scene.start("Game");
            });
        });

        this.input.once("pointerdown", () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.on("camerafadeoutcomplete", () => {
                this.scene.start("Game");
            });
        });

        EventBus.emit("current-scene-ready", this);
    }

    update() {}
}

