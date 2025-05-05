import React from 'react'
import { useState } from 'react'

function SignupPage(){


  const[values, setValues] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
  });
  
  return (
    <>
      <div className="logoDiv">
        <Link to="/HomePage" className="logo flex">
          <h1>

            Nusantara
          </h1>
        </Link>
      </div>
    </>
  )
}

export default SignupPage