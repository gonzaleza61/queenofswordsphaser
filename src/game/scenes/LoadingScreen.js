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

        //Player Sprites
        this.load.spritesheet([
            {
                key: "KnightWall",
                url: "Knight_player/Grab_idle_KG_1.png",
                frameConfig: { frameWidth: 100, frameHeight: 64 },
            },
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
                url: "Knight_player/Attack_KG_4.png",
                frameConfig: { frameWidth: 100, frameHeight: 64 },
            },
            {
                key: "KnightFall",
                url: "Knight_player/Fall_KG_2.png",
                frameConfig: { frameWidth: 100, frameHeight: 64 },
            },
            {
                key: "KnightDash",
                url: "Knight_player/Dashing_KG_1.png",
                frameConfig: { frameWidth: 100, frameHeight: 64 },
            },
        ]);

        //Tilesets
        this.load.tilemapTiledJSON("rockObstacle", "qosmaponeembed.tmj");
        this.load.tilemapTiledJSON("desertblocktile", "qosmaponeembed.tmj");
        this.load.image("dtileset", "deserttile/1 Tiles/Tileset.png");
        this.load.image("StoneTileset", "StoneTileset.png");
        this.load.image("PointerTileset", "PointerTileset.png");
        this.load.image("ElevatorTile", "deserttile/1 Tiles/Tile_31.png");
        this.load.spritesheet(
            "CoinSprite",
            "deserttile/4 Animated objects/Coin.png",
            { frameWidth: 10, frameHeight: 10 }
        );

        //Mobile UI Buttons
        this.load.image("left", "leftcontrol.png");
        this.load.image("right", "rightcontrol.png");
        this.load.image("jump", "jumpcontrol.png");
        this.load.image("attack", "attackcontrol.png");
        this.load.image("rightDash", "rightDashControl.png");
        this.load.image("leftDash", "leftDashControl.png");
        this.load.image("restart", "restartControl.png");
        this.load.image("musicOn", "musicOn.png");
        this.load.image("musicOff", "musicOff.png");

        //Background
        this.load.image("skyBG", "deserttile/BG/Layers/1.png");
        this.load.image("cloudsBG", "deserttile/BG/Layers/2.png");
        this.load.image("mountainOneBG", "deserttile/BG/Layers/3.png");
        this.load.image("mountainTwoBG", "deserttile/BG/Layers/4.png");
        this.load.image("desertOneBG", "deserttile/BG/Layers/5.png");
        this.load.image("desertTwoBG", "deserttile/BG/Layers/6.png");
        this.load.image("desertThreeBG", "deserttile/BG/Layers/7.png");
        this.load.image("titleBG", "backgroundtest.jpg");

        //Font

        //Audio
        this.load.audio("desertLevelMusic", "desertmusic.mp3");
        this.load.audio("coinGrab2", "coinAudio.mp3");

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

