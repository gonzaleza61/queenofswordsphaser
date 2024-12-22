import { useRef } from "react";

import { PhaserGame } from "./game/PhaserGame";

function App() {
    //  References to the PhaserGame component (game and scene are exposed)

    //test windows push
    const phaserRef = useRef();

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} />
        </div>
    );
}

export default App;

