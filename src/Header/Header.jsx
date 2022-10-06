import React from "react";
import sty from "./Header.module.css"
import logo from "./logo.png"


const Header = (props) => {
    return (
    <header className={sty.header}>
        <div className={sty.logo}><img src={logo} alt="logo" /></div>
        <div className={sty.loginBlock}>
            {/* <NavLink to={'/login'}>LogIn</NavLink> */}
        </div>
    </header>
    )
}

export default Header