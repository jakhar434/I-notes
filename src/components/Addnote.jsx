import React, { useState, useEffect } from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';
export const Addnote = (props) => {
    const context = useContext(NoteContext);
    const { addNote, userdetail, user } = context;
    
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const onChange = (e) => {
        // spreadoperator ...is says that keep the default value and overwrite it
        setNote({ ...note, [e.target.name]: e.target.value })

    }

    const handleclick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showalert("Note Added", "success")
    }
    useEffect(() => {
        userdetail();
        // eslint-disable-next-line 
    }, [])
    

    return (
        <div>
            <div className='container'>
                <div className='container my-4'>
                    <p>Hello {user.name}!</p>
                </div>
                <div className='d-flex align-items-center justify-content-center my-2'>
                    <h2 className='text-center mx-3'>ADD A NOTE</h2>
                    <p className='emojicss'>&#127773;</p>
                </div>
                <div className='container my-3'>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" minLength={5} required name='title' value={note.title} onChange={onChange} />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label ">Description</label>
                            <textarea type="text" className="form-control" id="description" name='description' value={note.description} minLength={5} required onChange={onChange} rows="4" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label ">Tag</label>
                            <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
                        </div>

                        <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary mx-2" onClick={handleclick}>Add Note</button>
                    </form>
                </div>





            </div>
        </div>
    )
}
