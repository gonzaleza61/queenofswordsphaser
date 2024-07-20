import { GameObjects } from "phaser";

class Player extends GameObjects.Image {
    constructor(scene, x, y) {
        super(scene, x, y, "qos");
        scene.add.existing(this);
        scene.physics.add.existing(this); // Ensure physics is added
        console.log("Player created at:", x, y); // Debug log
    }
}

export default Player;

