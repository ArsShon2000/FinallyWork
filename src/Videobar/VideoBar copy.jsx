import React, { useState } from "react";
import sample1 from "./multi/video1.mp4"
import sample2 from "./multi/video2.mp4"
import sample3 from "./multi/video3.mp4"
import sample4 from "./multi/video4.mp4"
import styleVideo from "./VideoBar.module.css"
// import car from "./img_2.jpg"
import VideoBarSingle from './single/VideoBarSingle';
import VideoBarMulti from './multi/VideoBarMulti';
import liveStreaming from '../Icons/live-streaming.png'
import cross from '../Icons/cross.png'
import screenshot from '../Icons/screenshot.png'
import fullScreenButton from '../Icons/expand.png'



const VideoBar = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [editModeCamera1, setEditModeCamera1] = useState(false)
    let [nameCamera1, setNameCamera1] = useState("sample1")
    let [nameCamera2, setNameCamera2] = useState("sample2")
    let [nameCamera3, setNameCamera3] = useState("sample3")
    let [nameCamera4, setNameCamera4] = useState("sample4")



// editer cameras
    const activateEditMode = () => {
        setEditModeCamera1 (true)
    }

    const deActivateEditMode = () => {
        setEditModeCamera1 (false)
    }

    const onNameCamera1Change = (e) => {
        setNameCamera1(e.currentTarget.value)
    }

    const onNameCameraChange = (e) => {
        setNameCamera1(e.currentTarget.value)
    }
// editer cameras






    let streams = []
    for (let i = 0; i < 4; i++) {
        if (i === 0) {
            if (sample1) {
                streams[i] = nameCamera1
            }
        }
        else if (i === 1) {
            if (sample2) {
                streams[i] = nameCamera2
            }
        }
        else if (i === 2) {
            if (sample3) {
                streams[i] = nameCamera3
            }
        }
        else if (i === 3) {
            if (sample4) {
                streams[i] = nameCamera4
            }
        }
    }

   

    return (<div className={streams.length > 1 ? styleVideo.vidMulti : styleVideo.vid}>
        <div className={styleVideo.cameras}>
            <div className={styleVideo.cameraTitle}>Cameras</div>
            <div className={styleVideo.camerasList}>
                {/* Список камер */}
                <div>
                    <img src={liveStreaming} alt="liveStreaming" />
                    { !editModeCamera1 && <span onDoubleClick={activateEditMode}> {streams[0]} </span> } 
                    { editModeCamera1 && <input onChange={onNameCamera1Change} autoFocus={true} onBlur={ deActivateEditMode } value = {nameCamera1} />}
                    <img src={screenshot} alt="cross" />
                    <img className={styleVideo.cross} src={cross} alt="cross" style={{ 'width': '16px', 'padding': '2px' }} />
                </div>
                <div>
                    <img src={liveStreaming} alt="liveStreaming" />
                    { ! editMode && <span onDoubleClick={activateEditMode}> {streams[1]} </span> } 
                    { editMode && <input onChange={onNameCameraChange} autoFocus={true} onBlur={ deActivateEditMode } value = {nameCamera2} />}
                    <img src={screenshot} alt="cross" />
                    <img className={styleVideo.cross} src={cross} alt="cross" style={{ 'width': '16px', 'padding': '2px' }} />
                </div>
                <div>
                    <img src={liveStreaming} alt="liveStreaming" />
                    { ! editMode && <span onDoubleClick={activateEditMode}> {streams[2]} </span> } 
                    { editMode && <input onChange={onNameCameraChange} autoFocus={true} onBlur={ deActivateEditMode } value = {nameCamera3} />}
                    <img src={screenshot} alt="cross" />
                    <img className={styleVideo.cross} src={cross} alt="cross" style={{ 'width': '16px', 'padding': '2px' }} />
                </div>
                <div>
                    <img src={liveStreaming} alt="liveStreaming" />
                    { ! editMode && <span onDoubleClick={activateEditMode}> {streams[3]} </span> } 
                    { editMode && <input onChange={onNameCameraChange} autoFocus={true} onBlur={ deActivateEditMode } value = {nameCamera4} />}
                    <img src={screenshot} alt="cross" />
                    <img className={styleVideo.cross} src={cross} alt="cross" style={{ 'width': '16px', 'padding': '2px' }} />
                </div>
            </div>
        </div>
        {/* поле видео */}
        <div className={styleVideo.videoArea}>{streams.length > 1 
        ? <VideoBarMulti fullScreenButton={fullScreenButton} streams = {streams} />
        : <VideoBarSingle fullScreenButton={fullScreenButton} streams = {streams} />}</div>
    </div>
    )
}

export default VideoBar