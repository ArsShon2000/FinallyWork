import React, { useState, useEffect } from "react";
import stylab from "./Log.module.css"
import axios from "axios";
import Calendar from 'react-calendar';


const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:5000',
})

let render = 0;

const Log = (props) => {
    const [value, onChange] = useState(new Date()); //default
    const [yearMonthDay, setYearMonthDay] = useState({}); //получаем год месяц и день
    const [isLoaded, setIsLoaded] = useState(false); // загружечная страница
    const [error, setError] = useState(null);



    const [log, setLog] = useState([]);
    console.warn(`Log render: ${++render}`);
    useEffect(() => {
        instance.get('/logFile').then((res) => {
            setLog(res.data.log);
        })
        fetch(`http://127.0.0.1:5000/archiveList`)
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true);
                setYearMonthDay([result.setYear, result.setMonth, result.setDay]) // получаем даты установленной папки
            },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                })
    }, []);

    const dateValue: Date = new Date(yearMonthDay[0], yearMonthDay[1] - 1, yearMonthDay[2]) // установка активной даты
    console.log(dateValue)
    console.log(value)
    const onClickDay = (value, event) => {
        yearMonthDay[2] = value.getYear() + 1900 // год начинается с 122
        yearMonthDay[1] = value.getMonth() + 1 // месяц начинается с 0
        yearMonthDay[0] = value.getDate()
    }

    debugger
    return (
        <div className={stylab.MainLab}>
            <div className={stylab.NavbarLog}>
                <div className={stylab.calendar}>

                    <Calendar 
                    onChange={onChange} 
                    // value={dateValue}//календарь //ддммгг передается в вэлию
                        onClickDay={(value, event) => onClickDay(value, event)} // получаем дату в качестве аргумента
                        isMultiSelection={false} /*выбрать диапазон*/
                    />
                    <div>Логи с {yearMonthDay[2]}-{yearMonthDay[1]}-{yearMonthDay[0]}</div> {/* день месяц год*/}                    
                </div>
            </div>
            <div className={stylab.Log}>{log}</div>

        </div>
    )
}

export default Log