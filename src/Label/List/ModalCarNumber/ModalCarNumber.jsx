import React from "react";
// import mcn from "./ModalCarNumber.module.css"
import "./ModalCarNumber.css"


const ModalCarNumber = ({ nameListLength, active, setActive, children }) => {

    return (<div>
        {/* //Список */}
        <div className={active ? "modalDates active" : "modalDates"} onClick={() => setActive(false)}>
            {/* //Контентная часть */}
            <div className={active ? "modalDates__content active" : "modalDates__content"} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
        
        </div>
    )
}

export default ModalCarNumber