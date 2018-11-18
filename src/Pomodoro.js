import React, { Component } from 'react';
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
      minutes: 25,
      seconds: 0,
      session_length: 25,
      break_length: 5,
      session: true, 
      started: false,
      paused: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.countdown = this.countdown.bind(this);
    this.calculate = this.calculate.bind(this);
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
    }) : this.setState({[dynamicKey] : 60});
  }
  decrement(len) {
    let dynamicKey = `${len}_length`;
    this.state[dynamicKey] > 1 ?
    this.setState({
      [dynamicKey] : this.state[dynamicKey] - 1
    }) : this.setState({ 
      [dynamicKey] : 1
    });
  }


  checkSession() {
    this.state.session ? this.startSession() : this.startBreak();
  }
  startSession() {
    //todo
    this.setState({
      minutes: this.state.session_length,
      seconds: 0,
    });
    this.countdown(this.state.session_length + (this.state.seconds / 60));
    this.setState({
      session: true
    })
  }
  handleClick(event) {
    const clicked = event.target.innerText;
    switch(clicked) {
      case 'play':
      this.state.started ? this.countdown(this.state.minutes + (this.state.seconds / 60)) : this.checkSession();
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
    this.countdown(this.state.break_length);
    this.setState({
      session: false
    });
  }

  reset() {
    clearInterval(this.interval);
    this.setState({
       minutes: 25,
      seconds: 0,
      session_length: 25,
      break_length: 5,
      session: true, 
      paused: true
    });
  }  
  pause() {
    clearInterval(this.interval);
  }
  countdown(num) {
    let stopTime = new Date;
      stopTime = stopTime.getTime() + (num * 60 * 1000);
    
    this.interval = setInterval(this.calculate, 1000, stopTime);
       
  }
 calculate(stopTime) {
      console.log('started');
      console.log(stopTime);
      let minutes, seconds;
      let startTime = new Date;
      startTime = startTime.getTime();
      let duration = parseInt((stopTime - startTime) / 1000);
      
      if (duration >= 0) {
        minutes = parseInt(duration / 60);
        duration = (duration % 60);
        seconds = parseInt(duration);
        console.log(minutes);
        console.log(duration);
        console.log(seconds);
        this.setState({
          minutes: minutes,
          seconds: seconds
        });
      } else {
        clearInterval(this.interval);
        this.startBreak();
      } 
    } 

  render() {
    const lengths = {
      break: this.state.break_length,
      session: this.state.session_length
    };

    const time_left = `${('0' + this.state.minutes).slice(-2)} : ${('0' + this.state.seconds).slice(-2)}`;
    return (
      <div className="Pomodoro">
        <header className="Pomodoro-header">
          <Header title="React Pomodoro timer"/> 
        </header>
        <main className="main">
          <Controls
            length={lengths} handleClick={this.adjustTime}/>
          <Timer label={this.state.session ? "session" : "break"} time_left={time_left} />
          <PlayPause handleClick={this.handleClick} paused={this.state.paused}/>
        </main>
      </div>
    );
  }
}

export default Pomodoro;
