import React from 'react';
import Label from './Label';

const Controls = props => {
    return (
        <div className="Controls">
            <Label 
                title="break"
                length={props.length}
                handleClick={props.handleClick}/>
            <Label 
                title="session"
                length={props.length}
                handleClick={props.handleClick}/>
        </div>
    );
}

export default Controls;