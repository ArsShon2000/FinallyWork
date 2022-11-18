import React, { useState } from "react";
import ParamNavStyle from "./ParameterNavbar.module.css";


const ImportOptions = () => {

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
        <div className={ParamNavStyle.cam}>ImportOptions</div>
    )
};

export default ImportOptions;