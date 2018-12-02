import React from 'react';

class Adjuster extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick (event) {
    switch(event.target.id) {
      case 'break-increment':
      this.props.increment('break');
      break;
      case 'break-decrement':
      this.props.decrement('break');
      break;
      case 'session-increment':
      this.props.increment('session');
      break;
      case 'session-decrement':
      this.props.decrement('session');
      break;
      default:
      return null;
    };
  }
render() {
    return (
        <div className="Adjuster-container">
            <p 
            className="Adjuster-button" 
            id={this.props.title+'-increment'}
            onClick={this.handleClick}>
                <i class="arrow up"></i>
            </p>
            <span id={this.props.title+'-length'}>{this.props.length[this.props.title]}</span>
            <p 
            className="Adjuster-button" 
            id={this.props.title+'-decrement'}
            onClick={this.handleClick}>
                <i class="arrow down"></i>
            </p>
        </div>
    );
}
}

export default Adjuster;