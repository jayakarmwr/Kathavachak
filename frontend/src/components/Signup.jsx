import React from 'react'
import './Signup.css';

const Signup = () => {
  return (
    <div className='container-1'>
        <div className='imageBlock-1'>
            
        </div>
        <div className='Signup-Block'>
            <form>
                <h1 className='Signup'>Signup</h1>
                <div className='input-box-1'>
                    <input type='text' placeholder='Username' required/>
                </div>
                <div className='input-box-1'>
                    <input type='text' placeholder='Email-id' required/>
                </div>
                <button type='submit' className='button'>Signup</button>
                <div className="login">
                    <p>Already have an account? <a href="/login">Login</a></p>
                </div>
            </form>
        </div>
    </div>
    
  )
}
export default Signup;