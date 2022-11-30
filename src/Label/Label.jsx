import React, { useEffect, useState } from "react";
import stylab from "./Label.module.css"
import { Outlet } from "react-router";
import LabelNavbar from "./LabelNavbar/LabelNavbar";


const Label = (props) => {
    return (
        <div className={stylab.lab} >
            <div className={stylab.navbarWhiteList}>
                <LabelNavbar />
            </div>
            <div className={stylab.pageWhiteList}>
                <Outlet></Outlet>
            </div>
        </div>
    )
}


export default Label