import { GameObjects } from "phaser";

class Scorpio extends GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "ScorpioIdle");
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this); // Ensure physics is added
        this.body.setCollideWorldBounds(false);
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

    update() {
        const isMovingRight = this.body.velocity.x > 0;
        const offsetX = isMovingRight ? 32 : -32;

        const checkX = this.x + offsetX;
        const groundY = this.y + this.body.height;
        const wallY = this.y + this.body.height / 2;

        const groundAhead =
            this.scene.platformBlocks.hasTileAtWorldXY(checkX, groundY) ||
            this.scene.rockLayer?.hasTileAtWorldXY(checkX, groundY);

        const wallAhead =
            this.scene.platformBlocks.hasTileAtWorldXY(checkX, wallY) ||
            this.scene.rockLayer?.hasTileAtWorldXY(checkX, wallY);

        if (!groundAhead || wallAhead) {
            this.body.setVelocityX(isMovingRight ? -100 : 100);
            this.setFlipX(!isMovingRight);
        }

        if (
            this.body.blocked.down &&
            this.anims.currentAnim?.key !== "scorpioWalk"
        ) {
            this.play("scorpioWalk", true);
        }
    }
}

export default Scorpio;

