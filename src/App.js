import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header/Header'
import VideoBar from './Videobar/VideoBar.jsx'
import GenCarNumber from './GenCarNum/GenCarNumber';
import Login from './Login/Login';
import Navbar from './Navbar/Navbar';
import WList from './Label/WBLists/WList';
import BList from './Label/WBLists/BList';
import Options from './options/Options';
import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
import Archive from './Archive/Archive';
import Log from './Log/Log';
import Network from './options/parameterList/Network';
import CamerasOptions from './options/parameterList/CamerasOptions';
import CameraParameters from './options/parameterList/CameraParameters';
import ExportOptions from './options/parameterList/ExportOptions';
import ImportOptions from './options/parameterList/ImportOptions';
import SafetyOptions from './options/parameterList/SafetyOptions';
import Label from './Label/Label';


// let render = 0

const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://127.0.0.1:5000',
})

let App = () => {
  // console.warn("app запрос " + ++render)

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  let [Cameras, setCameras] = useState([])
  const [loginList, setLoginList] = useState([]);
  //  ======================== get car number from DB ======================== 
  const [genNum, setGenNum] = useState([]);


  let bool
  if (loginList.login) {
    bool = loginList.login.length
  }

  useEffect(() => {
    instance.get('/genNum').then((res) => {
      setGenNum(res.data.numbers);
    })
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

    console.log(genNum)
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path='/camera' element={<VideoBar Cameras={Cameras} genNum={genNum}/>} />
            <Route path='/' element={<VideoBar Cameras={Cameras} genNum={genNum}/>}/>
          </Routes>
          {/* <VideoBar /> */}
          {bool !== 1 ? <Login /> :
            <Navbar />}
          <div className="App-wrapper-content ">
            {bool !== 1 ? refresh() : <Routes>
              {/* <Route path='/camera/' element={<VideoBar />} /> */}
              {/* <Route path='/camera' element={<GenCarNumber genNum={genNum}/>} />
              <Route path='/' element={<GenCarNumber genNum={genNum}/>} /> */}
                <Route path='/archive' element={ 
                  <React.StrictMode>
                    <Archive />
                  </React.StrictMode>
                } />
              <Route path='/list' element={<Label />} >
                <Route path='wlist' element={<WList />} />
                <Route path='blist' element={<BList/>} />
              </Route>
              <Route path='/blist' element={<BList />} />
              <Route path='/log' element={<Log />} />
              <Route path='options' element={<Options />} >
                <Route path='cameras' element={<CamerasOptions />} />
                <Route path='cameraParameters' element={<CameraParameters/>} />
                <Route path='export' element={<ExportOptions />} />
                <Route path='import' element={<ImportOptions />} />
                <Route path='safety' element={<SafetyOptions />} />
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