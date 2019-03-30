import React from 'react'
import { Navbar } from 'reactstrap'
import './Header.css'

const Header = props => {
  const { user } = props
  return (
    <div className="Header">
      <Navbar className="Header--Navbar">
	<div className="Header--username">
	  {user.login}
	</div>
	<div className="Header--avatar">
	  <img src={user.avatar_url} alt={user.login}/>
	</div>
      </Navbar>

    </div>
  )
}

export default Header
