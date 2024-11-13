import { Game as MainGame } from "./scenes/Game";
import { TitleScreen } from "./scenes/TitleScreen";
import { LoadingScreen } from "./scenes/LoadingScreen";
import { AUTO, Game } from "phaser";
import Phaser from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: AUTO,
    width: 1000,
    height: 600,
    transparent: "true",
    parent: "game-container",
    backgroundColor: "#000000",
    input: {
        activePointers: 3,
    },
    scene: [LoadingScreen, TitleScreen, MainGame],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 350 },
            debug: true,
        },
    },
    scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
};

const StartGame = (parent) => {
    return new Game({ ...config, parent });
};

export default StartGame;

