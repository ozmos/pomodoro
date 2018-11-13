import React from 'react';

const PlayPause = props => {
    return (
        <div className="Play-pause-container">
            <button className="start_stop" id="start_stop" onClick={props.handleClick}>{props.paused ? 'play' : 'pause'}</button>
            <button className="reset" id="reset" onClick={props.handleClick}>reset</button>
        </div>
    );
};

export default PlayPause;