import { GameObjects } from "phaser";

class Scorpio extends GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "ScorpioIdle");
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this); // Ensure physics is added
        this.body.setCollideWorldBounds(true);
        this.body.setBounce(0);
        this.body.setVelocityX(-100);
        this.body.setSize(30, 25);
        this.body.setOffset(16, 24);
        this.scene.physics.add.collider(this, this.scene.platformBlocks);
    }
}

export default Scorpio;

