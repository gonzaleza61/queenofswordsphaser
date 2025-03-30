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

        this.anims.create({
            key: "scorpioIdle",
            frames: this.anims.generateFrameNumbers("ScorpioIdle", {
                frames: [0, 1, 2, 3],
            }),
            frameRate: 4,
            repeat: -1,
        });

        this.anims.create({
            key: "scorpioWalk",
            frames: this.anims.generateFrameNumbers("ScorpioWalk", {
                frames: [0, 1, 2, 3],
            }),
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: "scorpioAttack",
            frames: this.anims.generateFrameNumbers("ScorpioAttack", {
                frames: [0, 1, 2, 3],
            }),
        });

        this.anims.create({
            key: "scorpioDeath",
            frames: this.anims.generateFrameNumbers("ScorpioDeath", {
                frames: [0, 1, 2, 3],
            }),
        });

        this.play("scorpioIdle", true);
    }
}

export default Scorpio;

