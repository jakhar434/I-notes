import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'

export const Signup = () => {
    let history= useNavigate();// it is used to redirect
    const [credential, setCredential] = useState({email:"" , password:"", name:"", cpassword:""})

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })

    }

    const handleclick = async (e)=>{
        e.preventDefault();
        console.log("button is clicked")
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',       
            },
            body: JSON.stringify({name: credential.name, email: credential.email, password: credential.password }),
           
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
          // save the authtoken and redirect
          localStorage.setItem("token", json.authtoken);
          history("/");
        }
        else{
          alert("invaid credentials");
        }
      }

  return (

    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                  <form onSubmit={ handleclick}>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="name">Name</label>
                      <input type="text" id="name" name="name" className="form-control form-control-lg" value={credential.name} style={{border:"1px solid #b2aaaa", fontSize:"17px"}} onChange={onChange}  />   
                    </div>

                    <div className="form-outline mb-4">  
                      <label className="form-label" htmlFor="email">Email</label>
                      <input type="email" id="email" name="email" className="form-control form-control-lg" value={credential.email} style={{border:"1px solid #b2aaaa", fontSize:"17px"}} onChange={onChange}/>                 
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="password">Password</label>
                      <input type="password" id="password" name="password" className="form-control form-control-lg" value={credential.password}  style={{border:"1px solid #b2aaaa", fontSize:"17px"}} onChange={onChange} minLength={5} required/>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="cpassword">Confirm Password</label>
                      <input type="password" id="cpassword" name="cpassword" className="form-control form-control-lg" value={credential.cpassword}  style={{border:"1px solid #b2aaaa", fontSize:"17px"}} onChange={onChange} minLength={5} required/>  
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                    </div>

                    

                  </form>
                  <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/login"
                   className="fw-bold text-body"><u>Login here</u></Link></p>
                  
                  </div> 
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>

  )
}
