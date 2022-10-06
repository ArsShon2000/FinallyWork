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
import cameraStatusOn from '../Icons/cameraStatusOn.png'
import cameraStatusOff from '../Icons/cameraStatusOff.png'
import screenshot from '../Icons/screenshot.png'
import fullScreenButton from '../Icons/expand.png'
import { useEffect } from "react";
import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:5000',
})


const VideoBar = (props) => {

    //====================== camera ==========================
    let [editModeCamera1, setEditModeCamera1] = useState(false)
    let [nameCamera1, setNameCamera1] = useState("sample1")
    let [editModeCamera2, setEditModeCamera2] = useState(false)
    let [nameCamera2, setNameCamera2] = useState("sample2")
    let [editModeCamera3, setEditModeCamera3] = useState(false)
    let [nameCamera3, setNameCamera3] = useState("sample3")
    let [editModeCamera4, setEditModeCamera4] = useState(false)
    let [nameCamera4, setNameCamera4] = useState("sample4")
    //====================== camera ==========================

    //====================== cameraStream ==========================
    let [editStreamCamera1, setEditStreamCamera1] = useState(sample1)
    let [editStreamCamera2, setEditStreamCamera2] = useState(sample2)
    let [editStreamCamera3, setEditStreamCamera3] = useState(sample3)
    let [editStreamCamera4, setEditStreamCamera4] = useState(sample4)
    //====================== cameraStream ==========================

    //====================== cameraStatus ==========================
    let [editModeCameraStatus1, setEditModeCameraStatus1] = useState(false)
    let [editModeCameraStatus2, setEditModeCameraStatus2] = useState(false)
    let [editModeCameraStatus3, setEditModeCameraStatus3] = useState(false)
    let [editModeCameraStatus4, setEditModeCameraStatus4] = useState(false)
    //====================== cameraStatus ==========================

    let [Cameras, setCameras] = useState([])

    useEffect ( () => {
        instance.get(`/Cameras`).then((res) => {
            setCameras(res.data.videoStreams);
        })
        // window.location.reload()
    }, [])

    console.log(Cameras)

    //====================== cameraStatusEdit ==========================
    // const onCameraStatusEdit1 = () => {
    //     switch (editModeCameraStatus1) {
    //         case false: {
    //             setEditModeCameraStatus1(true)
    //             setNameCamera1("No camera")
    //             setEditStreamCamera1()
    //             break
    //         }
    //         case true: {
    //             setEditModeCameraStatus1(false)
    //             setNameCamera1("sample1")
    //             setEditStreamCamera1(sample1)
    //             break
    //         }

    //     }

    // }
    //====================== cameraStatusEdit ==========================

    //====================== cam Edit ==========================
debugger
    let onCameraStatusEdit1 = (id_name) => {
        console.log(id_name)
        switch (Cameras[id_name - 1].editMode) {
            case "false": {
                instance.put(`/Cameras/id/${id_name}`, {
                    edit_stream: "",
                    edit_mode: "true"
                })
                break
            }
            case "true": {
                instance.put(`/Cameras/id/${id_name}`, {
                    edit_stream: "/static/media/video1.cff2ae39.mp4",
                    edit_mode: "false"
                })
                break
            }
        }
    window.location.reload()
    }

    //====================== распределение камер в массив ==========================

    //====================== распределение ==========================


    //================ Name editer of cameras ==========================
    //====================== camera1 ======================== 
    const activateEditModeCamera = () => {
        setEditModeCamera1(true)  //едит мод вкл
    }
    
    const deActivateEditModeCamera = () => {
        setEditModeCamera1(false)   //едит мод выкл
    }
    const onNameCamera1Change = (e) => {
        setNameCamera1(e.currentTarget.value)       //едит называение камеры
    }
    //  ======================== camera2 ======================== 
    const activateEditModeCamera2 = () => {
        setEditModeCamera2(true)    //едит мод вкл
    }
    const deActivateEditModeCamera2 = () => {
        setEditModeCamera2(false)   //едит мод выкл
    }
    const onNameCamera2Change = (e) => {
        setNameCamera2(e.currentTarget.value)       //едит называение камеры
    }
    //  ======================== camera3 ======================== 
    const activateEditModeCamera3 = () => {
        setEditModeCamera3(true)    //едит мод вкл
    }
    const deActivateEditModeCamera3 = () => {
        setEditModeCamera3(false)   //едит мод выкл
    }
    const onNameCamera3Change = (e) => {
        setNameCamera3(e.currentTarget.value)       //едит называение камеры
    }
    //  ======================== camera4 ======================== 
    const activateEditModeCamera4 = () => {
        setEditModeCamera4(true)    //едит мод вкл
    }
    const deActivateEditModeCamera4 = () => {
        setEditModeCamera4(false)   //едит мод выкл
    }
    const onNameCamera4Change = (e) => {
        setNameCamera4(e.currentTarget.value)       //едит называение камеры
    }
    //  ======================== Name editer of cameras ======================== 






    return (<div className={Cameras.length > 1 ? styleVideo.vidMulti : styleVideo.vid}>
        <div className={styleVideo.cameras}>
            <div className={styleVideo.cameraTitle}>Cameras</div>
            <div className={styleVideo.camerasList}>
                {/*  ======================== Список камер ========================  */}
                <div>
                    <img src={liveStreaming} alt="liveStreaming" />
                    {!editModeCamera1 && <span onDoubleClick={activateEditModeCamera}> {nameCamera1} </span>}
                    {editModeCamera1 && <input onChange={onNameCamera1Change} autoFocus={true} onBlur={deActivateEditModeCamera} />}
                    <img src={screenshot} alt="cameraStatusOn" />
                    <img className={styleVideo.cameraStatusOn} src={(editModeCameraStatus1 === false ? cameraStatusOn : cameraStatusOff)} alt="cameraStatusOn"  // глазок
                        style={{ 'width': '20px', 'padding': '0px' }} onClick={(e) => onCameraStatusEdit1(1)} />
                </div>
                <div>
                    <img src={liveStreaming} alt="liveStreaming" />
                    {!editModeCamera2 && <span onDoubleClick={ activateEditModeCamera2}> {nameCamera2} </span>}
                    {editModeCamera2 && <input onChange={onNameCamera2Change} autoFocus={true} onBlur={deActivateEditModeCamera2} />}
                    <img src={screenshot} alt="cameraStatusOn" />
                    <img className={styleVideo.cameraStatusOn} src={cameraStatusOn} alt="cameraStatusOn"  // глазок
                        style={{ 'width': '20px', 'padding': '0px' }} onClick={(e) => onCameraStatusEdit1(2)}/>
                </div>
                <div>
                    <img src={liveStreaming} alt="liveStreaming" />
                    {!editModeCamera3 && <span onDoubleClick={ activateEditModeCamera3}> {nameCamera3} </span>}
                    {editModeCamera3 && <input onChange={onNameCamera3Change} autoFocus={true} onBlur={deActivateEditModeCamera3} />}
                    <img src={screenshot} alt="cameraStatusOn" />
                    <img className={styleVideo.cameraStatusOn} src={cameraStatusOn} alt="cameraStatusOn"  // глазок
                        style={{ 'width': '20px', 'padding': '0px' }} onClick={(e) => onCameraStatusEdit1(3)}/>
                </div>
                <div>
                    <img src={liveStreaming} alt="liveStreaming" />
                    {!editModeCamera4 && <span onDoubleClick={ activateEditModeCamera4}> {nameCamera4} </span>}
                    {editModeCamera4 && <input onChange={onNameCamera4Change} autoFocus={true} onBlur={deActivateEditModeCamera4} />}
                    <img src={screenshot} alt="cameraStatusOn" />
                    <img className={styleVideo.cameraStatusOn} src={cameraStatusOn} alt="cameraStatusOn"  // глазок
                        style={{ 'width': '20px', 'padding': '0px' }} onClick={(e) => onCameraStatusEdit1(4)}/>
                </div>
            </div>
        </div>
        {/*  ======================== поле видео ========================  */}
        <div className={styleVideo.videoArea}>{Cameras.length > 1
            ? <VideoBarMulti fullScreenButton={fullScreenButton} streams={Cameras} />
            : <VideoBarSingle fullScreenButton={fullScreenButton} streams={Cameras} />}</div>
    </div>
    )
}

export default VideoBar