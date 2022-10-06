import React, { useEffect, useState } from "react";
import List from "../List/List";
import stylab from "./BList.module.css"
import axios from "axios";
import Modal from "./Modal/Modal";



const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:5000',
})

const BList = (props) => {
 

  

    // instance.post('/create-db-bn2', () => {}) 
    // instance.post('/create-db-b', () => {}) 

// опеределяет в какой странице происходит действие
    let determinant = "black"

    // модальное окно
    const [modalActive, setModalActive] = useState(false)

    let [title, setTitle] = useState('');
    let [titleName, setTitleName] = useState('');
    let [titleForDel, setTitleForDel] = useState('');
    const [blackList, setBlackList] = useState([]);

    useEffect(() => {
        instance.get('/bNum').then((res) => {
            setBlackList(res.data.bNum);
        })
    }, []);


    let onAddName2 = () => {
        if ((7 < title.length) && (10 > title.length)) {
            //добавление имен в blacklistname
            if (titleName !== '') {
                instance.post('/bNames2', {
                    name: titleName
                })
            }

            //добавление номеров в blacklistnum
            if (title !== '' && titleName !== '') {
                instance.post('/bNum', {
                    carNumber: title,
                    name: titleName
                }).then((res) => {
                    setBlackList([...blackList, { car_number: title, name: titleName }])
                    title = ''
                    titleName = ''
                    console.log(res + "data is added in blacklist")
                })
            }

        }
        else {
            alert("Неправильный формат номера!")
        }
    }

    // удаление по владельцу
    let onDelName = () => {
        //     if (titleOwner !== '') {
        //         instance.delete(`/bNames/${titleOwner}`).then((res) => {
        //             setBlackNameList(blackNameList.filter((e) => {
        //                 return e.name !== titleOwner
        //             }))
        //             console.log(res + "name is deleted in blacklist");
        //         })
        //     }

        //удаление по номеру
        instance.delete(`/bNum/cn/${titleForDel}`).then((res) => {
            setBlackList(blackList.filter((e) => {
                return e.car_number !== titleForDel
            }))
            console.log(res + "data is deleted in blacklist");
        })
    }

    // получаем все айди номера из вайтлиста 
    let namesNoSort = []
    for (let i = 0; i < blackList.length; i++) {
        namesNoSort[i] = blackList[i].id_name
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
        for (let j = 0; j < blackList.length; j++) {
            if (unique(namesNoSort)[i] === blackList[j].id_name) {
                names[i] = blackList[j].name
            }
        }
    }

    let finalWhiteList = unique(namesNoSort).map((idName, sortName) => ({
        idName, sortName: names[sortName]
    }))


   
    return <div className={stylab.black}>
        {/* <span>Blacklist</span> */}
        <div>
            <button className={stylab.open_btn} onClick={() => setModalActive(true)}>Добавить</button>
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
                <button className="btn_add_dates" onClick={onAddName2}>Добавить</button>
            </Modal>

            <br></br>
            <br></br>
        </div>

        <div className={stylab.names}>
            <div>
                <div style={finalWhiteList.length > 10 ? { 'height': '230px', 'width': '210px', 'overflow-y': 'scroll', 'overflow-x': '', 'display': 'grid' } : {}}>
                    {finalWhiteList.map((b) => {
                        return (
                            <List determinant={determinant}
                                names={b.sortName}
                                id_name={b.idName}

                                // отправляю в мап второй список (полный)
                                whiteList={blackList} />
                        )
                    })}
                </div>
            </div>
        </div>
        <div className={stylab.numbArea}>
        </div>
    </div>
}

export default BList
