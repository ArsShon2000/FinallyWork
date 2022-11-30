import React from "react";
import { NavLink } from "react-router-dom";
import sty from "./Navbar.module.css"
import axios from "axios";
import { useState } from 'react';


const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://127.0.0.1:5000',
})


const Navbar = () => {

    const [loginList, setLoginList] = useState([]);

    //   useEffect(() => {
    //     instance.get(`/login`).then((res) => {
    //         setLoginList(res.data.login);
    //     })
    // }, []);

    let logOut = () => {
        let bool = 1
        instance.delete(`/login/${bool}`).then((res) => {
            setLoginList(loginList.filter((e) => {
                return e.name !== bool
            }))
            console.log(res + " name is deleted in loginList");

        })
        Location.reload()
    }


    return (
        <nav className={sty.nav}>
            <div className={sty.button_np}>
                <NavLink to="/camera/" className={({ isActive }) =>
                    isActive ? sty.active : undefined}>Просмотр</NavLink>
            </div>
            <div className={sty.button_na}>
                <NavLink to="/archive/" className={({ isActive }) =>
                    isActive ? sty.active : undefined}>Архив</NavLink>
            </div>
            <div className={sty.button_nw}>
                <NavLink to="/wlist/" className={({ isActive }) =>
                    isActive ? sty.active : undefined}>Список водителей</NavLink>
            </div>
            <div className={sty.button_nw}>
                <NavLink to="/list/" className={({ isActive }) =>
                    isActive ? sty.active : undefined}>Список водителей</NavLink>
            </div>
            {/* <div className={sty.button_nb}>
                <NavLink to="/blist/" className={({ isActive }) =>
                    isActive ? sty.active : undefined}>Черный список</NavLink>
            </div> */}
            <div className={sty.button_nl}>
                <NavLink to="/log/" className={({ isActive }) =>
                    isActive ? sty.active : undefined}>Log</NavLink>
            </div>
            <div className={sty.button_no}>
                <NavLink to="/options/" className={({ isActive }) =>
                    isActive ? sty.active : undefined}>Настройки</NavLink>
            </div>
            <div className={sty.button_nv}>
                <NavLink to="/" onClick={logOut}>Выход</NavLink>
            </div>
        </nav>
    )
}


export default Navbar