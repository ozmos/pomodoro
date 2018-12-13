import React from 'react';

const Timer = props => {
    return (
        <div className="Timer">
            <h2 className="timer-label" id="timer-label">
                {props.label}
            </h2>
            <p className="time-left" id="time-left">
                {props.currentTime}
            </p>
        </div>
    );
};

export default Timer;