import React from 'react';
import { Link } from 'react-router-dom';
import cloudimg from "./cloudimg.png";
export function About() {

    return (
        <div>
            <div className='aboutbanner'>
                <div className='bannercontent'>
                    <h2>Empowering  Students</h2>
                    <p>An online web platform where you can create, edit, upload,delete your notes/<br></br>information privately and securely without any disturbancee</p>
                    <Link to="/" className="btn btn-danger ">Add Note</Link>
                </div>
            </div>
            <div className='about_img_content'>
                <div className='about_img_1'>

                </div>
                <div className='about_img_2'>
                    <h2 className="mb-3" style={{ fontWeight: "Bold" }}>Powering the <span style={{ color: "#9C27B0" }}>internet’s visuals</span> </h2>
                    <p>
                        How we started? The concept was very simple. iNotebook was born from the pain of writing all the things in notebook which is very hectic :( .
                        To avoid this, I created iNotebook to make your life simple .An online web platform where you can create, edit, upload, delete your notes/information privately and securely without any disturbance.
                    </p>
                    <Link to="/signup" className="btn btn-danger ">Sign up now</Link>

                </div>
            </div>
            <div className='about-content'>
                <div className='about-content-1'>
                    <h2 className="mb-3" style={{ fontWeight: "Bold" }}>Make something <span style={{ color: "#9C27B0" }}>Awesome</span> </h2>
                    <p>iNotebook is made from the pain of writing all the things in notebook which is very hectic :(, So we mad an online web platform where you can create, edit, upload, delete your notes/information privately and securely without any disturbancee.
                        you can also access your notes anywhere in your world, at anytime time . So dont forget to Create note because creating anything is always important
                    </p>
                    <Link to="/" className="btn btn-danger ">Add a note</Link>

                </div>
                <div className='about-content-2'>
                    <img src={cloudimg} alt="cloudimg" />
                </div>
            </div>

        </div>
    );
}