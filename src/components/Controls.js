import React from 'react';
import Label from './Label';

const Controls = props => {
    return (
        <div className="Controls">
            <Label 
                title="break"
                length={props.length}/>
            <Label 
                title="session"
                length={props.length}/>
        </div>
    );
}

export default Controls;