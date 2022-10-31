import React, { useState } from "react";
import stylist from "./List.module.css"
import ListName from "./ListName";
import axios from "axios";
import ModalCarNumber from "./ModalCarNumber/ModalCarNumber";



const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://127.0.0.1:5000',
})
// let render = 0
const List = (props) => {
  // console.warn("list запрос " + ++render)


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
      {/* выводится имя */}
      <div className={stylist.divName} >
        <span>&nbsp;{props.names}</span>&nbsp;&nbsp;&nbsp;
      </div>

      <div className={stylist.divNumbers} onClick={() => ((changeSize === false  ? setChangeSize(true) : setChangeSize(false)))}>
        {/* <div style={{'text-align' : 'center'}}>{props.names}</div> */}
        <div className={stylist.divNumberRows} style={ changeSize === false 
        ? {'height' : '' } 
        : {'height' : 'fit-content', 'text-align' : 'center', 'padding' : '10px' }}>
            {props.whiteList.map((n) => { //тот же вайтлист из пропса
            return <ListName
              key={n.id}
              id_name={id_name} // idName из вайтлист
              number={n.car_number}
              wIdNAme={n.id_name} //idName из props.whiteList (id_name и wIdNAme проверяется на схожество)
            />
          })}
          
          <div style={ changeSize === false ? {'opacity' : '0', 'pointer-events': 'none'} : {'opacity' : '1', 'margin-top' : '10px'}} >
            <input onClick={e => e.stopPropagation()}           
             className="type-2CN"
            type="text"
            value={title} onChange={(e) => setTitle(e.currentTarget.value)}
            placeholder="Номер машины"/>
          </div>
          <div style={ changeSize === false ? {'opacity' : '0', 'pointer-events': 'none' } : {'opacity' : '1'}}>
            <button onClick={onAddName}
             className={stylist.btnForCN}>Добавить</button>&nbsp;
            <button onClick={onDelName} 
            className={stylist.btnForCN}>Удалить</button>
          </div>
        
          </div>


      </div>
      {/* <ModalCarNumber nameListLength={nameListLength} active={modalActive} setActive={setModalActive}> */}
        
      {/* </ModalCarNumber> */}
      <div className={stylist.position}>&nbsp;position {props.whiteList[0].workPosition}</div>
      <div className={stylist.telNumber}>&nbsp;telNumber {props.whiteList[0].telNumber}</div>
      {/* выводится номера  */}
    </div>
  )
}


export default List