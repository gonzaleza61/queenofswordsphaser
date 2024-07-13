import { Game as MainGame } from "./scenes/Game";
import { AUTO, Game } from "phaser";
import Phaser from "phaser";

console.log("joe biden");
//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: "game-container",
    backgroundColor: "#028af8",
    scene: [MainGame],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 350 },
            debug: true,
        },
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
};

const StartGame = (parent) => {
    return new Game({ ...config, parent });
};

export default StartGame;

