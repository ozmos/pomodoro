import React, { Component } from 'react';
import moment from 'moment';
import './Pomodoro.css';
import Header from './components/Header';
import Controls from './components/Controls';
import './styles/Controls.css';
import './styles/Label.css';
import Timer from './components/Timer';
import PlayPause from './components/PlayPause';
import soundfile from './audio/080_simple-sevenths-epiano.mp3';
import  Beep  from './components/Beep';
import './styles/Timer.css';
import './styles/PlayPause.css';
var momentDurationFormatSetup = require("moment-duration-format");

momentDurationFormatSetup(moment);
class Pomodoro extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentTime: moment.duration(25, 'minutes'),
      session_length: 25,
      break_length: 5,
      session: true, 
      started: false,
      paused: true
    };
    this.countDown = this.countDown.bind(this);
    this.reduceTimer = this.reduceTimer.bind(this);
    this.pause = this.pause.bind(this);
    this.reset = this.reset.bind(this);
    this.startBreak = this.startBreak.bind(this);
    this.checkSession = this.checkSession.bind(this);
    this.startSession = this.startSession.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.unpause = this.unpause.bind(this);
    this.playAlarm = this.playAlarm.bind(this);
    this.stopAlarm = this.stopAlarm.bind(this);
  }

  playAlarm () {
      document.getElementById("beep").play()
  }

  stopAlarm () {
    const alarm = document.getElementById("beep");
    alarm.pause();
    alarm.currentTime = 0;
  }

  incrementSession() {
    this.state.session_length < 60 
      ? this.setState({
        session_length : this.state.session_length + 1,
        currentTime: this.state.currentTime.add(1, 'minute')
      })
      : this.setState({
        session_length : 60,
        currentTime : moment.duration(60, 'minutes')
      })
  } 
  //todo make new decrementSession and increment/decrementBreak functions and pass to components
  decrementSession() {
    this.state.session_length > 1 
      ? this.setState({
        session_length : this.state.session_length - 1,
        currentTime: this.state.currentTime.subtract(1, 'minute')
      })
      : this.setState({
        session_length : 1,
        currentTime : moment.duration(1, 'minute')
      })
  }

  incrementBreak() {
    this.state.break_length < 60
      ? this.setState({
        break_length : this.state.break_length + 1
      })
      : this.setState({
        break_length: 60
      })
  }
   decrementBreak () {
    this.state.break_length > 1 
      ? this.setState({
        break_length : this.state.break_length - 1
      })
      : this.setState({
        break_length : 1
      })
  }

  checkSession() {
    this.state.session ? this.startSession() : this.startBreak();
  }

  startSession() {
    this.setState({
      currentTime: moment.duration(this.state.session_length, 'minutes'),
    });
    this.countDown();
    this.setState({
      session: true,
      started: true,
    });
  }

  countDown() {
    //this.reduceTimer()
    this.timer = setInterval(this.reduceTimer, 1000);
  }

  reduceTimer() {
    const currentTime = this.state.currentTime;
    if (currentTime.get('seconds') > 0 || currentTime.get('minutes') > 0 || currentTime.get('hours') > 0) {
      const newTime = this.state.currentTime;
      newTime.subtract(1, 'second');

      this.setState({
        currentTime: newTime
      });
    } else if (this.state.session) {
      this.playAlarm();
      this.setState({
        session: false,
      });
      this.checkSession();
    } else if (!this.state.session) {
      this.playAlarm();
      this.setState({
        session: true,
      });
      this.checkSession();
    }
  }

    startBreak() {
    clearInterval(this.timer, 1000);
    this.setState({
      currentTime: moment.duration(this.state.break_length, 'minutes'),
    });
    this.countDown();
  }

  reset() {
    clearInterval(this.timer, 1000);
    this.stopAlarm();
    this.setState({
      currentTime: moment.duration(25, 'minutes'),
      session_length: 25,
      break_length: 5,
      session: true, 
      started: false,
      paused: true
    });
  }  

  pause() {
    clearInterval(this.timer, 1000);
    this.setState({
      paused: true
    });
  }

  unpause() {
    this.setState({
      paused: false
    });
  }
  
render() {
    const lengths = {
      break: this.state.break_length,
      session: this.state.session_length
    };
    
    const currentTime = `${('00:' +this.state.currentTime.format('mm:ss')).slice(-5)}`;

    return (
      <div className="Pomodoro">
        <header className="Pomodoro-header">
          <Header title="Yo yo Pomodoro"/> 
        </header>
        <main className="main">
          <Timer label={this.state.session ? "session" : "break"} currentTime={currentTime} />
          <PlayPause 
            countDown={this.countDown}
            checkSession={this.checkSession}
            pause={this.pause}
            reset={this.reset}
            unpause={this.unpause}
            paused={this.state.paused}
            started={this.state.started}
            currentTime={this.state.currentTime}
          />
          <Controls
            length={lengths} 
            incrementSession={this.incrementSession}
            decrementSession={this.decrementSession}
            incrementBreak={this.incrementBreak} 
            decrementBreak={this.decrementBreak}
          />
          <Beep url={soundfile}/>
        </main>
      </div>
    );
  }
}

export default Pomodoro;
