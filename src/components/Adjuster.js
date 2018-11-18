import React from 'react';

const Adjuster = props => {
    return (
        <div className="Adjuster-container">
            <button 
            className="Adjuster-button" 
            id={props.title+'-increment'}
            onClick={props.handleClick}>
                Up
            </button>
            <span id={props.title+'-length'}>{props.length[props.title]}</span>
            <button 
            className="Adjuster-button" 
            id={props.title+'-decrement'}
            onClick={props.handleClick}>
                Down
            </button>
        </div>
    );
}

export default Adjuster;