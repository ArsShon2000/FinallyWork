import React from "react";
import {  NavLink } from "react-router-dom";
import opNavStyle from "./OptionNavbar.module.css";


const OptionNavbar = () => {
    return (
        <nav className={opNavStyle.nav}>
            <div className={opNavStyle.don}>
                <NavLink to="/options/cameras" className={({ isActive }) =>
                    isActive ? opNavStyle.active : undefined}><span>Камеры</span></NavLink>
            </div>
            <div className={opNavStyle.don}>
                <NavLink to="/options/cameraParameters" className={({ isActive }) =>
                    isActive ? opNavStyle.active : undefined}><span>Настройка камер</span></NavLink>
            </div>
            {/* <div className={opNavStyle.don}>
                <NavLink to="/options/export" className={({ isActive }) =>
                    isActive ? opNavStyle.active : undefined}><span>Экспорт</span></NavLink>
            </div>
            <div className={opNavStyle.don}>
                <NavLink to="/options/import" className={({ isActive }) =>
                    isActive ? opNavStyle.active : undefined}><span>Импорт</span></NavLink>
            </div> */}
            <div className={opNavStyle.don}>
                <NavLink to="/options/safety" className={({ isActive }) =>
                    isActive ? opNavStyle.active : undefined}><span>Безопастность</span></NavLink>
            </div>
            {/* <div className={opNavStyle.don}>
                <NavLink to='/options/network' className={({ isActive }) =>
                    isActive ? opNavStyle.active : undefined}><span>Сеть</span></NavLink>
            </div> */}
        </nav>
    )
};

export default OptionNavbar;