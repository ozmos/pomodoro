import React from 'react';

const Beep = props => (
    <audio 
      id="beep"
      src={props.url}>
    </audio> 
        
);

export default Beep;