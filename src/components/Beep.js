import React from 'react';

const Beep = props => (
  <div className="invisible">
    <audio 
      id="beep1"
      src={props.url1}>
    </audio> 
    <audio
      id="beep2"
      src={props.url2}    
      />
      </div>
);

export default Beep;