import "./topbar.css"
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { Context } from "../../context/Context";

export default function Topbar() {
    const { user, dispatch } = useContext(Context)
    const PF = "http://localhost:3001/images/";
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };
    return (
        <div className='top'>
            <div className="topLeft">
                <a href="https://www.facebook.com/profile.php?id=100004930594642">
                    <i className="topIcon FacebookIcon fa-brands fa-facebook-square"></i>
                </a>
                <a href="https://www.instagram.com/_kighyh.eu/">
                    <i className="topIcon TwitterIcon fa-brands fa-twitter-square"></i>
                </a>
                <a href="https://www.instagram.com/minhhieu181099/">
                    <i className="topIcon InstagramIcon fa-brands fa-instagram"></i>
                </a>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link className="link" to="/">TRANG CHỦ</Link>
                    </li>
                    <li className="topListItem"><Link className="link" to="/">LIÊN HỆ</Link></li>
                    <li className="topListItem"><Link className="link" to="/write">VIẾT BÀI</Link></li>
                    <li className="topListItem"><Link className="link" to="/">ABOUT</Link></li>
                </ul>
            </div>
            <div className="topRight">
                {user ? (
                <Link to='/settings'> 
                    <img
                        src={PF + user.profilePicture}
                        className="topImg"
                        alt=""
                        crossOrigin="anonymous"
                    />
                </Link>
                    ) : (
                    <ul className="topList">
                        <li className="topListItem">
                            <Link className="link" to="/login">
                                ĐĂNG NHẬP
                            </Link>
                        </li>
                        <li className="topListItem">
                            <Link className="link" to="/register">
                                ĐĂNG KÝ
                            </Link>
                        </li>
                    </ul>
                )}
                <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
                <Link to="login">
                    <div className="topLogoutIcon" onClick={handleLogout}>
                        {user && <i className=" fa-solid fa-right-from-bracket"></i>}
                    </div>
                </Link>
            </div>
        </div>
    )
}
