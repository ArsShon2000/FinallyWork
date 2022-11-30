import React, { useEffect, useState } from "react";
import List from "../List/List";
import stylab from "./WList.module.css"
import axios from "axios";
import Modal from "./Modal/Modal";
import ModalForSearch from "./Search/ModalForSearch";



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
    // const [jobTitle, setJobTitle] = useState('')
    // const [phoneNumber, setPhoneNumber] = useState('')
    const [whiteList, setWhiteList] = useState([]); // список из БД
    const [titleForSearch, setTitleForSearch] = useState('')//поиск
    const [searchMode, setSearchMode] = useState(false)//поиск мод

    useEffect(() => {
        instance.get(`/wNum`).then((res) => {
            setWhiteList(res.data.wNum);
            console.warn("Get запрос " + ++render)
        })
    }, []);


    // let idName = whiteNameList2.length + 1
    let onAddName = () => {
        if ((7 < title.length) && (10 > title.length)) // проверяю длину номера
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
                    setWhiteList([...whiteList, {
                        name: titleName,
                        car_number: title
                    }])
                    console.log(res + "data is added in whitelist");
                })
            }
        }
        else {
            alert("Неправильный формат номера!")
        }
    }

    const onDriverSearch = () => { //сортировка списка по поиску
        if(titleForSearch === '' && searchMode === false){            
            alert("Введите имя!\a")
        }
        else if(searchMode === true)
        {
            setSearchMode(false)
            setTitleForSearch('')
        }
        else{
            setSearchMode(true)
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

    // поиск по водителям
    const driverElements = whiteList.map(search_ => 
        <ModalForSearch 
            key={search_.id} 
            titleForSearch={titleForSearch} 
            drivers={search_.name} 
            carNumber={search_.car_number}
            id_name = {search_.id_name}
        />
    )

    return <div className={stylab.white}>
        <div className={stylab.pageWhiteList}>
            <div className={stylab.btns}>
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
                    <button className="btn_add_dates" onClick={onAddName}>Добавить</button>
                </Modal>
                <div className={stylab.search}>
                    <input className={stylab.type_2}
                        type="text" 
                        value = {titleForSearch} onChange = {(e) => setTitleForSearch(e.currentTarget.value)}/>
                    {searchMode === false 
                    ?<button className={stylab.search_btn}
                    onClick = {onDriverSearch}>Найти</button>
                    :<button className={stylab.search_btn}
                    onClick = {onDriverSearch}>Сбросить</button>    }
                    
                      
                    <div className={stylab.search_abs}>
                        <div className={stylab.search_rel}>
                            {searchMode === false ? driverElements : '' }
                        </div>
                    </div>
                </div>
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
            {/*<div className={stylab.headlines}>         //заголовки
                <div className={stylab.name}>
                    <span>&nbsp;ФИО водителя</span>
                </div>
                <div className={stylab.carNumber}>
                    <span>&nbsp;Номер машины</span>
                </div>
                </div>
            </div> */}
            <div className={stylab.names}
                style={nameListLength > 25

                    ? { 'height': '1fr', 'width': '100%', 'overflow-y': 'scroll' }
                    : {}}>
                {searchMode === true
                    ? finalWhiteList.map((w) => {
                        if (titleForSearch === w.sortName) {
                            return (
                                <List key={w.idName}
                                    determinant={determinant} //определитель черного и белого списка
                                    names={w.sortName}
                                    id_name={w.idName} // айди номера отсортированных водителей
                                    whiteList={whiteList} // данные из сервера
                                    nameListLength={nameListLength} // длина списка
                                />
                            )
                        }
                    })
                    : finalWhiteList.map((w) => {
                        return (
                            <List key={w.idName}
                                determinant={determinant} //определитель черного и белого списка
                                names={w.sortName}
                                id_name={w.idName} // айди номера отсортированных водителей
                                whiteList={whiteList} // данные из сервера
                                nameListLength={nameListLength} // длина списка                            
                            />
                        )
                    })
                }
            </div>
        </div>

    </div>
}

export default WList
