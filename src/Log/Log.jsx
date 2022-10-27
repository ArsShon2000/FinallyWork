import React, { useState, useEffect } from "react";
import stylab from "./Log.module.css"
import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:5000',
})




const Log = (props) => {
    const [log, setLog] = useState([]);
    useEffect(() => {
        instance.get('/logFile').then((res) => {
            setLog(res.data.log);
        })
    }, []);
    

    return (
        <div className={stylab.lab}>
            {log}
        </div>
    )
}

export default Log