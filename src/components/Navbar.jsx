import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';
export function Navbar() {
    const context = useContext(NoteContext);
    const {userdetail, user } = context;
    let location = useLocation();
    let history = useNavigate();// it is used to navigate 
    const handlelogout = () => {
        localStorage.removeItem("token");//remove the token from local storage
        history("/login");// redirect to login page

    }
    useEffect(() => {
        userdetail();
        // eslint-disable-next-line 
    }, [])

    return (

        <nav className="navbar navbar-expand-lg bg-dark navbar-dark navanimationcss" style={{position: "relative", zIndex: "2"}}>

            <div className="container-fluid">
                <Link className="navbar-brand navbarspan" to="#"><span>I</span>notebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-4">
                        <li className="nav-item mx-1 ">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""} `} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item mx-1">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""} `} to="/about">About</Link>
                        </li>

                    </ul>
                    {!localStorage.getItem("token") ?
                        <form className="d-flex" role="search">
                            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link>
                        </form> :
                        
                            <div className="btn-group mx-3 d-flex ">
                                <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                  {user.name} &emsp;
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhIga2phxp_pLiT5C1PqlR5CLCLG7Sq4i50A&usqp=CAU"
                                        className="rounded-circle z-depth-0"
                                        alt="avatar"
                                        height="32px"
                                    />
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-star">
                                    <li><button className="dropdown-item"  disabled type="button" style={{color:"black"}}> Your Profile</button></li>
                                    <li><button className="dropdown-item"  disabled type="button" style={{color:"blue"}}> Hii {user.name}!</button></li>
                                    <li><button className="dropdown-item" disabled type="button" style={{color:"blue"}}>Email: {user.email}</button></li>
                                    <li ><button className='btn btn-danger mx-3 my-3 ' onClick={handlelogout}>logout</button></li>
                                </ul>
                            </div>
                        
                    }

                </div>
            </div>
        </nav>
    );
}