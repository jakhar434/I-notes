import React from 'react';
import { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';
export const Noteitem = (props) => {
    const context = useContext(NoteContext);
    const { deletenote } = context;
   
    return (
        <div className='col-md-3 my-2'>
            <div className="card" >
                <div className="card-body">
                    <div className='d-flex align-items-center '>
                        <h5 className="card-title">{props.note.title}</h5>
                        <i className="fas fa-trash-alt mx-2" onClick={() => { deletenote(props.note._id) }}></i>
                        <i className="fas fa-user-edit mx-2" onClick={()=>{props.updatenote(props.note)}}></i>
                    </div>
                    <p className="card-text">{props.note.description}</p>

                </div>
            </div>
        </div>
    )
}
