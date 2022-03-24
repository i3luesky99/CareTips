import "./single.css"
import Sidebar from "../../conponents/sidebar/Sidebar"
import SinglePost from "../../conponents/singlePost/SinglePost"

export default function Single() {
    return (
        <div className="single">
            <SinglePost />
            <Sidebar />
        </div>
    )
}
