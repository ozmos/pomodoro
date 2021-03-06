import React from 'react';

class PlayPause extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event) {
        const clicked = event.target.id;
        switch(clicked) {
        case 'play':
        //todo introduce pause
        this.props.started ? this.props.countDown(this.props.currentTime.minutes) : this.props.checkSession();
        this.props.unpause();
        break;
        case 'pause':
        this.props.pause();
        break;
        case 'reset': 
        this.props.reset();
        break;
        default :
        console.log('you clicked something');
        }
    }
    render () {
        return (
            <div className="Play-pause-container">
                <div className="start_stop" id="start_stop" onClick={this.handleClick}>{this.props.paused 
                    ? <div className="triangle-right" id="play"></div> : <div className="pause-button" id="pause"></div>}</div>
                <p className="reset" id="reset" onClick={this.handleClick}>reset</p>
            </div>
        );
    }
};

export default PlayPause;