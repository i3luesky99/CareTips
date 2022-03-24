import "./header.css"

export default function Header() {
  return (
    <div className="header">
        <div className="headerTitles">
          <span className="headerTitlesSm">Care & Tips</span>
          <span className="headerTitlesLg">Blog</span>
        </div>
        <img 
            className="headerImg"
            src="https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="" 
          />
    </div>
  )
}
