import "./register.css"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from "axios"

export default function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false) 

    const handleSubmit = async (e) =>{
        e.preventDefault(); //Prevent reload 
        setError(false)
        try{
            const res =  await axios.post("http://localhost:3001/api/auths/register",{
                username,
                email,
                password,
        });
            res.data && window.location.replace("/login")//Move to login page
        }catch(err){
            setError(true)
        }
    }
    return (
        <div className="register">
            <span className="registerTitle">Đăng kí</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Họ và tên</label>
                <input type="text" className="registerInput" placeholder="Enter your username..."
                    onChange={ e => setUsername(e.target.value)} 
                />
                <label>Email</label>
                <input type="text" className="registerInput" placeholder="Enter your email..." 
                    onChange={ e => setEmail(e.target.value)} 
                />
                <label>Mật khẩu</label>
                <input type="password" className="registerInput" placeholder="Enter your password..." 
                    onChange={ e => setPassword(e.target.value)} 
                />
                <button className="registerButton" type="submit">Đăng kí</button>
            </form>
            <button className="registerLoginButton">
                <Link className="link" to="/login">
                    ĐĂNG NHẬP
                </Link>
            </button>
            {error &&<span style={{color:"red", marginTop:"15px"}}>Email đã đăng ký</span>}
        </div>
    )
}
