import React, { useState } from "react";
import OptionNavbar from "./optionNavbar/OptionNavbar";
import opStyle from "./Options.module.css"
import { Outlet, Route, Routes } from 'react-router-dom';
import CamerasOptions from "./parameterList/CamerasOptions";
import Network from "./parameterList/Network";


const Options = () => {
    return (
        <div className={opStyle.options}>
            <div className={opStyle.navbarOptions}>
                <OptionNavbar />
            </div>
            <div className={opStyle.pageOptions}>
                <Outlet></Outlet>
            </div>            
        </div>
    )
}
export default Options