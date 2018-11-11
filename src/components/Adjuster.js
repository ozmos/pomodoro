import React from 'react';

const Adjuster = props => {
    return (
        <div className="Adjuster-container">
            <button className="Adjuster-button" id={props.title+'-increment'}>
                Up
            </button>
            <span id={props.title+'-length'}>{props.length[props.title]}</span>
            <button className="Adjuster-button" id={props.title+'-decrement'}>
                Down
            </button>
        </div>
    );
}

export default Adjuster;