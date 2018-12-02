import React from 'react';
import Label from './Label';

const Controls = props => {
    return (
        <div className="Controls">
            <Label 
                title="break"
                length={props.length}
                increment={props.incrementBreak}
                decrement={props.decrementBreak}/>
            <Label 
                title="session"
                length={props.length}
                increment={props.incrementSession}
                decrement={props.decrementSession}
                />
        </div>
    );
}

export default Controls;