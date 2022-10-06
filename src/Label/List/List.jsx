import React, { useState } from "react";
import stylist from "./List.module.css"
import ListName from "./ListName";
import axios from "axios";
import ModalCarNumber from "./ModalCarNumber/ModalCarNumber";



const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://127.0.0.1:5000',
})


const List = (props) => {

  let id_name = props.id_name
  // let whiteList = props.whiteList
  let nameListLength = props.nameListLength
    // модальное окно
    const [modalActive, setModalActive] = useState(false)

  let [title, setTitle] = useState('');
  const [whiteList, setWhiteList] = useState([]);
  


  // удаление имени из таб wNum
  let onDelName = () => {
    instance.delete(`/wNum/id/${id_name}`).then((res) => {
      setWhiteList(whiteList.filter((e) => {
        console.log(e.id_name + "-----------------------------------")
        return e.id_name !== id_name
      }))
      console.log(id_name + " owner is deleted in whiteNameList");
    })
  }
  let onAddName = () => {
    //добавление номеров в вайтлистнам
    if (props.determinant === "white") {
      if (title !== '') {
        instance.post('/wNumWithId', {
          carNumber: title,
          name: props.names,
          id_name: props.id_name
        }).then((res) => {
          setWhiteList([...whiteList, { car_number: title, name: props.names, id_name: props.id_name }])
          title = ''
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
          id_name: props.id_name
        }).then((res) => {
          setWhiteList([...whiteList, { car_number: title, name: props.names, id_name: props.id_name }])
          title = ''
          console.log(res + "Name is added");
        })
      }
    }
  }

  
  return (
    <div className={stylist.name}  >
      {/* выводится имя */}
      <div className={stylist.divName} >
        <table  className={stylist.maintable}>
          <table  className={stylist.table}>
                <th className={stylist.th} >
                  <input type="checkbox"></input>
                  <button onClick={() => setModalActive(true)}>&nbsp;{props.names}</button>&nbsp;&nbsp;&nbsp;
                  </th>
          </table>
        </table>
      </div>
      <div className={stylist.divNumbers}>
        
        <ModalCarNumber nameListLength={nameListLength} active={modalActive} setActive={setModalActive}>

          <div style={{'text-align' : 'center'}}>{props.names}</div>
          {props.whiteList.map((n) => {
            return <ListName onChange
             id_name={id_name}
              number={n.car_number}
              wIdNAme={n.id_name}
            />
          })}
          <br></br>
          <input className="type-2CN"
            type="text"
            value={title} onChange={(e) => setTitle(e.currentTarget.value)}
            placeholder="Номер машины"
          /><br></br>
          <button className="btnForCN" onClick={onAddName}>Добавить</button>&nbsp;
          <button className="btnForCN" onClick={onDelName}>Удалить</button>
          <br></br>

        </ModalCarNumber>

      </div>

      {/* выводится номера  */}



    </div>
  )
}


export default List