import Button, { ButtonProps} from '@mui/material/Button';
import { styled }from '@mui/material/styles';
import { Link } from "react-router-dom"
import { blue } from '@mui/material/colors';
import { FaLongArrowAltRight } from "react-icons/fa";
import Navigation from '../Navigation/Navigation';
import './Header.css'
import logo from '../../assets/logo.png'

const HeaderCta = styled(Button)<ButtonProps & { to: string }>(({ theme }) => ({
  fontSize: '1.5rem',
  fontFamily: 'var(--primary-font)',
  fontWeight: 400,
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  '&:hover': {
    backgroundColor: blue[700],
  }
}));

const navLinks = [
  { to: '/', label: "Home" },
  { to: '/membership', label: "Membership" },
  { to: '/about', label: "About Us" },
  { to: '/signin', label: "Sign In" }
]

function Header() {
  return (
    <>
      <nav className="header-container">
        <div className="header-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="header-links">
            <ul className="links-items">
            {
              navLinks.map(navLink => 
              <Navigation to={navLink.to}  label={navLink.label} />)
            }
            </ul>
            <HeaderCta variant="contained"  component={Link} to='/register' sx={{ textTransform:  'capitalize'}}>Get Started <FaLongArrowAltRight />
            </HeaderCta>
        </div>
      </nav>
    </>
  )
}

export default Header
