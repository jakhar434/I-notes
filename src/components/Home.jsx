import React from 'react';

import Notes from './Notes';

export function Home(props) {
    const {showalert} =props;
    return (
        <div>
           <Notes showalert={showalert}/>
        </div>

    );
}