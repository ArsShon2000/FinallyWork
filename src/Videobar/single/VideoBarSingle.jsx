import React from "react";
import sample1 from "./video1.mp4"
import styleVideo from "./VideoBarSingle.module.css"

const VideoBarSingle = (props) => {

    return (
        <div className={styleVideo.vidSingle}>
            <video className={styleVideo.video} autoPlay loop muted  id="single-video-player">
                <source src={sample1} type='video/mp4' />
            </video>
            <img src={props.fullScreenButton} alt="fullScreenButton" />
            <span>{sample1}</span>
        </div>

    )
}

export default VideoBarSingle