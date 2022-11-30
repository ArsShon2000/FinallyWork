
import React, { useState } from "react";
import stySearch from "./ModalForSearch.module.css"
import personIcons from "../../../Icons/person.png"
import plusIcon from "../../../Icons/plus.png"
import delIcon from "../../../Icons/del.png"
import Modal from "../Modal/Modal";
import axios from "axios";


const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://127.0.0.1:5000',
})

const ModalForSearch = (props) => {  // поиск по водителям

 
  const [modalActive, setModalActive] = useState(false) // модальное окно
  const [title, setTitle] = useState(''); // номер машины
  const [whiteList, setWhiteList] = useState([]); // список из БД


  //=========================================VARS=========================================
  let titleForSearch = props.titleForSearch //текст из инпута
  let drivers = props.drivers // список водителей из вайтлист
  let id_name = props.id_name
  //=========================================VARS=========================================


  //=========================================FUNCTIONS=========================================
  const onAddName = () => { //добавление номеров в вайтлистнам    
      if (title !== '') {
        instance.post('/wNumWithId', {
          carNumber: title,
          name: titleForSearch,
          id_name: id_name
        }).then((res) => {
          setWhiteList([...props.whiteList, { car_number: title, name: titleForSearch, id_name: id_name }])
          setTitle('')
          console.log(res + "Name is added");
        })
      }
    }
    
  const onDelName = () => { // удаление имени из таб wNum
    instance.delete(`/wNum/id/${id_name}`).then((res) => {
      setWhiteList(whiteList.filter((e) => {
        console.log(e.id_name + "-----------------------------------")
        return e.id_name !== id_name
      }))
      console.log(id_name, " owner is deleted in whiteNameList");
    })
  }
  //=========================================FUNCTIONS=========================================


  if (drivers === titleForSearch) {
    return (
      <div className={stySearch.search}>
        <div className={stySearch.personIcons}>
          <img src={personIcons} alt="personIcons" />
        </div>
        <div className={stySearch.name}>
          {titleForSearch}
        </div>
        <div className={stySearch.carNum}>
          {props.carNumber}
        </div>
        <div className={stySearch.plusIcon}
          onClick={() => setModalActive(true)}
        >
          <img src={plusIcon} alt="plusIcon" />
        </div>
        <div className={stySearch.crossIcon}
          onClick={onDelName}
        >
          <img src={delIcon} alt="delIcon" /> &nbsp;
        </div>
         <Modal active={modalActive} setActive={setModalActive}> {/*всплывающее окно для добавления  */}
          <div style={{'text-align' : 'center'}}>
            {titleForSearch}
          </div>
          <input className="type-2"
            type="text"
            value={title} onChange={(e) => setTitle(e.currentTarget.value)}
            placeholder="Номер машины"
          />
          <button className="btn_add_dates" onClick={onAddName}>Добавить</button>
        </Modal>
      </div>
    )
  }
}


export default ModalForSearch