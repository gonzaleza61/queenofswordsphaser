import MobileButton from "./MobileUIButton";

class MobileUILayout {
    constructor(scene) {
        this.restartControl = new MobileButton(
            this,
            920,
            50,
            "restart",
            1,
            0.8
        );
        this.leftControl = new MobileButton(this, 80, 460, "left", 1.3, 0.8);
        this.rightControl = new MobileButton(this, 200, 460, "right", 1.3, 0.8);
        this.jumpControl = new MobileButton(this, 800, 460, "jump", 1.3, 0.8);
        this.attackControl = new MobileButton(
            this,
            920,
            460,
            "attack",
            1.3,
            0.8
        );
        this.leftDash = new MobileButton(this, 80, 365, "leftDash", 1, 0.8);
        this.rightDash = new MobileButton(this, 200, 365, "rightDash", 1, 0.8);
        this.musicOn = new MobileButton(this, 860, 50, "musicOn", 1, 0.8);
        this.musicOff = new MobileButton(this, 860, 50, "musicOff", 0, 0.8);
    }
}

export default MobileUILayout;

