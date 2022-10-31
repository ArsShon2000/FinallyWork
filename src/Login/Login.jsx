import React, { useState } from "react";
import axios from "axios";
import log from "./Login.module.css"
import logo from "../Header/logo.png" 



const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://127.0.0.1:5000',
})


const Login = (props) => {

        // instance.post('/create-login', () => {})

  let [login, setLog] = useState('');
  let [password, setPass] = useState('');
  const [loginList, setLoginList] = useState([]);
// проверка на логинизацию

    let onLogin = () => {
        if(loginList.length === 0){
            instance.post('/login', {
                login: login,
                password: password
            }).then((res) => {
                setLoginList([...loginList, { login: login, password: password}])                
                console.log(res + "name is added in loginList");
            })
            console.log("From login")
        }
    }

    return (
    <div className={log.modal}>
    <div className={log.loginForm}>
    <div className={log.logo}><img src={logo} alt="logo" /></div>
        <form className={log.login}>
        <div>
        <input className="type-2"
             type="text"
             value={login} onChange={(e) => setLog(e.currentTarget.value)}
            placeholder={"Login"} />
        </div>
        <div>
            <input className="type-2"
            type="password"
            value={password} onChange={(e) => setPass(e.currentTarget.value)} 
            placeholder={"Password"} />
        </div>
        <div>
            <input type={"checkbox"}/> remember me
        </div>
        <div>
            <button onClick={onLogin}>Log In</button>
        </div>
    </form>
    </div>
    </div>)
}



export default Login