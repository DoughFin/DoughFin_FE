import React from 'react'
import './NavBar.css'
import UserPic from '../../assets/icons/user-icon.png'
import BarIcon from '../../assets/icons/bar-icon.svg'
import DoughfinLogo from '../../assets/icons/doughfin.svg'
import GridIcon from '../../assets/icons/grid-icon.svg'
import SettingsIcon from '../../assets/icons/settings-icon.svg'
import UserIcon from '../../assets/icons/user-icon.svg'

const NavBar = ({userName}) => {
  return (
    <nav className='navbar'>
      <aside className='nav-button-container'>
        <section className='nav-buttons'>
          <div className='logo-container'>
            <img src={DoughfinLogo} alt='bar icon' />
            <p className='logo-text'>doughfin</p>
          </div>
          <button className='navbar-button'>
            <img src={GridIcon} alt='bar icon' />
            <p className='navbar-button-text'>Dashboard</p>
          </button>
          <button className='navbar-button disabled'>
            <img src={BarIcon} alt='Activity icon' />
            <p className='navbar-button-text'>Activity</p>
          </button>
          <button className='navbar-button disabled'>
            <img src={UserIcon} alt='Accounts icon' />
            <p className='navbar-button-text'>Accounts</p>
          </button>
          <button className='navbar-button disabled'>
            <img src={SettingsIcon} alt='Settings icon' />
            <p className='navbar-button-text'>Settings</p>
          </button>
          <div style={{width: '100%', height: '0%', border: '1px #8C89B4 solid'}}></div>
        </section>
      </aside>
      <section className='user-icon'>
        <img src={UserPic} alt='user icon' />
        <p className='user-details'>{userName}</p>
      </section>
    </nav>
  )
}

export default NavBar