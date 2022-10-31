import React, { useState } from "react";
import opStyle from "./Options.module.css"
import VideoPlayer from "../Archive/video-player/video-player";
import record1 from "../Videobar/multi/video1.mp4"

const Options = () => {




    let butName = 'Соеденить'

    let [Ip, setIp] = useState('');
    let [Port, setPort] = useState('');

    let onConnect = () => {
        alert('Error 404')
        
    }

    let onTap = () => {
        butName = 'Разъеденить'
    } 

    debugger

    return (
        <form className={opStyle.options}>
            <div>
                <input
                    type="text"
                    value={Ip} onChange={(e) => setIp(e.currentTarget.value)}
                    placeholder={"IP"} />
            </div>
            <div>
                <input
                    type="text"
                    value={Port} onChange={(e) => setPort(e.currentTarget.value)}
                    placeholder={"Port"} />
            </div>
            <button onClick={onConnect} onChange={onTap} >{butName}</button>
            <div className={opStyle.videoStream}>
                <VideoPlayer
                    {...{
                        start: 10,
                        end: 20,
                        currentTime: 0,
                        autoplay: true,
                        loop: true,
                        playerOptions: {
                            controls: true,
                            aspectRatio: "16:9",
                            sources: [
                                {
                                    src:
                                        { record1 },
                                    type: "video/mp4"
                                    // src:
                                    //   {record1},
                                    // type: "application/x-mpegURL"
                                }
                            ]
                        }
                    }}
      />
    </div>
        </form>
        
    )
}

export default Options