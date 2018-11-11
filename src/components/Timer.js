import React from 'react';

const Timer = props => {
    return (
        <div className="Timer">
            <h3 className="timer-label" id="timer-label">
                {props.label}
            </h3>
            <p className="time-left" id="time-left">
                {props.time_left}
            </p>
        </div>
    );
};

export default Timer;