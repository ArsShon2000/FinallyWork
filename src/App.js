import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header/Header'
import VideoBar from './Videobar/VideoBar.jsx'
import GenCarNumber from './GenCarNum/GenCarNumber';
import Login from './Login/Login';
import Navbar from './Navbar/Navbar';
import WList from './Label/Lists/WList';
import BList from './Label/Lists/BList';
import Options from './options/Options';
// import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
import Archive from './Archive/Archive';
import Log from './Log/Log';
import Network from './options/parameterList/Network';


// let render = 0

// const instance = axios.create({
//   withCredentials: true,
//   baseURL: 'http://127.0.0.1:5000',
// })

let App = () => {
  // console.warn("app запрос " + ++render)

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  let [Cameras, setCameras] = useState([])
  const [loginList, setLoginList] = useState([]);

  let bool
  if (loginList.login) {
    bool = loginList.login.length
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/Cameras`)
      .then(res => res.json())
      .then((result) => {
        setIsLoaded(true);
        setCameras(result);
      },
        (error) => {
          setIsLoaded(true);
          setError(error);
        })
    fetch(`http://127.0.0.1:5000/login`)
      .then(res => res.json())
      .then((result) => {
        if (bool !== 1) {
          setLoginList(result);
          console.log("From app")
        }
      })

  }, [])

  console.log(loginList)

  const refresh = () => {
    return
  }


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {

    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path='/camera' element={<VideoBar Cameras={Cameras} />} />
            <Route path='/' element={<VideoBar Cameras={Cameras} />} />
          </Routes>
          {/* <VideoBar /> */}
          {bool !== 1 ? <Login /> :
            <Navbar />}
          <div className="App-wrapper-content ">
            {bool !== 1 ? refresh() : <Routes>
              {/* <Route path='/camera/' element={<VideoBar />} /> */}
              <Route path='/camera' element={<GenCarNumber />} />
              <Route path='/' element={<GenCarNumber />} />
              <Route path='/archive' element={<Archive />} />
              <Route path='/wlist' element={<WList />} />
              <Route path='/blist' element={<BList />} />
              <Route path='/log' element={<Log />} />
              <Route path='options' element={<Options />} >
                <Route path='cameras' element={<div>satrt</div>} />
                <Route path='network' element={<Network />} />
              </Route>
              {/* <Route path='/login' element={<Login />} /> */}
            </Routes>
            }
          </div>
        </div>
      </BrowserRouter>
    );
  }
}



export default App;