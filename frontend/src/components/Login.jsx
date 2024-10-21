import React from 'react'
import './Login.css';

const Login = () => {
  return (
    <div className='container'>
        <div className='imageBlock'>
            
        </div>
        <div className='LoginBlock'>
            {/* <h1 className='heading'>Katha Vaachak</h1> */}
            <form action=''>
                <h1 className='Login'>Login</h1>
                <div className='input-box'>
                    <input type='text' placeholder='Username' required/>
                </div>
                <div className='input-box'>
                    <input type='text' placeholder='Password' required/>
                </div>
                <div className="forgot">
                        <a href="#">Forgot Password?</a>
                </div>
                <button type='submit'>Login</button>
                <div className="register">
                    <p>Don't have an account? <a href="#">Register</a></p>
                </div>
            </form>
        </div>
    </div>
    
  )
}
export default Login;