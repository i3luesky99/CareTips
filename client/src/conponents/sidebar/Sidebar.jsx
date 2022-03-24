import "./sidebar.css"
import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [cats, setCat] = useState([]);

  useEffect(() =>{
    const getCats = async () =>{
      const res = await axios.get("http://localhost:3001/api/categories")
      setCat(res.data);
    }
    getCats();
  },[])

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img className="sidebarImg"
          src="https://images.pexels.com/photos/461940/pexels-photo-461940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <p>
          Những ngày này, ai mà đi ngang qua con đường Hoàng Diệu,
          thế nào cũng không rời mắt khỏi những hàng hoa ban tím.
          Ngày nắng, thời tiết đẹp, người ta bảo rằng quá thích hợp để đi chụp ảnh.
          Thế nhưng ngày mưa, con đường này vẫn không hề vắng, bởi khi ấy,
          hoa ban lại bừng sáng theo một kiểu rất khác.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {
            cats.map((c) =>(
              <Link to={`/?cat=${c.name}`} className="link">
                <li className="sidebarListItem">{c.name}</li>
              </Link>
            ))
          }
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon facebookIcon fa-brands fa-facebook-square" ></i>
          <i className="sidebarIcon twitterIcon fa-brands fa-twitter-square"></i>
          <i className="sidebarIcon instagramIcon fa-brands fa-instagram"></i>
        </div>
      </div>
    </div>
  )
}
