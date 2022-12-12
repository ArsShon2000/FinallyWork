import React, { useState } from "react";
import styleVideo from "./VideoBarMulti.module.css"
import FullWindowStream from '../../Icons/free-icon-font-expand-3917554.png'
import fullAllStreams from '../../Icons/free-icon-font-apps-3917618.png'
import fullOneStream from '../../Icons/single.png'
import noSignal from '../../Icons/no-signal.png'
import ModalMultiVideoBar from './Modal/ModalMultiVideoBar';
import GenCarNumber from "../../GenCarNum/GenCarNumber";
import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:5000',
})

const VideoBarMulti = (props) => {
    //  ======================== Номера машин из бэка ======================== 
    let genNum = props.genNum


    //  ======================== модальное окно ======================== 
    const [modalActive, setModalActive] = useState(false)

    //  ======================== полноэкранный режим всех камер ======================== 
    let [editSizeMode, setEditSizeMode] = useState(false)

    //  ======================== полноэкранный режим 1 камеры ======================== 
    let [editOneSizeMode, setEditOneSizeMode] = useState('')

    //  ======================== Номер камеры ======================== 
    let [showValueOfSelect, setValueOfSelect] = useState('No')

    //  ======================== полноэкранный режим каждого окна ======================== 
    const toggleFullScreen1 = () => {
        let el = document.querySelector("#multi-video1-player");
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

    const toggleFullScreen2 = () => {
        let el = document.querySelector("#multi-video2-player");
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

    const toggleFullScreen3 = () => {
        let el = document.querySelector("#multi-video3-player");
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

    const toggleFullScreen4 = () => {
        let el = document.querySelector("#multi-video4-player");
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
    //  ======================== полноэкранный режим каждого окна ======================== 


    //  ======================== полноэкранный режим каждого окна c помощью селекта ======================== 
    const onClickFullOneStream = () => {
        let select = document.getElementById("select_")
        let value = select.options[select.selectedIndex].value //получаем значение из селекта
        switch (value) {
            case "1":
                {
                    for (let i = 0; i < 4; ++i) {
                        if (parseInt(value) === (i + 1)) 
                        {
                            instance.put(`/Cameras/id/${i + 1}`, {
                                edit_stream: "/static/media/video1.cff2ae39.mp4",
                                edit_mode: "false"
                            })
                        }
                        else {
                            instance.put(`/Cameras/id/${i + 1}`, {
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
                    for (let i = 0; i < 4; ++i) {
                        if (parseInt(value) === (i + 1)) 
                        {
                            instance.put(`/Cameras/id/${i + 1}`, {
                                edit_stream: "/static/media/video1.cff2ae39.mp4",
                                edit_mode: "false"
                            })
                        }
                        else {
                            instance.put(`/Cameras/id/${i + 1}`, {
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
                    for (let i = 0; i < 4; ++i) {
                        if (parseInt(value) === (i + 1)) 
                        {
                            instance.put(`/Cameras/id/${i + 1}`, {
                                edit_stream: "/static/media/video1.cff2ae39.mp4",
                                edit_mode: "false"
                            })
                        }
                        else {
                            instance.put(`/Cameras/id/${i + 1}`, {
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
                    for (let i = 0; i < 4; ++i) {
                        if (parseInt(value) === (i + 1)) 
                        {
                            instance.put(`/Cameras/id/${i + 1}`, {
                                edit_stream: "/static/media/video1.cff2ae39.mp4",
                                edit_mode: "false"
                            })
                        }
                        else {
                            instance.put(`/Cameras/id/${i + 1}`, {
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
    }

    //  ======================== изменение размера в полноэкранном режиме всех 4 камер ======================== 
    const onClickFullWindowStream = () => {
        setEditSizeMode(true)
        let el = document.querySelector("#mainVideoBar");
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

    //  ======================== вернуть размеры в исходное состояние ======================== 
    document.addEventListener('keydown', function (event) {
        if ((event.key === "Escape")) {
            setEditSizeMode(false)
            setModalActive(false)
        }
    })

    //  ======================== второй вариант фуллскрин ======================== 
    let potok1, potok2, potok3, potok4 = false
    for (let i = 0; i < props.streams.length; i++) { //проверяем есть ли потоки
        if (props.streams[i].nameStream === "/static/media/video1.cff2ae39.mp4" && i === 0) {
            (potok1 = true)
        } else if (props.streams[i].nameStream === "/static/media/video1.cff2ae39.mp4" && i === 1) {
            (potok2 = true)
        } else if (props.streams[i].nameStream === "/static/media/video1.cff2ae39.mp4" && i === 2) {
            (potok3 = true)
        } else if (props.streams[i].nameStream === "/static/media/video1.cff2ae39.mp4" && i === 3) {
            (potok4 = true)
        }
    }

    //для ресета размера видео (не работает)
    // setInterval((event) => {
    //     let el = document.querySelector("#mainVideoBar");
    //     if(el.webkitSupportsFullscreen)
    //     {
    //         alert("uu")
    //         setEditSizeMode(false)
    //     }
    // }, 500);


    return (<div>
        <div id="mainVideoBar" className={styleVideo.vidMulti}>
            {/*  ======================== первый видео поток ========================  */}
            {potok1
                ? <><video controls style={editSizeMode === true ? { "width": "960px", "height": "540px" } : {}} className={styleVideo.video1} autoPlay loop muted id="multi-video1-player" >
                    <source src={props.streams[0].nameStream} type='video/mp4' />
                </video>
                    <div className={styleVideo.genNum1}><GenCarNumber genNum={genNum[0].carNumbers}/></div>
                    
                    <span className={styleVideo.video1}>{props.streams[0].nameCamera}</span>
                    <div className={styleVideo.fullScreenButton1}>
                        <img onClick={toggleFullScreen1} id="fullScreenImg" alt="fullScreenImg" src={props.fullScreenButton} title="На полный экран" />
                </div>
                    </>
                : <div className={styleVideo.video1NoCamera}><img src={noSignal} alt="noSignal" /></div>}


            {/*  ======================== 2 видео поток ========================  */}
            {potok2
                ? <><video style={editSizeMode === true ? { "width": "960px", "height": "540px" } : {}} className={styleVideo.video2} autoPlay loop muted id='multi-video2-player'>
                    <source src={props.streams[1].nameStream} type='video/mp4' />
                </video>                   
                    <div className={styleVideo.genNum2}><GenCarNumber genNum={genNum[1].carNumbers}/></div>
                    <span className={styleVideo.video2}>{props.streams[1].nameCamera}</span>
                    <div className={styleVideo.fullScreenButton2}>
                        <img onClick={toggleFullScreen2} id="fullScreenImg" alt="fullScreenImg" src={props.fullScreenButton} title="На полный экран" />
                </div>
                </>
                : <div className={styleVideo.video1NoCamera}><img src={noSignal} alt="noSignal" /></div>}
            {/*  ======================== 3 видео поток ========================  */}
            {potok3
                ? <><video style={editSizeMode === true ? { "width": "960px", "height": "540px" } : {}} className={styleVideo.video3} autoPlay loop muted id='multi-video3-player'>
                    <source src={props.streams[2].nameStream} type='video/mp4' />
                </video>
                    <div className={styleVideo.genNum3}><GenCarNumber genNum={genNum[2].carNumbers}/></div>
                    <span className={styleVideo.video3}>{props.streams[2].nameCamera}</span>
                    <div className={styleVideo.fullScreenButton3}>
                        <img onClick={toggleFullScreen3} id="fullScreenImg" alt="fullScreenImg" src={props.fullScreenButton} title="На полный экран" />
                </div></>
                : <div className={styleVideo.video3NoCamera}><img src={noSignal} alt="noSignal" /></div>}
            {/*  ======================== 4 видео поток ========================  */}
            {potok4
                ? <><video style={editSizeMode === true ? { "width": "960px", "height": "540px" } : {}} className={styleVideo.video4} autoPlay loop muted id='multi-video4-player'>
                    <source src={props.streams[3].nameStream} type='video/mp4' />
                </video>
                    <div className={styleVideo.genNum4}><GenCarNumber genNum={genNum[3].carNumbers}/></div>
                    <span className={styleVideo.video4}>{props.streams[3].nameCamera}</span>
                    <div className={styleVideo.fullScreenButton4}>
                        <img onClick={toggleFullScreen4} id="fullScreenImg" alt="fullScreenImg" src={props.fullScreenButton} title="На полный экран" />
                </div></>
                : <div className={styleVideo.video4NoCamera}><img src={noSignal} alt="noSignal" /></div>}

            
            {/*  ======================== полноэкранный режим c рамкой ======================== */}
            <ModalMultiVideoBar active={modalActive} setActive={setModalActive}>
                <video autoPlay loop muted id="multi-video1-player">
                    <source src={potok1 === true ? props.streams[0].nameStream : ""} type='video/mp4' />
                </video>
                <video autoPlay loop muted id="multi-video2-player" >
                    <source src={potok2 === true ? props.streams[1].nameStream : ""} type='video/mp4' />
                </video>
                <video autoPlay loop muted id="multi-video3-player" >
                    <source src={potok3 === true ? props.streams[2].nameStream : ""} type='video/mp4' />
                </video>
                <video autoPlay loop muted id="multi-video4-player" >
                    <source src={potok4 === true ? props.streams[3].nameStream : ""} type='video/mp4' />
                </video>
            </ModalMultiVideoBar>
        </div>
        {/*  ======================== нижние инструменты ========================  */}
        <div className={styleVideo.tools}>
            <div className={styleVideo.FullWindowStream} title="Hа весь экран все 4 видео" > {/* на весь экран все 4 видео */}
                <img onClick={onClickFullWindowStream} src={FullWindowStream} alt="FullWindowStream" />
            </div>
            <div className={styleVideo.fullAllStreams} title="Hа весь экран браузера все 4 видео"> {/* на полный экран браузера все 4 видео */}
                <img onClick={() => setModalActive(true)} src={fullAllStreams} alt="fullAllStreams" />
            </div>
            <div className={styleVideo.fullOneStream} title="Hа весь экран 1 видео">
                <img src={fullOneStream} alt="fullOneStream" /> {/* на весь экран 1 видео */}
            </div>
            <div className={styleVideo.valueOfSelect}>
                <span>{showValueOfSelect}</span>
            </div>
            <div className={styleVideo.select} title="Выбор камеры">
                <select id="select_" onChange={(e) => onClickFullOneStream(e)}> {/* выбор видео на весь экран */}
                    <option value="No"></option>
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

export default VideoBarMulti