import "./login.css"
import { Link } from 'react-router-dom'
import { Context } from "../../context/Context";
import { useContext, useRef } from "react";
import axios from "axios";
    
export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(Context)


    const handleSubmit = async (e) =>{
        e.preventDefault();
        dispatch({type:"LOGIN_START"});
        try {
            const res = await axios.post("http://localhost:3001/api/auths/login",{
                email: emailRef.current.value,
                password: passwordRef.current.value
            });
            dispatch({ type:"LOGIN_SUCCESS", payload: res.data });
            res.data && window.location.replace("/")
        } catch (error) {
            dispatch({ type:"LOGIN_FAILURE" });
        }
    }
    return (
        <div className="login">
            <span className="loginTitle">Đăng nhập</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="text" className="loginInput" placeholder="Enter your email..." 
                    ref={emailRef}
                />
                <label>Mật khẩu</label>
                <input type="password" className="loginInput" placeholder="Enter your password..." 
                    ref={passwordRef}
                />
                <button className="loginButton" type="submit" disabled ={isFetching}>Đăng nhập</button>
            </form>
            <button className="loginRegisterButton">
                <Link className="link" to="/register">
                    ĐĂNG KÝ
                </Link>
            </button>
        </div>
    )
}
