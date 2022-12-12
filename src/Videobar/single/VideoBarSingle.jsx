import React, { useState } from "react";
import sample1 from "./video1.mp4"
import styleVideo from "./VideoBarSingle.module.css";
import fullOneStream from '../../Icons/single.png';
import axios from "axios";
import GenCarNumber from "../../GenCarNum/GenCarNumber";
// import GenCarNumber from "../../GenCarNum/GenCarNumber";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:5000',
})


const VideoBarSingle = (props) => {
    //  ======================== Номера машин из бэка ======================== 
    let genNum = props.genNum
    let singleCamera = true;
    //  ======================== Номер камеры ======================== 


    //  ======================== полноэкранный режим каждого окна c помощью селекта ======================== 
    const onClickFullOneStream = () => {
            let select = document.getElementById("select_")
            let value = select.options[select.selectedIndex].value //получаем значение из селекта
            switch (value) {
                case "All":
                    {
                        for (let i = 1; i < 5; i++) {
                            instance.put(`/Cameras/id/${i}`, {
                                edit_stream: "/static/media/video1.cff2ae39.mp4",
                                edit_mode: "false"
                            })
                        }
                        window.location.reload()
                        break
                    }
                case "1":
                    {
                        for (let i = 1; i < 5; i++) {
                            if (parseInt(value) === (i)) {
                                instance.put(`/Cameras/id/${i}`, {
                                    edit_stream: "/static/media/video1.cff2ae39.mp4",
                                    edit_mode: "false"
                                })
                            }
                            else {
                                instance.put(`/Cameras/id/${i}`, {
                                    edit_stream: "",
                                    edit_mode: "true"
                                })
                            }
                        }
                        window.location.reload()
                        break
                    }
                case "2":
                    {
                        for (let i = 1; i < 5; i++) {
                            if (parseInt(value) === (i)) {
                                instance.put(`/Cameras/id/${i}`, {
                                    edit_stream: "/static/media/video1.cff2ae39.mp4",
                                    edit_mode: "false"
                                })
                            }
                            else {
                                instance.put(`/Cameras/id/${i}`, {
                                    edit_stream: "",
                                    edit_mode: "true"
                                })
                            }
                        }
                        window.location.reload()
                        break
                    }
                case "3":
                    {
                        for (let i = 1; i < 5; i++) {
                            if (parseInt(value) === (i)) {
                                instance.put(`/Cameras/id/${i}`, {
                                    edit_stream: "/static/media/video1.cff2ae39.mp4",
                                    edit_mode: "false"
                                })
                            }
                            else {
                                instance.put(`/Cameras/id/${i}`, {
                                    edit_stream: "",
                                    edit_mode: "true"
                                })
                            }
                        }
                        window.location.reload()
                        break
                    }
                case "4":
                    {
                        for (let i = 1; i < 5; i++) {
                            if (parseInt(value) === (i)) {
                                instance.put(`/Cameras/id/${i}`, {
                                    edit_stream: "/static/media/video1.cff2ae39.mp4",
                                    edit_mode: "false"
                                })
                            }
                            else {
                                instance.put(`/Cameras/id/${i}`, {
                                    edit_stream: "",
                                    edit_mode: "true"
                                })
                            }
                        }
                        window.location.reload()
                        break
                    }
                default:
                    {
                        alert("Выберите камеру!")
                    }
            }
        
    };
    //  ======================== полноэкранный режим каждого окна ========================
    const toggleFullScreen1 = () => {
        let el = document.querySelector("#single-video-player");
        if (el.requestFullscreen) {
            el.requestFullscreen();
        } else if (el.msRequestFullscreen) {
            el.msRequestFullscreen();
        } else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
        } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
        }
    };

    let singleCameras = props.singleCamera

    debugger
    return (
        <div>
            <div className={styleVideo.vidSingle}>
                <video className={styleVideo.singleVideoArea} autoPlay loop muted id="single-video-player">
                    <source src={props.singleCamera.nameStream} type='video/mp4' />
                </video>
                <div className={styleVideo.genNumSingle}><GenCarNumber genNum={genNum[props.singleCamera.id_name - 1].carNumbers} singleCamera={singleCamera} /></div>
                <img onClick={toggleFullScreen1} id="fullScreenImg" alt="fullScreenImg" className={styleVideo.singleVideoArea} src={props.fullScreenButton} title="На полный экран" />
                <span className={styleVideo.singleVideoArea}>{props.singleCamera.nameCamera}</span>
            </div>
            {/*  ======================== нижние инструменты ========================  */}
            <div className={styleVideo.tools}>
                <div className={styleVideo.fullOneStream} title="Hа весь экран 1 видео">
                    <img src={fullOneStream} alt="fullOneStream" /> {/* на весь экран 1 видео */}
                </div>
                <div className={styleVideo.valueOfSelect}>
                    <span>{props.singleCamera.id_name}</span>
                </div>
                <div className={styleVideo.select} title="Выбор камеры">
                    <select id="select_" onChange={(e) => onClickFullOneStream(e)}
                                                          > {/* выбор видео на весь экран */}
                        <option value="NO">NO</option>
                        <option type="checkbox" value="All">All</option>
                        <option type="checkbox" value="1">1</option>
                        <option type="checkbox" value="2">2</option>
                        <option type="checkbox" value="3">3</option>
                        <option type="checkbox" value="4">4</option>
                    </select>
                </div>
            </div>
        </div>

    )
}

export default VideoBarSingle