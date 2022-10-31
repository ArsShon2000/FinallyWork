import React from "react";
import "./ModalMultiVideoBar.css"
// import mod from "./modal.module.css"
import cancel from '../../../Icons/delete.png'

const ModalMultiVideoBar = ({active, setActive, children}) => {


    return(
        <div className={active ? "modalMultiVideoBar active" : "modalMultiVideoBar"} onClick={() => setActive(false)}>
            <img src={cancel} alt="cancel"/>
            <div className={active ? "modalMultiVideoBar__content active" : "modalMultiVideoBar__content"} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default ModalMultiVideoBar