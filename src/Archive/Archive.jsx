import React, { useState, useRef, useEffect } from "react";
import styArch from "./Archive.module.css"
import record1 from "../Videobar/multi/video1.mp4"
import record2 from "../Videobar/single/video1.mp4"
import record3 from "../Videobar/single/video1.mp4"
import record4 from "../Videobar/single/video1.mp4"
import play from "../Icons/play.png"
import back from "../Icons/back.png"
import forward from "../Icons/forward.png"
import pauseButton from "../Icons/pause.png"
import stopButton from "../Icons/stop.png"
import stopButtonOff from "../Icons/stopOff.png"
import scissors from "../Icons/scissors.png"
import axios from "axios";
import VideoList from "./videoList/VideoList";
import "./Archive.module.css"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Progress from "./controls/Progress";
import ReactPlayer from 'react-player'


const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:5000',
})



const Archive = (props) => {

    let [videoListFromArchive, setVideoListFromArchive] = useState({}) //получение списка видео с сервера
  const [isLoaded, setIsLoaded] = useState(false); // загружечная страница
  const [error, setError] = useState(null); 
  const [yearMonthDay, setYearMonthDay] = useState({}); //получаем год месяц и день

    /* ====================================   calendar   ================================== */
  const [value, onChange] = useState(new Date()); //default
  const [sereval, setSereval] = useState(false); // выбор нескольких дней

    /* ====================================   проигрыватель   ================================== */
    let [pause, setPause] = useState(true)  //пауза-плей
    let [stop, setStop] = useState(true) // стоп
    let [choiceStream, setChoiceStream] = useState(false) //сетаем поток камеры
    let [title, setTitle] = useState(''); //установка даты
    const [videoTime,  setVideoTime] = useState({ //прогресс бар
        loadedSecond: 1,
        playedSeconds: 0,
        volume: 0
    })


    useEffect ( () => {
        fetch(`http://127.0.0.1:5000/archiveList`)
        .then(res => res.json())
        .then((result) => {
        setIsLoaded(true);
            
            setVideoListFromArchive(result.files);
            setYearMonthDay([result.setYear, result.setMonth, result.setDay]) // получаем даты установленной папки
          },
          (error) => {
        setIsLoaded(true);
        setError(error);
          })
      }, [])
    

    const {
        volume,
        loadedSecond,
        playedSeconds
    } = videoTime

    const refPlayer = useRef()
   


    /* ====================================   stop   ================================== */
    const onStopClick = () => {
        let video = document.querySelector("#single-video-player")
        video.pause()
        video.currentTime = 0
        setStop(false)
        setPause(false)
    }


    /* ====================================   play   ================================== */
    const onPlayClick = () => {
        let video = document.querySelector("#single-video-player")

        if (pause === true) {
            video.pause()
            setPause(false)
        } else {
            video.play()
            setPause(true)
            setStop(true)
        }
    }
    // кнопкой
    document.addEventListener('keyup', function (event) {
        let video = document.querySelector("#single-video-player")
        if ((event.code === "Space")) {
            if (pause === true) {
                video.pause()
                setPause(false)
            } else {
                video.play()
                setPause(true)
                setStop(true)
            }
        }  
    })

    /* ====================================   back   ================================== */
    const onBackClick = () => {
        let video = document.querySelector("#single-video-player")
        video.currentTime -= 2

    }
    // кнопкой
    document.addEventListener('keyup', function (event) {
        if ((event.key === "ArrowLeft")) {
            let video = document.querySelector("#single-video-player")
            video.currentTime -= 1
        }
    })
    /* ====================================   Forward   ================================== */
    const onForwardClick = () => {
        let video = document.querySelector("#single-video-player")
        video.currentTime += 2
    }
    // кнопкой
    document.addEventListener('keyup', function (event) {
        console.log(event)
        if ((event.key === "ArrowRight")) {
            let video = document.querySelector("#single-video-player")
            video.currentTime += 1
        }
    })
    /* ====================================   speedUp   ================================== */
    const onSpeedUp = () => {
        let video = document.querySelector("#single-video-player")
        let select = document.getElementById("speedUp_")
        let value = select.options[select.selectedIndex].value
        switch (value) {
            case "": {
                video.playbackRate = 1
                break
            }
            case "1": {
                video.playbackRate = 2
                break
            }
            case "2": {
                video.playbackRate = 4
                break
            }
            case "3": {
                video.playbackRate = 8
                break
            }
        }
    }

    const changeRecord = () => {  
        let select = document.getElementById("stream_")
        let value = select.options[select.selectedIndex].value
        setChoiceStream(value)
    }

    /* ====================================   progressBar   ================================== */
    const handleProgress = (e) => {
        setVideoTime({...videoTime, ...e})
    }

    const handleVolume = (e) => {
        setVideoTime({...videoTime, volume: e.target.value})
    }



    const searchVideos = () => {
        console.log(title)
        let titleSplit = title.split('')
        
        for( let i = 0; i < title.length; i++){
            if(titleSplit[i] == ".") {
                titleSplit[i] = '_'
            }
        }
        console.log(titleSplit)

        let titleJoin = titleSplit.join('') 
        console.log(titleJoin)

    }

    /* ====================================   Test zone   ================================== */
    const  dateValue: Date = new Date(yearMonthDay[0], yearMonthDay[1] - 1, yearMonthDay[2]) // установка активной даты

    const onClickDay = (value, event) => {
        if (sereval == false){
            instance.post('/archiveList/byDate', {
                year: value.getYear() + 1900,
                month: value.getMonth() + 1,
                day: value.getDate()
            }).then((res) => {
                window.location.reload()
            })
        }
    }
    

    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {

    console.log(yearMonthDay[0])
    return (
        <div className={styArch.lab} >
            <div className={styArch.records}>
                <div className={styArch.recordsTitle}>records</div>
                <div className={styArch.recordsList}>
                    <div className={styArch.stream}>
                        <select id="stream_" onChange={changeRecord}>
                            <option value="">Выберите камеру</option>
                            <option value="1">Первая камера</option>
                            <option value="2">Вторая камера</option>
                            <option value="3">Третьяя камера</option>
                            <option value="4">Четвертая камера</option>
                        </select>
                    </div>
                    <div>
                    <input 
                    value={title} onChange={(e) => setTitle(e.currentTarget.value)}
                    placeholder="dd.mm.yyyy"></input>
                    <button onClick={searchVideos}>Найти</button>
                    <button onClick={() => setSereval(true)}>Несколько</button>
                    </div>

                    <div className={styArch.calendar}>
                        <Calendar onChange={onChange} value={dateValue}  //календарь
                        onClickDay={(value, event) => onClickDay(value, event) }
                        // formatLongDate={(locale, date) => formatDate(date, 'dd MMM YYYY')}
                        isMultiSelection = {false}
                        />
                        <div>Архивы с {yearMonthDay[2]}-{yearMonthDay[1]}-{yearMonthDay[0]}</div>
                        {videoListFromArchive.map((w) => { // пробежка по списку
                            return (
                                <VideoList key={w} videos = {w}/>
                            )
                        })}
                    </div>
                    
                </div>
            </div>
            
             {/* ========================== видеоплеер ======================== */}
            <div className={styArch.videoArea}>
            
                <video className={styArch.videoStream} autoPlay loop muted id="single-video-player"
                ref={refPlayer}
                volume={volume}
                onProgress={handleProgress}
                >
                    <source src={record1} type='video/mp4' />
                </video>
                <div className={styArch.progressBar}>
                    <Progress 
                        loadedSecond={loadedSecond}
                        playedSeconds={playedSeconds}
                        handleVolume={handleVolume}
                        volume={volume}
                    />
                    {/* <progress id="progress" max="100" value="0"  ></progress> */}
                </div>
                 {/* ========================== видеоплеер ======================== */}
                <div className={styArch.tools}>
                    {stop == false ?
                        <div className={styArch.stop}>
                            <img src={stopButton} onClick={onStopClick} />
                        </div> :
                        <div className={styArch.stop}>
                            <img src={stopButtonOff} onClick={onStopClick} />
                        </div>
                    }
                    <div className={styArch.back}>
                        <img src={back} onClick={onBackClick} />
                    </div>
                    {pause == true ?
                        <div className={styArch.Play}>
                            <img src={pauseButton} onClick={onPlayClick} />
                        </div> :
                        <div className={styArch.Play}>
                            <img src={play} onClick={onPlayClick} />
                        </div>
                    }
                    <div className={styArch.forward}>
                        <img src={forward} onClick={onForwardClick} />
                    </div>
                    <div className={styArch.speed}>
                        <select id="speedUp_" onChange={onSpeedUp}>
                            <option value="">1x</option>
                            <option value="1">2x</option>
                            <option value="2">4x</option>
                            <option value="3">8x</option>
                        </select>
                    </div>
                    <div className={styArch.scissors}>
                        <img src={scissors} onClick={onForwardClick} />
                    </div>
                </div>
                <img src={props.fullScreenButton} />
                <span>{record1}</span>
            </div>
        </div>
    )
}
}


export default Archive