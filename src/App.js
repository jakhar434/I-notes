import React,{useState} from 'react';
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import { Home } from './components/Home';
import NoteState from './context/notes/noteState';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Alert } from './components/Alert';
import { Login } from './components/Login';
import { Signup } from './components/Signup';

function App() {
  const [alert, setAlert] = useState(null);
  const showalert =(message, type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null)
    },1500)
  }
  return (
    <>
      <NoteState>
        <Router>

          <Navbar />
          <Alert  alert={alert} />
          <div className='container'>
            <Routes>
              <Route exact path="/" element={<Home showalert={showalert}/>} />
              <Route exact path="/about" element={<About showalert={showalert}/>} />
              <Route exact path="/login" element={<Login showalert={showalert}/>} />
              <Route exact path="/signup" element={<Signup showalert={showalert}/>} />
            </Routes>
          </div>

        </Router>
      </NoteState>
    </>
  );
}

export default App;
