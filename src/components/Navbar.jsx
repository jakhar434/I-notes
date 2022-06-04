import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
export function Navbar() {
    let location = useLocation();
    let history = useNavigate();// it is used to navigate 
    const handlelogout=()=>{
        localStorage.removeItem("token");//remove the token from local storage
        history("/login");// redirect to login page

    }
    return (

        <nav className="navbar navbar-expand-lg bg-dark navbar-dark navanimationcss">

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
                   {!localStorage.getItem("token")?<form className="d-flex" role="search">
                        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link>
                    </form>:<button className='btn btn-primary' onClick={handlelogout}>logout</button>}
                </div>
            </div>
        </nav>
    );
}