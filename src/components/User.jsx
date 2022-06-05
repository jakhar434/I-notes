import React from 'react'

export const User =  (props) => {    
    return (
        <div className='container'>
            <p>Hello {props.user}</p>
        </div>
    )
}
