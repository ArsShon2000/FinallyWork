import React, { useState, useEffect, useRef } from "react";
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
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


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
    let [title, setTitle] = useState('') //установка даты
    let [second, setSecond] = useState(0) // секунды видео
    let [minute, setMinute] = useState(0) // минуты видео
    let [hour, setHour] = useState(0) // часы видео
    let [progressTime, setProgressTime] = useState(0)
    let [videoEnd, setVideoEnd] = useState([]) // длительность видео



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

    const changeRecord = () => {   //не работает
        let select = document.getElementById("stream_")
        let value = select.options[select.selectedIndex].value
        setChoiceStream(value)
    }

    /* ====================================   progressBar   ================================== */
    let Video = document.getElementById("single-video-player");
    if(Video != null)
    {
        Video.ontimeupdate = () => {myFunction()};
        const myFunction = () => {
            setProgressTime(Video.currentTime)
            setHour(Math.floor(Video.currentTime / 60 / 60))
            setMinute(Math.floor(Video.currentTime/ 60) - (hour * 60))
            setSecond(Math.floor(Video.currentTime % 60))

            let hours, minutes, seconds
            hours = Math.floor(Video.duration / 60 / 60)
            minutes = Math.floor(Video.duration/ 60) - (hour * 60)
            seconds = Math.floor(Video.duration % 60)
            setVideoEnd([...videoEnd, {0: hours, 1: minutes, 2: seconds}])
      }
    }

    const progressClick = () => {
        let PB = document.getElementById("progressBar");
        if(PB != null){
            let widthPB = PB.offsetWidth  // длина template video
            let procent = (8.1 / 100) * (100 * window.event.offsetX / widthPB) //убираю разницу длины прогресбара от общей длины
            let newTime = window.event.offsetX - ((widthPB / 100) * procent) // уточняю где был клик
            Video.currentTime = newTime
        }
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
                year: value.getYear() + 1900, // год начинается с 122
                month: value.getMonth() + 1, // месяц начинается с 0
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
                        <Calendar onChange={onChange} value={dateValue}  //календарь //ддммгг передается в вэлию
                        onClickDay={(value, event) => onClickDay(value, event) } // получаем дату в качестве аргумента
                        // formatLongDate={(locale, date) => formatDate(date, 'dd MMM YYYY')}
                        isMultiSelection = {false} // выбрать диапазон
                        />
                        <div>Архивы с {yearMonthDay[2]}-{yearMonthDay[1]}-{yearMonthDay[0]}</div> // день месяц год
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
                ontimeupdate="myFunction(this)">
                    <source src={record1} type='video/mp4' />
                </video>
                <div className={styArch.progressBar}>                    
                    <progress id="progressBar" 
                    max={videoEnd.length > 0 ?
                        videoEnd[0][0] * 360  + videoEnd[0][1] * 60 + videoEnd[0][2] :
                         0} value={progressTime} 
                    onClick = {progressClick}></progress>
                    <span className={styArch.demo}>
                        {hour.toString().padStart(2, '0')}:
                        {minute.toString().padStart(2, '0')}:
                        {second.toString().padStart(2, '0')}
                    </span>
                    <span className={styArch.videoEnd}>
                        {videoEnd.length > 0  ?
                        videoEnd[0][0].toString().padStart(2, '0') +
                        ":" + videoEnd[0][1].toString().padStart(2, '0') + 
                        ":" + videoEnd[0][2].toString().padStart(2, '0'): "00:00:00"}
                    </span>
                    
                    
                </div>
                 {/* ========================== инструменты ======================== */}
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