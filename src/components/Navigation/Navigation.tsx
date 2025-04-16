import { NavLink } from 'react-router-dom';

type headerProps ={
    to: string;
    label: string;
  }

function Navigation({to, label}: headerProps) {
  return (
    <>
    <li>
    <NavLink to={to} className={({isActive}) => isActive ? 'active-link': ''}>{label}</NavLink>
    </li>
    </>
  )
}

export default Navigation
