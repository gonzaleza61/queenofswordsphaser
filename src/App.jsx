import { useRef } from "react";

import { PhaserGame } from "./game/PhaserGame";

function App() {
    //  References to the PhaserGame component (game and scene are exposed)

    //test windows push joe
    const phaserRef = useRef();

    return (
        <div id="app">
            <h1>QoS</h1>
            <PhaserGame ref={phaserRef} />
        </div>
    );
}

export default App;

