import React, { Component } from 'react';
import './Pomodoro.css';
import Header from './components/Header';
import Controls from './components/Controls';
import './styles/Controls.css';
import './styles/Label.css';
import Timer from './components/Timer';
import PlayPause from './components/PlayPause';

class Pomodoro extends Component {
  render() {
    const lengths = {
      break: 5,
      session: 25
    };

    return (
      <div className="Pomodoro">
        <header className="Pomodoro-header">
          <Header title="React Pomodoro timer"/> 
        </header>
        <main className="main">
          <Controls
            length={lengths}/>
          <Timer label="Session" time_left="25:00" />
          <PlayPause />
        </main>
      </div>
    );
  }
}

export default Pomodoro;
