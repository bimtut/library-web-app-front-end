import React from 'react';
import { Link } from 'react-router-dom'


const LoginButton = (props) => {
    
        return (
          <div>
            <ul>
                <li>
                    <button className="loginhome" onClick={props.showLogin}>login</button>
                </li>
                <li>
                    <button className="registerhome" onClick={props.showRegis}>register</button>
                </li>
            </ul>
          </div>
        );
    
}

export default LoginButton;
