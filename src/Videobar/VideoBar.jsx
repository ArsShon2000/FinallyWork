import React, { useState } from "react";
// import sample1 from "./multi/video1.mp4"
// import sample2 from "./multi/video2.mp4"
// import sample3 from "./multi/video3.mp4"
// import sample4 from "./multi/video4.mp4"
import styleVideo from "./VideoBar.module.css"
import VideoBarSingle from './single/VideoBarSingle';
import VideoBarMulti from './multi/VideoBarMulti';
import liveStreaming from '../Icons/live-streaming.png'
import cameraStatusOn from '../Icons/cameraStatusOn.png'
import cameraStatusOff from '../Icons/cameraStatusOff.png'
import fullScreenButton from '../Icons/expand.png'
import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:5000',
})


    const VideoBar = (props) => {

    let genNum = props.genNum



    let cameraQuantity = 0;
    let singleCamera;
    let Cameras = props.Cameras.videoStreams;
    for(let i = 0; i < Cameras.length; i++)
    {
        if(Cameras[i].nameStream != '')
        {
            ++cameraQuantity;
        }

    }
    if(cameraQuantity === 1)
    {
        for(let i = 0; i < Cameras.length; i++)
        {
            if(Cameras[i].nameStream != '')
            {
                singleCamera = Cameras[i];
            }
        }
    }

    

    //====================== camera ==========================
    let [editModeCamera1, setEditModeCamera1] = useState(false)
    let [nameCamera1, setNameCamera1] = useState([])
    let [editModeCamera2, setEditModeCamera2] = useState(false)
    let [nameCamera2, setNameCamera2] = useState("sample2")
    let [editModeCamera3, setEditModeCamera3] = useState(false)
    let [nameCamera3, setNameCamera3] = useState("sample3")
    let [editModeCamera4, setEditModeCamera4] = useState(false)
    let [nameCamera4, setNameCamera4] = useState("sample4")

    //====================== camera ==========================

    //====================== cameraStream ==========================
    // let [editStreamCamera1, setEditStreamCamera1] = useState(sample1)
    // let [editStreamCamera2, setEditStreamCamera2] = useState(sample2)
    // let [editStreamCamera3, setEditStreamCamera3] = useState(sample3)
    // let [editStreamCamera4, setEditStreamCamera4] = useState(sample4)
    //====================== cameraStream ==========================

    //====================== cameraStatus ==========================
    // let [editModeCameraStatus1, setEditModeCameraStatus1] = useState(false)
    // let [editModeCameraStatus2, setEditModeCameraStatus2] = useState(false)
    // let [editModeCameraStatus3, setEditModeCameraStatus3] = useState(false)
    // let [editModeCameraStatus4, setEditModeCameraStatus4] = useState(false)
    //====================== cameraStatus ==========================



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
            default: break
        }
    window.location.reload()
    }

    //====================== ?????????????????????????? ?????????? ?? ???????????? ==========================

    //====================== ?????????????????????????? ==========================

    console.log("+++++++++++")

    //================ Name editer of cameras ==========================
    //====================== camera1 ======================== 
    const activateEditModeCamera = () => {
        setEditModeCamera1(true)  //???????? ?????? ??????
    }
    
    const deActivateEditModeCamera = (e) => {
        setEditModeCamera1(false)   //???????? ?????? ????????
        
    }
    const onNameCamera1Change = (e) => {
        setNameCamera1(e.currentTarget.value)       //???????? ???????????????????? ????????????
    }
    //  ======================== camera2 ======================== 
    const activateEditModeCamera2 = () => {
        setEditModeCamera2(true)    //???????? ?????? ??????
    }
    const deActivateEditModeCamera2 = () => {
        setEditModeCamera2(false)   //???????? ?????? ????????
    }
    const onNameCamera2Change = (e) => {
        setNameCamera2(e.currentTarget.value)       //???????? ???????????????????? ????????????
    }
    //  ======================== camera3 ======================== 
    const activateEditModeCamera3 = () => {
        setEditModeCamera3(true)    //???????? ?????? ??????
    }
    const deActivateEditModeCamera3 = () => {
        setEditModeCamera3(false)   //???????? ?????? ????????
    }
    const onNameCamera3Change = (e) => {
        setNameCamera3(e.currentTarget.value)       //???????? ???????????????????? ????????????
    }
    //  ======================== camera4 ======================== 
    const activateEditModeCamera4 = () => {
        setEditModeCamera4(true)    //???????? ?????? ??????
    }
    const deActivateEditModeCamera4 = () => {
        setEditModeCamera4(false)   //???????? ?????? ????????
    }
    const onNameCamera4Change = (e) => {
        setNameCamera4(e.currentTarget.value)       //???????? ???????????????????? ????????????
    }
    //  ======================== Name editer of cameras ======================== 



    return (<div className={styleVideo.vid}>
        <div className={styleVideo.cameras}>
            <div className={styleVideo.cameraTitle}>Cameras</div>
            <div className={styleVideo.camerasList}>
                {/*  ======================== ???????????? ?????????? ========================  */}
                <div>
                    <img src={liveStreaming} alt="liveStreaming" />
                    {!editModeCamera1 && <span onDoubleClick={activateEditModeCamera}> {Cameras[0].nameCamera} </span>}
                    {editModeCamera1 && <input onChange={onNameCamera1Change} autoFocus={true} onBlur={deActivateEditModeCamera} />}
                    <img className={styleVideo.cameraStatusOn} src={(Cameras[0].editMode === "true" ? cameraStatusOff : cameraStatusOn )} 
                        alt="cameraStatusOn"  // ????????????
                        style={{ 'width': '20px', 'padding': '0px' }} onClick={(e) => onCameraStatusEdit1(1)} title="?????????????????? ????????????" />
                </div>
                <div>
                    <img src={liveStreaming} alt="liveStreaming" />
                    {!editModeCamera2 && <span onDoubleClick={ activateEditModeCamera2}> {Cameras[1].nameCamera} </span>}
                    {editModeCamera2 && <input onChange={onNameCamera2Change} autoFocus={true} onBlur={deActivateEditModeCamera2} />}
                    <img className={styleVideo.cameraStatusOn} src={(Cameras[1].editMode === "true" ? cameraStatusOff : cameraStatusOn )} 
                        alt="cameraStatusOn"  // ????????????
                        style={{ 'width': '20px', 'padding': '0px' }} onClick={(e) => onCameraStatusEdit1(2)} title="?????????????????? ????????????" />
                </div>
                <div>
                    <img src={liveStreaming} alt="liveStreaming" />
                    {!editModeCamera3 && <span onDoubleClick={ activateEditModeCamera3}> {Cameras[2].nameCamera} </span>}
                    {editModeCamera3 && <input onChange={onNameCamera3Change} autoFocus={true} onBlur={deActivateEditModeCamera3} />}
                    <img className={styleVideo.cameraStatusOn} src={(Cameras[2].editMode === "true" ? cameraStatusOff : cameraStatusOn )} 
                    
                        alt="cameraStatusOn"  // ????????????
                        style={{ 'width': '20px', 'padding': '0px' }} onClick={(e) => onCameraStatusEdit1(3)} title="?????????????????? ????????????" />
                </div>
                <div>
                    <img src={liveStreaming} alt="liveStreaming" />
                    {!editModeCamera4 && <span onDoubleClick={ activateEditModeCamera4}> {Cameras[3].nameCamera} </span>}
                    {editModeCamera4 && <input onChange={onNameCamera4Change} autoFocus={true} onBlur={deActivateEditModeCamera4} />}
                    <img className={styleVideo.cameraStatusOn} src={(Cameras[3].editMode === "true" ? cameraStatusOff : cameraStatusOn )} 
                        alt="cameraStatusOn"  // ????????????
                        style={{ 'width': '20px', 'padding': '0px' }} onClick={(e) => onCameraStatusEdit1(4)} title="?????????????????? ????????????" />
                </div>
            </div>
        </div>
        {/*  ======================== ???????? ?????????? ========================  */}
        <div className={styleVideo.videoArea}>{cameraQuantity > 1
            ? <VideoBarMulti fullScreenButton={fullScreenButton} streams={Cameras} genNum={genNum}/>
            : <VideoBarSingle fullScreenButton={fullScreenButton} singleCamera={singleCamera} genNum={genNum}/>}</div>
    </div>
    )
}

export default VideoBar