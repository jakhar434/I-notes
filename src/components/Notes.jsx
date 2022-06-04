import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import { Noteitem } from './Noteitem';
import NoteContext from '../context/notes/noteContext';
import { Addnote } from './Addnote';

export default function Notes() {
    const context = useContext(NoteContext);
    const { notes, getNote, editnote } = context;

    useEffect(() => {
        getNote();
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refclose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const onChange = (e) => {
        // spreadoperator ...is says that keep the default value and overwrite it

        setNote({ ...note, [e.target.name]: e.target.value })

    }
    const updatenote = (currentnote) => {
        ref.current.click()
        setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag });
    }
    const handleclick = (e) => {
        // console.log("updated note", note)
        editnote(note.id, note.etitle, note.edescription, note.etag)
        refclose.current.click();

    }
    return (
        <>
            <Addnote />
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} minLength={5} required onChange={onChange} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label ">Description</label>
                                    <textarea type="text" className="form-control" id="edescription" name='edescription' minLength={5} required value={note.edescription} onChange={onChange} rows="4" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label ">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleclick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row my-3'>
                    <div className='d-flex align-items-center justify-content-center'>
                        <h3 className='text-center my-3 mx-3'>YOUR NOTES</h3>

                        <p style={{ fontSize: "24px" }}> &#x270D;</p>
                    </div>
                    <div className='container d-flex justify-content-center mt-2'>
                        {notes.length === 0 && 'No Notes to display'}
                    </div>
                    {notes.map((note) => {
                        return (
                            <Noteitem key={note._id} updatenote={updatenote} note={note} />

                        );
                    })}
                </div>
            </div>
        </>
    );
}