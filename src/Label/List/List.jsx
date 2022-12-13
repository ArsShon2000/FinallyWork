import React, { useState } from "react";
import stylist from "./List.module.css"
import ListName from "./ListName";
import ModalCarNumber from "./ModalCarNumber/ModalCarNumber";
import personIcons from "../../Icons/person.png"
import axios from "axios";



const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://127.0.0.1:5000',
})
// let render = 0
const List = (props) => {
  // console.warn("list запрос " + ++render)
  let titleForSearch
  props.titleForSearch ? titleForSearch = props.titleForSearch : titleForSearch = ''
  
  let id_name = props.id_name
  // let whiteList = props.whiteList
  let nameListLength = props.nameListLength
  // модальное окно
  const [modalActive, setModalActive] = useState(false)

  let [title, setTitle] = useState('');
  let [whiteList, setWhiteList] = useState([]);
  let [changeSize, setChangeSize] = useState(false)



  // удаление имени из таб wNum
  const onDelName = () => {
    instance.delete(`/wNum/id/${id_name}`).then((res) => {
      setWhiteList(whiteList.filter((e) => {
        console.log(e.id_name + "-----------------------------------")
        return e.id_name !== id_name
      }))
      console.log(id_name + " owner is deleted in whiteNameList");
    })
  }
  const onAddName = () => {
    //добавление номеров в вайтлистнам
    if (props.determinant === "white") {
      if (title !== '') {
        instance.post('/wNumWithId', {
          carNumber: title,
          name: props.names,
          id_name: id_name
        }).then((res) => {
          setWhiteList([...props.whiteList, { car_number: title, name: props.names, id_name: id_name }])
          setTitle('')
          console.log(res + "Name is added");
        })
      }
    }
    //добавление номеров в blackлистнам
    if (props.determinant === "black") {
      if (title !== '') {
        instance.post('/bNum', {
          carNumber: title,
          name: props.names,
          id_name: id_name
        }).then((res) => {
          setWhiteList([...whiteList, { car_number: title, name: props.names, id_name: id_name }])
          setTitle('')
          console.log(res + "Name is added");
        })
      }
    }
  }


  return (
    <div className={stylist.name}  >
      <div className={stylist.divName} onClick={() => (
        (changeSize === false  //если скписок расскрыть то при клике закрывается и наоборот
          ? setChangeSize(true)
          : setChangeSize(false)))}
        style={changeSize === false // если changeSize тру то список расскрывается
          ? { 'height': '' }
          : { 'height': 'fit-content', 'padding': '10px', 'background-color': '#7f7f7f'  }}>
        <span>&nbsp;<img src={personIcons} alt="onStopClick" />&nbsp;{props.names}</span>&nbsp;&nbsp;&nbsp; {/* выводится имя */}


        <div className={stylist.divNumbers} style={changeSize === false // если changeSize тру то список становится видимым
          ? { 'opacity': '0',
           'pointer-events': 'none' }
          : { 'opacity': '1','justifySelf': 'center',  'margin-top': '10px'  }}>
          {/* <div style={{'text-align' : 'center'}}>{props.names}</div> */}
          <div className={stylist.divNumberRows} >
            {props.whiteList.map((n) => { //тот же вайтлист из пропса
              return <ListName
                key={n.id}
                id_name={id_name} // idName из вайтлист
                number={n.car_number}
                wIdNAme={n.id_name} //idName из props.whiteList (id_name и wIdNAme проверяется на схожество)
              />
            })}
          </div>
          <div className={stylist.functions}>
            <div>
              <input onClick={e => e.stopPropagation()}
                className="type_2"
                type="text"
                value={title} onChange={(e) => setTitle(e.currentTarget.value)}
                placeholder="Номер машины" />
            </div>
            <div style={changeSize === false ? { 'opacity': '0', 'pointer-events': 'none' } : { 'opacity': '1' }}>
              <button onClick={onAddName}
                className={stylist.btnForCN}>Добавить</button>&nbsp;
              <button onClick={onDelName}
                className={stylist.btnForCN}>Удалить</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* <ModalCarNumber nameListLength={nameListLength} active={modalActive} setActive={setModalActive}> */}

      {/* </ModalCarNumber> */}
      {/* выводится номера  */}
    </div>
  )
}


export default List