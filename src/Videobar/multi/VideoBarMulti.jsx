import React, { useState} from "react";
import styleVideo from "./VideoBarMulti.module.css"
import FullWindowStream from '../../Icons/free-icon-font-expand-3917554.png'
import fullAllStreams from '../../Icons/free-icon-font-apps-3917618.png'
import fullOneStream from '../../Icons/single.png'
import ModalMultiVideoBar from './Modal/ModalMultiVideoBar';
import GenCarNumber from "../../GenCarNum/GenCarNumber";


const VideoBarMulti = (props) => {


    

    //  ======================== модальное окно ======================== 
    const [modalActive, setModalActive] = useState(false)

    //  ======================== полноэкранный режим всех камер ======================== 
    let [editSizeMode, setEditSizeMode] = useState(false)

    //  ======================== Обновить данные из массива ======================== 

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
                    let el = document.getElementById("multi-video1-player")
                    if (el.webkitRequestFullscreen) {
                        el.webkitRequestFullscreen();
                    } else if (el.msRequestFullscreen) {
                        el.msRequestFullscreen();
                    } else if (el.mozRequestFullScreen) {
                        el.mozRequestFullScreen();
                    } else if (el.requestFullscreen) {
                        el.requestFullscreen();
                    }
                    break
                }
            case "2":
                {
                    let el = document.getElementById("multi-video2-player")
                    if (el.webkitRequestFullscreen) {
                        el.webkitRequestFullscreen();
                    } else if (el.msRequestFullscreen) {
                        el.msRequestFullscreen();
                    } else if (el.mozRequestFullScreen) {
                        el.mozRequestFullScreen();
                    } else if (el.requestFullscreen) {
                        el.requestFullscreen();
                    }
                    break
                }
            case "3":
                {
                    let el = document.getElementById("multi-video3-player")
                    if (el.webkitRequestFullscreen) {
                        el.webkitRequestFullscreen();
                    } else if (el.msRequestFullscreen) {
                        el.msRequestFullscreen();
                    } else if (el.mozRequestFullScreen) {
                        el.mozRequestFullScreen();
                    } else if (el.requestFullscreen) {
                        el.requestFullscreen();
                    }
                    break
                }
            case "4":
                {
                    let el = document.getElementById("multi-video4-player")
                    if (el.webkitRequestFullscreen) {
                        el.webkitRequestFullscreen();
                    } else if (el.msRequestFullscreen) {
                        el.msRequestFullscreen();
                    } else if (el.mozRequestFullScreen) {
                        el.mozRequestFullScreen();
                    } else if (el.requestFullscreen) {
                        el.requestFullscreen();
                    }
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

    // let video2 = document.querySelector('#multi-video2-player');
    // const pause = () => {
    //         video2.webkitRequestFullscreen();
    // }

    let potok1, potok2, potok3, potok4 = false
    for(let i = 0; i < props.streams.length; i++){ //проверяем есть ли потоки
        if (props.streams[i].nameStream === "/static/media/video1.cff2ae39.mp4" && i === 0 ) {
             (potok1 = true)
        }else if (props.streams[i].nameStream === "/static/media/video1.cff2ae39.mp4" && i === 1  ) {
             (potok2 = true)
        }else if (props.streams[i].nameStream === "/static/media/video1.cff2ae39.mp4" && i === 2  ) {
             (potok3 = true)
        }else if (props.streams[i].nameStream === "/static/media/video1.cff2ae39.mp4" && i === 3  ) {
             (potok4 = true)
        }
    }    

    
    return (<div>
        <div id="mainVideoBar" className={styleVideo.vidMulti}>
            {/*  ======================== первый видео поток ========================  */}
            <video style={editSizeMode === true ? { "width": "960px", "height": "540px" } : {}} className={styleVideo.video1} autoPlay loop muted id="multi-video1-player" >
                <source src={potok1 === true ? props.streams[0].nameStream : ""} type='video/mp4' /> 
            </video>
            <span className={styleVideo.video1}>{"sample1"}</span>
            <img onClick={toggleFullScreen1} id="fullScreenImg" alt="fullScreenImg" className={styleVideo.video1} src={props.fullScreenButton} />

            {/*  ======================== 2 видео поток ========================  */}
            <video style={editSizeMode === true ? { "width": "960px", "height": "540px" } : {}} className={styleVideo.video2} autoPlay loop muted id='multi-video2-player'>
                <source src={potok2 === true ? props.streams[1].nameStream : ""}  type='video/mp4' />
            </video>
            <span className={styleVideo.video2}>{"sample2"}</span>
            <img onClick={toggleFullScreen2} id="fullScreenImg" alt="fullScreenImg" className={styleVideo.video2} src={props.fullScreenButton} />

            {/*  ======================== 3 видео поток ========================  */}
            <video style={editSizeMode === true ? { "width": "960px", "height": "540px" } : {}} className={styleVideo.video3} autoPlay loop muted id='multi-video3-player'>
                <source src={potok3 === true ? props.streams[2].nameStream : ""}  type='video/mp4' />
            </video>
            <span className={styleVideo.video3}>{"sample3"}</span>
            <img onClick={toggleFullScreen3} id="fullScreenImg" alt="fullScreenImg" className={styleVideo.video3} src={props.fullScreenButton} />

            {/*  ======================== 4 видео поток ========================  */}
            <video style={editSizeMode === true ? { "width": "960px", "height": "540px" } : {}} className={styleVideo.video4} autoPlay loop muted id='multi-video4-player'>
                <source src={potok4 === true ? props.streams[3].nameStream : ""}  type='video/mp4' />
            </video>
            <span className={styleVideo.video4}>{"sample4"}</span>
            <img onClick={toggleFullScreen4} id="fullScreenImg" alt="fullScreenImg" className={styleVideo.video4} src={props.fullScreenButton} />


            <GenCarNumber />

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

        <div className={styleVideo.tools}> //
            <div className={styleVideo.FullWindowStream} > {/* на весь экран все 4 видео */}
                <img onClick={onClickFullWindowStream} src={FullWindowStream} alt="FullWindowStream" />
            </div>
            <div className={styleVideo.fullAllStreams} > {/* на полный экран браузера все 4 видео */}
                <img onClick={() => setModalActive(true)} src={fullAllStreams} alt="fullAllStreams" />
            </div>
            <div className={styleVideo.fullOneStream} onClick={onClickFullOneStream}>
                <img src={fullOneStream} alt="fullOneStream" /> {/* на весь экран 1 видео */}
            </div>
            <div className={styleVideo.select}>
            <select id="select_"> {/* выбор видео на весь экран */}
                        <option  value=""></option>
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