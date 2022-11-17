import React, { useState } from "react";
import ParamNavStyle from "./ParameterNavbar.module.css";


const Network = () => {

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
        <div className={ParamNavStyle.Network}>
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
    )
};

export default Network;