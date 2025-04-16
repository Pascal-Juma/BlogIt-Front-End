import Navigation from '../Navigation/Navigation';
import './NavBar.css'
import logoImage from '../../assets/logo.png'

const navLinks = [
  { to: '/', label: "Home" },
  { to: '/about', label: "About Us" },
  { to: '/compose', label: "Compose" },
  { to: '/myblogs', label: "My Blogs" },
  { to: '/blogs', label: "Featured Blogs" },
  { to: '/signin', label: "Log Out" }
]

function NavBar() {
  return (
    <>
      <nav className="header-container">
        <div className="header-logo">
          <img src={logoImage} alt="Logo" />
        </div>
        <div className="header-links">
            <ul className="links-items">
            {
              navLinks.map(navLink => 
              <Navigation to={navLink.to}  label={navLink.label} />)
            }
            </ul>
        </div>
      </nav>
    </>
  )
}

export default NavBar;