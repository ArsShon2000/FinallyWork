import React, { useEffect, useState } from "react";
import List from "../List/List";
import stylab from "./WList.module.css"
import axios from "axios";
import Modal from "./Modal/Modal";



const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:5000',
})

const WList = (props) => {
    // instance.post('/create-db-wn', () => {})
    // instance.post('/create-db-wn2', () => {}) 
    // instance.post('/create-db-w', () => {}) 

// опеределяет в какой странице происходит действие
    let determinant = "white"
    
    // модальное окно
    const [modalActive, setModalActive] = useState(false)

    // связано с данными
    let [title, setTitle] = useState('');
    let [titleName, setTitleName] = useState('');
    let [titleForDel, setTitleForDel] = useState('');
    const [whiteList, setWhiteList] = useState([]);

    useEffect(() => {
        instance.get(`/wNum`).then((res) => {
            setWhiteList(res.data.wNum);
        })
    }, []);

    // let idName = whiteNameList2.length + 1
    let onAddName = () => {
        console.log(7 < title.length)
        console.log(10 > title.length)

        if((7 < title.length) && (10 > title.length) )
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
                    name: titleName
                }).then((res) => {
                    setWhiteList([...whiteList, { name: titleName, car_number: title }])
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
    let onDelName = () => {
        instance.delete(`/wNum/cn/${titleForDel}`).then((res) => {
            setWhiteList(whiteList.filter((e) => {
                console.log(e.car_number + "-----------------------------------")
                return e.car_number !== titleForDel
            }))
            console.log(titleForDel + "data is deleted in whitelist");
        })
    }

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

    let nameListLength = finalWhiteList.length
    

    

    return <div className={stylab.white}>
        <div>
            <button className={stylab.open_btn} onClick={() => setModalActive(true)}>Добавить</button>
            <button className={stylab.open_btn} onClick={() => setModalActive(true)}>Удалить</button>

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
                <button className="btn_add_dates" onClick={onAddName}>Добавить</button>
            </Modal>

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
        </div>
        <div className={stylab.names}>
            <div style={nameListLength > 10 ? { 'height': '230px', 'width': '211px', 'overflow-y': 'scroll', 'overflow-x': 'none', 'display': 'grid' } : {}}>
                {finalWhiteList.map((w) => {
                    return (
                        <List determinant={determinant}
                            names={w.sortName}
                            id_name={w.idName}
                            whiteList={whiteList}
                            nameListLength={nameListLength}
                        />
                    )
                })}
            </div>
        </div>
        <div style={nameListLength <= 10 ? { "margin-left": "200px" } : {"margin-left": "220px"}} className={stylab.numbArea}>
        </div>
        
    </div>
}

export default WList
