import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
export const Login =  (props) => {
    let history= useNavigate();// it is used to redirect
    const [credential, setCredential] = useState({email:"" , password:""})

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })

    }

    const handleclick= async (e)=>{
        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',       
            },
            body: JSON.stringify({email: credential.email, password: credential.password }),
           
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            // save the authtoken and redirect
            localStorage.setItem('token', json.authToken);
            props.showalert("logged in successsfully", "success")
            history("/");
           
        }
        else{
            props.showalert("Invalid Credentials", "danger");
        }

    }
    return (
        <div className='logincomponent-css'>
            <div className="container h-100" >
                <div className="d-flex justify-content-center h-100">
                    <div className="user_card">
                        <div className="d-flex justify-content-center">
                            <div className="brand_logo_container">
                                <img src="https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/173190927/original/246db8bbb2983d568daa3e530c66004354afb8c2/design-modern-notebook-book-ebook-cover-for-you.jpg" className="brand_logo" alt="Logo" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-center form_container">
                            <form onSubmit={handleclick} >
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" name="email" className="form-control input_user" id="email" onChange={onChange} value={credential.email} placeholder="email" />
                                </div>
                                <div className="input-group mb-2">
                                    <div className="input-group-append">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" name="password" className="form-control input_pass" id="password" onChange={onChange} value={credential.password} placeholder="password" />
                                </div>

                                <div className="d-flex justify-content-center mt-3 login_container">
                                    <button type="submit" name="button" className="btn login_btn">Login</button>
                                </div>
                            </form>
                        </div>

                        <div className="mt-4">
                            <div className="d-flex justify-content-center links">
                                Don't have an account? <Link to="/signup" className="ml-2">Sign Up</Link>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
