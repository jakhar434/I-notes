import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
export function Navbar() {
    let location = useLocation();
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
                    <form className="d-flex" role="search">
                    <Link class="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                    <Link class="btn btn-primary mx-2" to="/signup" role="button">SignUp</Link>
                    </form>
                </div>
            </div>
        </nav>
    );
}