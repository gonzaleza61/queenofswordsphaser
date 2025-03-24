import { GameObjects } from "phaser";

class Scorpio extends GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "ScorpioIdle");
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this); // Ensure physics is added
        this.body.setCollideWorldBounds(true);
        this.body.setBounce(0);
        this.setScale(1.2);
    }
}

export default Scorpio;

