import React, { useState } from "react";
import SafetyStyle from "./SafetyOptions.module.css";
import personIcons from "../../../Icons/person.png"
import cameraStatusOn from '../../../Icons/cameraStatusOn.png'
import cameraStatusOff from '../../../Icons/cameraStatusOff.png'


const SafetyOptions = (props) => {

    let [changeSize, setChangeSize] = useState(false)
    let [title, setTitle] = useState('admin');
    let [whiteList, setWhiteList] = useState([]);

    const onAddName = () => {
        if (title !== '') {
        }
    }

    let inputType = "password"


    return (
        <div className={SafetyStyle.main}>
            <div className={SafetyStyle.header}>
                <div className={SafetyStyle.pageTitle}>
                    <span>Hастройка пользователей</span>
                </div>
                <div className={SafetyStyle.addUserButton}>
                    <button>Добавить новых пользователей</button>
                </div>
            </div>
            <div className={SafetyStyle.content} onClick={() => (
                    (changeSize === true ? setChangeSize(false) : ''))}> { /*если скписок расскрыть то при клике закрывается и наоборот*/}
                <div className={SafetyStyle.divName} onClick={(e) => (
                    (changeSize === false  //если скписок расскрыть то при клике закрывается и наоборот
                        ? setChangeSize(true)
                        : '')
                        )}
                    style={changeSize === false // если changeSize тру то список расскрывается
                        ? { 'height': '' }
                        : { 'height': 'fit-content', 'padding': '10px', 'backgroundColor': '#7f7f7f', 'color' : 'rgb(31, 32, 41)'}}>
                    <span>&nbsp;<img src={personIcons} alt="onStopClick" />&nbsp;Костик</span>&nbsp;&nbsp;&nbsp; {/* выводится имя */}
                    
                    <div className={SafetyStyle.divUserDates} style={changeSize === false // если changeSize тру то список становится видимым
                        ? {
                            'opacity': '0',
                            'pointer-events': 'none'
                        }
                        : { 'opacity': '1', 'justifySelf': 'center', 'marginTop': '10px' }}>

                        <div className={SafetyStyle.functions}>
                                <input onClick={e => e.stopPropagation()}
                                    className={SafetyStyle.type_2}
                                    type={inputType}
                                    value={title} onChange={(e) => setTitle(e.currentTarget.value)}
                                    placeholder="Password" /> &nbsp;

                                <img className={SafetyStyle.cameraStatusOn} src={cameraStatusOn}
                                    alt="cameraStatusOn"  // глазок
                                 onClick={e => e.stopPropagation()} title="Показать пароль" />

                                <div className={SafetyStyle.choiceLaw} onClick={e => e.stopPropagation()}>
                                    <select>
                                        <option>Администратор</option>
                                        <option>Модератор</option>
                                        <option>Пользователь</option>
                                    </select>
                                </div>
                            <div className={SafetyStyle.btnForCN} style={changeSize === false ? { 'opacity': '0', 'pointer-events': 'none' } : { 'opacity': '1' }}>
                                <button onClick={onAddName}
                                    >Изменить</button>&nbsp;
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
};

export default SafetyOptions;