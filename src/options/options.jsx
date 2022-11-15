import React, { useState } from "react";
import opStyle from "./Options.module.css"

const Options = () => {




    let butName = 'Соеденить'

    let [Ip, setIp] = useState('');
    let [Port, setPort] = useState('');

    let onConnect = () => {
        alert('Error 404')
        
    }

    let onTap = () => {
        butName = 'Разъеденить'
    } 


    return (
        <div className={opStyle.options}>
            <div className={opStyle.navbarOptions}>
                <span>Камеры</span><br></br>
                <span>Настройка камер</span><br></br>
                <span>Экспорт </span><br></br>
                <span>Импорт</span><br></br>
                <span>Безопастность</span><br></br>
                <span>Сеть</span><br></br>
            </div>
            <div className={opStyle.pageOptions}>
                <input
                    type="text"
                    value={Ip} onChange={(e) => setIp(e.currentTarget.value)}
                    placeholder={"IP"} />
                <input
                    type="text"
                    value={Port} onChange={(e) => setPort(e.currentTarget.value)}
                    placeholder={"Port"} />
            <button onClick={onConnect} onChange={onTap} >{butName}</button>
            </div>            
        </div>
        
    )
}

export default Options