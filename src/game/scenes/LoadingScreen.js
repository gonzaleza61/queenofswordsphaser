import { Scene } from "phaser";
import { EventBus } from "../EventBus";

export class LoadingScreen extends Scene {
    constructor() {
        super("LoadingScreen");
    }

    preload() {
        let loadingText = this.add
            .text(400, 300, "Loading...", { fontSize: "32px", fill: "#fff" })
            .setOrigin(0.5, 0.5);
        this.load.setPath("assets");
        this.load.spritesheet([
            {
                key: "KnightIdle",
                url: "Knight_player/Idle_KG_1.png",
                frameConfig: {
                    frameWidth: 100,
                    frameHeight: 64,
                },
            },
            {
                key: "KnightWalk",
                url: "Knight_player/Walking_KG_1.png",
                frameConfig: { frameWidth: 100, frameHeight: 64 },
            },
            {
                key: "KnightJump",
                url: "Knight_player/Jump_KG_1.png",
                frameConfig: { frameWidth: 100, frameHeight: 64 },
            },
        ]);
        this.load.image("qos", "queenofswords.png");
        this.load.image("background", "bg.png");
        this.load.image("ground", "platform.png");
        this.load.image("left", "leftcontrol.png");
        this.load.image("right", "rightcontrol.png");
        this.load.image("jump", "jumpcontrol.png");
        this.load.image("titleBG", "backgroundtest.jpg");
        this.load.image("titlePanel", "titlepanel.png");

        this.load.on("progress", (value) => {
            loadingText.setText(`Loading... ${parseInt(value * 100)}%`);
        });

        // When loading is complete
        this.load.on("complete", () => {
            this.scene.start("TitleScreen");
        });
    }

    create() {
        EventBus.emit("current-scene-ready", this);
    }
}

