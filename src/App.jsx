import { useRef } from "react";

import Phaser from "phaser";
import { PhaserGame } from "./game/PhaserGame";

function App() {
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef();

    const addSprite = () => {
        const scene = phaserRef.current.scene;

        if (scene) {
            // Add a new sprite to the current scene at a random position
            const x = Phaser.Math.Between(64, scene.scale.width - 64);
            const y = Phaser.Math.Between(64, scene.scale.height - 64);

            //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
            scene.add.sprite(x, y, "qos");
        }
    };

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} />
            <div>
                <div>
                    <button className="button" onClick={addSprite}>
                        Add New Sprite
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;

