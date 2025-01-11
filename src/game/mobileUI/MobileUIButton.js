import { GameObjects } from "phaser";

class MobileButton extends GameObjects.Image {
    constructor(scene, x, y, url, scale, alpha) {
        super(scene, x, y, url);
        this.scene.add.existing(this);
        this.setInteractive();
        this.setAlpha(alpha);
        this.setScale(scale);
        this.setScrollFactor(0);
    }
}

export default MobileButton;

