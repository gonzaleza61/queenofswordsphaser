import { GameObjects } from "phaser";

class Player extends GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "qos");
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this); // Ensure physics is added
        this.body.setCollideWorldBounds(true);
        this.body.setBounce(0);
    }
}

export default Player;

