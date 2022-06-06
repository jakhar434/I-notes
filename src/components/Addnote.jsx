import React, { useState } from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';
import { Link } from 'react-router-dom';
import homeimg from "./homeimg.png";
export const Addnote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;

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
    


    return (
        <div>
            <div className='container'>
                
                <div className="container" >
                    <div className="row">
                        <div className="col-md-5 " style={{marginTop:"50px"}}>
                            <h1 className="display-1  respo" style={{marginTop:"-20px", fontWeight:"bolder"}}><span style={{ color: "#9C27B0" }}>i</span>Notebook</h1>
                            <p className=" respo" style={{ fontSize: "1.6rem", fontWeight: "bold" }}>Your notebook on cloud - safe and secure</p>
                            <p className=" mt-2 respo" style={{ fontSize: "1.2rem" }}>An online web platform where you can create, edit, delete your notes privately and securely without any disturbance. For more info you can checkout our <Link to="/about">About Page</Link>  </p>
                            
                        </div>
                        <div className="col-md-7 d-flex flex-column align-items-center justify-content-center">
                            <img className="img-fluid" style={{ width: "75%"  }} src={homeimg} alt="iNotebook" />
                        </div>
                    </div>
                </div>
                <div className='d-flex align-items-center justify-content-center my-2 addingnotes_scroll'>
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
