import React from "react";

const Progress = (props) => {
    return(
        <div>
            <input type="range"
                value={props.playedSeconds}
                min="0"
                max= {props.loadedSecond}
                step="1"
                // onChange={handleProgressTrack}
                />
        </div>
    )

}

export default Progress