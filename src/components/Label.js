import React from 'react';
import Adjuster from './Adjuster';

const Label = props => {
    return (
        <div className="Label" id={props.title+'-label'}>
            <h3>{props.title + '-length'}</h3>
            <Adjuster title={props.title}
               length={props.length}  
               increment={props.increment}
               decrement={props.decrement}/>
        </div>
    );
}

export default Label;