import React from 'react'
import { Link } from 'react-router-dom'
import LoginHome from './loginButton'
import '../style/Navbar.css'
import DonateButton from '../components/donateButton'

function Nav(props) {
    // console.log(props.showLogin);
    
    return (
        <div id="header">
            <span>BOOKS</span>
            <LoginHome showLogin={props.showLogin} showRegis={props.showRegis} logout={props.logout}/>
            <DonateButton openLittle={props.openDonateBut}/>
        </div>
    )
}

export default Nav