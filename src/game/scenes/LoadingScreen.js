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
                url: "Knight_player/Idle_KG_2.png",
                frameConfig: {
                    frameWidth: 100,
                    frameHeight: 64,
                },
            },
            {
                key: "KnightWalk",
                url: "Knight_player/Walking_KG_2.png",
                frameConfig: { frameWidth: 100, frameHeight: 64 },
            },
            {
                key: "KnightJump",
                url: "Knight_player/Jump_KG_2.png",
                frameConfig: { frameWidth: 100, frameHeight: 64 },
            },
            {
                key: "KnightAttack",
                url: "Knight_player/Attack_KG_3.png",
                frameConfig: { frameWidth: 100, frameHeight: 64 },
            },
        ]);

        this.load.image("dtileset", "deserttile/1 Tiles/Tileset.png");
        console.log("hello");

        this.load.tilemapTiledJSON("desertblocktile", "qosmaponeembed.tmj");
        console.log("here");

        this.load.image("qos", "queenofswords.png");
        this.load.image("background", "bg.png");
        this.load.image("ground", "platform.png");
        this.load.image("left", "leftcontrol.png");
        this.load.image("right", "rightcontrol.png");
        this.load.image("jump", "jumpcontrol.png");
        this.load.image("skyBG", "deserttile/BG/Layers/1.png");
        this.load.image("cloudsBG", "deserttile/BG/Layers/2.png");
        this.load.image("mountainOneBG", "deserttile/BG/Layers/3.png");
        this.load.image("mountainTwoBG", "deserttile/BG/Layers/4.png");
        this.load.image("desertOneBG", "deserttile/BG/Layers/5.png");
        this.load.image("desertTwoBG", "deserttile/BG/Layers/6.png");
        this.load.image("desertThreeBG", "deserttile/BG/Layers/7.png");
        this.load.image("titleBG", "backgroundtest.jpg");
        this.load.image("titlePanel", "titlepanel.png");

        this.load.image("blockStart", "deserttile/1 Tiles/Tile_32.png");
        this.load.image("blockMid", "deserttile/1 Tiles/Tile_33.png");
        this.load.image("blockEnd", "deserttile/1 Tiles/Tile_34.png");

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

