import React from 'react';
import { Link } from 'react-router-dom'


const AddButton = (props) => {
    
        return (
          <div>
            <ul>
                <li>
                    <button className="" onClick={props.kartolo}>ADD BOOK</button>
                </li>
            </ul>
          </div>
        );
    
}

export default AddButton;
