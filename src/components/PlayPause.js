import React from 'react';

const PlayPause = props => {
    return (
        <div className="Play-pause-container">
            <button className="start_stop" id="start_stop">play/pause</button>
            <button className="reset" id="reset">reset</button>
        </div>
    );
};

export default PlayPause;