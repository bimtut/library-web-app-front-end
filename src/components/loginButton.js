import React from 'react';
import { Link } from 'react-router-dom'


const LoginButton = (props) => {
    
        return (
          <div>
            <ul>
                <li>
                    
                    {localStorage.token == null? <button className="loginhome" onClick={props.showLogin}>log in</button> :<button className="loginhome" onClick={props.logout}>log out</button>}
                </li>
                <li>
                  {localStorage.token == null? <button className="registerhome" onClick={props.showRegis}>register</button>: ''}
                    
                </li>
            </ul>
          </div>
        );
    
}

export default LoginButton;
