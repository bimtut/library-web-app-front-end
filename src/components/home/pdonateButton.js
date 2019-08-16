import React from 'react';
import { Link } from 'react-router-dom'


const DonateButton = (props) => {
    
        return (
          <div>
            <ul>
                <li>
                    <button className="" onClick={props.openLittle}>DONATE BOOK</button>
                </li>
            </ul>
          </div>
        );
    
}

export default DonateButton;
