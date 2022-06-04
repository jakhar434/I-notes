import React from 'react'

export const Alert = (props) => {
    const changeword=(word)=>{
        if(word==="danger"){
            word="Error";
        }
        return word;

    }
    return (
        <div style={{height:'50px'}}>
        { props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show `} role="alert">
                 <strong>{changeword(props.alert.type)}</strong> {props.alert.msg}
                
        </div>}
        </div>
    )
}
