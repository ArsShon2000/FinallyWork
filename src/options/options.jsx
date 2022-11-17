import React, { useState } from "react";
import OptionNavbar from "./optionNavbar/OptionNavbar";
import opStyle from "./Options.module.css"
import { Outlet, Route, Routes } from 'react-router-dom';
import Cameras from "./parameterList/Cameras";
import Network from "./parameterList/Network";


const Options = () => {
    return (
        <div className={opStyle.options}>
            <div className={opStyle.navbarOptions}>
                <OptionNavbar />
            </div>
            <div className={opStyle.pageOptions}>
                <Outlet></Outlet>
                {/* <Routes>
                    <Route path="/" element={<Cameras />} />
                    <Route path='/options/cameras' element={<div>satrt</div>} />
                    <Route path='/options/network' render={() => <Network />} />
                </Routes>                 */}
            </div>            
        </div>
    )
}
export default Options