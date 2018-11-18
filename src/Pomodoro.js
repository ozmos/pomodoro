import React, { Component } from 'react';
import moment from 'moment';
import './Pomodoro.css';
import Header from './components/Header';
import Controls from './components/Controls';
import './styles/Controls.css';
import './styles/Label.css';
import Timer from './components/Timer';
import PlayPause from './components/PlayPause';

class Pomodoro extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentTime: moment.duration(25, 'minutes'),
      session_length: 25,
      break_length: 5,
      timer: null,
      session: true, 
      started: false,
      paused: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.reduceTimer = this.reduceTimer.bind(this);
    this.pause = this.pause.bind(this);
    this.reset = this.reset.bind(this);
    this.startBreak = this.startBreak.bind(this);
    this.checkSession = this.checkSession.bind(this);
    this.startSession = this.startSession.bind(this);
    this.adjustTime = this.adjustTime.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  adjustTime(event) {
    switch(event.target.id) {
      case 'break-increment':
      this.increment('break');
      break;
      case 'break-decrement':
      this.decrement('break');
      break;
      case 'session-increment':
      this.increment('session');
      break;
      case 'session-decrement':
      this.decrement('session');
      break;
      default:
      return null;
    };
  }
  increment(len) {
    let dynamicKey = `${len}_length`;
    this.state[dynamicKey] < 60 ?
    this.setState({
      [dynamicKey] : this.state[dynamicKey] + 1
    }) : this.setState({
      [dynamicKey] : 60
    });
  }
  decrement(len) {
    let dynamicKey = `${len}_length`;
    this.state[dynamicKey] > 1 ?
    this.setState({
      [dynamicKey] : this.state[dynamicKey] - 1
    }) : this.setState({ 
      [dynamicKey] : 0
    });
  }


  checkSession() {
    this.state.session ? this.startSession() : this.startBreak();
  }
  startSession() {
    //todo
    this.setState({
      currentTime: moment.duration(this.state.session_length, 'minutes')
    });
    this.setState({
      timer: setInterval(this.reduceTimer, 1000)
    });
    this.setState({
      session: true
    });
  }

  reduceTimer() {
    if (this.state.session) {
      const newTime = this.state.currentTime;
      newTime.subtract(1, 'second');

      this.setState({
        currentTime: newTime
      });
    }
  }
  handleClick(event) {
    const clicked = event.target.innerText;
    switch(clicked) {
      case 'play':
      //todo introduce pause
      this.state.started ? this.pause() : this.checkSession();
      this.setState({
        paused: false
      });
      break;
      case 'pause':
      this.pause();
      this.setState({
      paused: true
    });
      break;
      case 'reset': 
      this.reset();
      break;
      default :
      console.log('you clicked something');
    }
  }
  startBreak() {
    this.setState({
      currentTime: moment.duration(this.state.break_length)
    });
    this.setState({
      timer: setInterval(this.reduceTimer, 1000),
      session: false
    });
  }

  reset() {
    clearInterval(this.state.timer, 1000);
    this.setState({
      currentTime: moment.duration(25, 'minutes'),
      session_length: 25,
      break_length: 5,
      timer: null,
      session: true, 
      started: false,
      paused: true
    });
  }  
  pause() {
    clearInterval(this.state.timer, 1000);
  }
  
render() {
    const lengths = {
      break: this.state.break_length,
      session: this.state.session_length
    };
    const currentTime = `${('0' + this.state.currentTime.get('minutes')).slice(-2)} : ${('0' + this.state.currentTime.get('seconds')).slice(-2)} `
    return (
      <div className="Pomodoro">
        <header className="Pomodoro-header">
          <Header title="React Pomodoro timer"/> 
        </header>
        <main className="main">
          <Controls
            length={lengths} handleClick={this.adjustTime}/>
          <Timer label={this.state.session ? "session" : "break"} currentTime={currentTime} />
          <PlayPause handleClick={this.handleClick} paused={this.state.paused}/>
        </main>
      </div>
    );
  }
}

export default Pomodoro;
