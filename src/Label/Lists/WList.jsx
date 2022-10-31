import React, { useEffect, useState } from "react";
import List from "../List/List";
import stylab from "./WList.module.css"
import axios from "axios";
import Modal from "./Modal/Modal";



const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:5000',
})
let render = 0

const WList = (props) => {
//   console.warn("wlist запрос " + ++render)

    // instance.post('/create-db-wn', () => {})
    // instance.post('/create-db-wn2', () => {}) 
    // instance.post('/create-db-w', () => {}) 

// опеределяет в какой странице происходит действие
    const determinant = "white"
    
    // модальное окно
    const [modalActive, setModalActive] = useState(false)

    // связано с данными
    const [title, setTitle] = useState(''); // номер машины
    const [titleName, setTitleName] = useState(''); //имя владельца
    // const [titleForDel, setTitleForDel] = useState(''); 
    const [jobTitle, setJobTitle] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [whiteList, setWhiteList] = useState([]); // список из БД
    
    useEffect(() => {
        instance.get(`/wNum`).then((res) => {
            setWhiteList(res.data.wNum);
            console.warn("Get запрос " + ++render)
        })
    }, []);


    // let idName = whiteNameList2.length + 1
    let onAddName = () => {

        if((7 < title.length) && (10 > title.length) ) // проверяю длину номера
        {
            if (titleName !== '') {
                instance.post('/wNames2', {
                    name: titleName
                })
            }

            //добавление номеров в вайтлистнам
            if (title !== '' && titleName !== '') {
                instance.post('/wNum', {
                    carNumber: title,
                    name: titleName,
                    workPosition: jobTitle,
                    telNumber: phoneNumber
                }).then((res) => {
                    setWhiteList([...whiteList, { 
                        name: titleName, 
                        car_number: title, 
                        workPosition: jobTitle,
                        telNumber: phoneNumber }])
                    console.log(res + "data is added in whitelist");
                })
            }
            // window.location.reload()
        }
        else {
            alert("Неправильный формат номера!")
        }
        
    }
    
    // удаление по номеру
    // let onDelName = () => {
    //     instance.delete(`/wNum/cn/${titleForDel}`).then((res) => {
    //         setWhiteList(whiteList.filter((e) => {
    //             console.log(e.car_number + "-----------------------------------")
    //             return e.car_number !== titleForDel
    //         }))
    //         console.log(titleForDel + "data is deleted in whitelist");
    //     })
    // }

    // получаем все айди номера из вайтлиста 
    let namesNoSort = []
    for (let i = 0; i < whiteList.length; i++) {
        namesNoSort[i] = whiteList[i].id_name
    }

    // избавляемся от дулирования
    function unique(arr) {
        let result = [];

        for (let str of arr) {
            if (!result.includes(str)) {
                result.push(str);
            }
        }
        return result;
    }
// отсорированные айдишки
    unique(namesNoSort);

// по айди получаем имена водителей
    let names = []
    for (let i = 0; i < unique(namesNoSort).length; i++) {
        for (let j = 0; j < whiteList.length; j++) {
            if (unique(namesNoSort)[i] === whiteList[j].id_name) {
                names[i] = whiteList[j].name
            }
        }
    }


    let finalWhiteList = unique(namesNoSort).map((idName, sortName) => ({
        idName, sortName: names[sortName]
    }))
    console.log(finalWhiteList)
    let nameListLength = finalWhiteList.length
    

    

    return <div className={stylab.white}>
            <button className={stylab.open_btn} onClick={() => setModalActive(true)}>Добавить</button>
            <button className={stylab.delete_btn} onClick={() => setModalActive(true)}>Удалить</button>

            <Modal active={modalActive} setActive={setModalActive}>
                <input className="type-2"
                    type="text"
                    value={titleName} onChange={(e) => setTitleName(e.currentTarget.value)}
                    placeholder="Владелец"
                />
                <input className="type-2"
                    type="text"
                    value={title} onChange={(e) => setTitle(e.currentTarget.value)}
                    placeholder="Номер машины"
                />
                <input className="type-2"
                    type="text"
                    value={jobTitle} onChange={(e) => setJobTitle(e.currentTarget.value)}
                    placeholder="Должность"
                />
                <input className="type-2"
                    type="text"
                    value={phoneNumber} onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                    placeholder="Номер телефона"
                />
                <button className="btn_add_dates" onClick={onAddName}>Добавить</button>
            </Modal>
            <div className={stylab.search}>
                <input className={stylab.type_2}
                    type="text" />
                <button className={stylab.search_btn}>Найти</button>
            </div>

            <br></br>
            <br></br>
            
            {/* <input
                type="text"
                value={title} onChange={(e) => setTitle(e.currentTarget.value)}
                placeholder="Номер машины"
            />
            <input
                type="text"
                value={titleName} onChange={(e) => setTitleName(e.currentTarget.value)}
                placeholder="Владелец"
            />
            <button onClick={onAddName}>Добавить</button>
        </div>
        <br></br>
        <div>
            <input
                type="text"
                value={titleForDel} onChange={(e) => setTitleForDel(e.currentTarget.value)}
                placeholder="Удалить машину"
            />
            <input
                type="text"
                value={titleOwner} onChange={(e) => setTitleOwner(e.currentTarget.value)}
                placeholder="Удалить владельца"
            />
            <button onClick={onDelName}>Удалить</button> */}
        <div className={stylab.names}>
            <div className={stylab.headlines}>
                <div className={stylab.name}>
                    <span>&nbsp;ФИО водителя</span>
                </div>
                <div className={stylab.carNumber}>
                    <span>&nbsp;Номер машины</span>
                </div>
                <div className={stylab.position}>
                    <span>&nbsp;Должность</span>
                </div>
                <div className={stylab.telNumber}>
                    <span>&nbsp;Номер телефона</span>
                </div>
            </div>
            <div className={stylab.nameTable} 
            // style={nameListLength > 10 ? { 'height': '230px', 'width': '211px', 'overflow-y': 'scroll', 'overflow-x': 'none', 'display': 'grid' } : {}}
            >
                {finalWhiteList.map((w) => {
                    return (
                        <List key = {w.idName}
                            determinant={determinant} //определитель черного и белого списка
                            names={w.sortName} 
                            id_name={w.idName} // айди номера отсортированных водителей
                            whiteList={whiteList} // данные из сервера
                            nameListLength={nameListLength} // длина списка
                        />
                    )
                })}
            </div>
        </div>        
    </div>
}

export default WList
