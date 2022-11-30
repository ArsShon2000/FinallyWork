import React from "react";
import {  NavLink } from "react-router-dom";
import opNavStyle from "./LabelNavbar.module.css";


const LabelNavbar = () => {
    return (
        <nav className={opNavStyle.nav}>
            <div className={opNavStyle.don}>
                <NavLink to="/list/wlist" className={({ isActive }) =>
                    isActive ? opNavStyle.active : undefined}><span>Белый список</span></NavLink>
            </div>
            <div className={opNavStyle.don}>
                <NavLink to="/list/blist" className={({ isActive }) =>
                    isActive ? opNavStyle.active : undefined}><span>Черный список</span></NavLink>
            </div>
            
        </nav>
    )
};

export default LabelNavbar;