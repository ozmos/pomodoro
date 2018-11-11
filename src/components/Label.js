import React from 'react';
import Adjuster from './Adjuster';

const Label = props => {
    return (
        <div className="Label" id={props.title+'-label'}>
            <h3>{props.title + '-length'}</h3>
            <Adjuster title={props.title}
               length={props.length}  />
        </div>
    );
}

export default Label;