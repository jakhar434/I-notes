
import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const notetitle = [];
    const [notes, setNotes] = useState(notetitle);
    const [user, setUser] = useState({ name: "", email:"" });
    //user details
    const userdetail = async () => {
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem("token")
            },


        });
        const json = await response.json();

        // console.log(json.name);
        setUser({ name: json.name , email: json.email})
    }
    //getall notes 
    const getNote = async () => {
        // todo api call
        const response = await fetch("http://localhost:5000/api/notes/getnotes", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
           
        });
        const jsonarr = await response.json();
        // console.log(jsonarr);
        setNotes(jsonarr);
    };

    //add a note 
    const addNote = async (title, description, tag) => {
        // todo api call
     
        const response = await fetch("http://localhost:5000/api/notes/addnotes", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const note= await  response.json();

       /* const note = { 
            "_id": "6295be13a499e5rb512a3r548771",
            "user": "629320f5f8b21ac907c5df3b",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-05-31T07:04:51.011Z",
            "__v": 0
        }*/

        setNotes(notes.concat(note));
    };

    // delete a note
    const deletenote = async (id) => {
        //todo call api
        const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
           
        });
        const json = await response.json();
        console.log(json);
        console.log("deleted the note" + id);
        const newnotes = notes.filter((note) => { return note._id !== id });
        setNotes(newnotes);
    }


    // editnote
    const editnote = async (id, title, description, tag) => {
        const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        console.log(json);
        const newNotes = JSON.parse(JSON.stringify(notes))

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                // break;
            }
            setNotes(newNotes);

        }

    }

    return (
        <NoteContext.Provider value={{ notes,setNotes, addNote, deletenote, editnote, getNote,userdetail, user }}>
            {props.children}
        </NoteContext.Provider>
    );
}
export default NoteState;