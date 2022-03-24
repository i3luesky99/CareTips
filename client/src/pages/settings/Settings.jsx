import "./settings.css"
import Sidebar from "../../conponents/sidebar/Sidebar"
import { useContext, useState } from "react"
import { Context } from "../../context/Context";
import axios from "axios";
export default function Setting() {

  const { user, dispatch } = useContext(Context)
  const [file, setFile] = useState(null)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")
  const [success, setSuccess] = useState(false)
  const PF = "http://localhost:3001/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" })
    const updateUser = {
      userId: user._id,
      username, password
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updateUser.profilePicture = filename;
      try {
        await axios.post("http://localhost:3001/api/upload", data);
      } catch (error) { }
    }
    try {
      const res = await axios.put("http://localhost:3001/api/users/" + user._id, updateUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data })
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE" })
    }
    };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Cập nhập tài khoản</span>
          <span className="settingsDeleteTitle">Xóa tài khoản</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Ảnh đại diện</label>
          <div className="settingsPP">
            <img
              className="settingsImg"
              src={file ? URL.createObjectURL(file) : PF + user.profilePicture}
              alt=""
              crossOrigin="anonymous"

            />
            <label htmlFor="fileInput">
              <i class=" settingsPPIcon fa-solid fa-user"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Họ và tên</label>
          <input
            type="text" placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Mật khẩu</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">Cập nhập</button>
          {success && <span style={{ color: "green", textAlign: "center", marginTop: "20px" }}>Cập nhập thành công</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  )
}
