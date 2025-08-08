import React, { useEffect, useState } from 'react'
import "./LoginPage.css";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import {FaUtensils} from "react-icons/fa";
import { FaUserShield } from 'react-icons/fa';
import {BsFillShieldLockFill} from "react-icons/bs";
import {AiOutlineSwapRight} from "react-icons/ai"
import Aos from "aos";
import "aos/dist/aos.css";
import Validation from './LoginValidation';
import video from "../../assets/loginVideo.mp4"
import Footer from '../../Components/Footer/footer';

export default function LoginPage() {
  useEffect(() =>{
    Aos.init({duration: 2000});
  }, []);

  const[values, setValues] = useState({
    email :"",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) =>({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  axios.defaults.withCredentials = true;
  const handleSubmit = (event) => {
    event.preventDefault();
    const err = Validation(values);
    setErrors(err);
    if(err.email === "" && err.password === ""){
      axios
        .post("http://localhost:8081/login", values)
        .then(result => {
          console.log('Login response:', result.data);
          
          if(result.data.loginStatus){
            const userData = {
              email: values.email,
              username: result.data.username || values.email.split('@')[0],
              name: result.data.name || result.data.username || values.email.split('@')[0],
              id: result.data.id || result.data.user_id
            };
            
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('authToken', result.data.token || 'authenticated');
            
            window.dispatchEvent(new Event('loginStatusChanged'));
            
            console.log('User data stored:', userData);
            
            navigate("/Home");
          } else {
            alert("No record existed")
          }
        })
        .catch((err) => {
          console.log('Login error:', err);
          alert("Login failed. Please try again.");
        }); 
    }
  } 

  return (
    <>
      <div className="logoDiv">
        <Link to="/Home " className="logo flex">
          <h1>
            <FaUtensils className="icon" />
            Nusantara
          </h1>
        </Link>
      </div>
      <div className="loginpage flex" data-aos="fade-right">
        <div className="contain flex">
          <div className="videoDiv">
            <video className="bgVideo" src={video} autoPlay muted loop></video>
            <div className="textDiv">
              <h2 className="title"> Jelajah Kuliner Indonesia</h2>
              <p>Lapar?tinggal klik!</p>
            </div>
    
          </div>

          <div className="formDiv flex">
            <div className="headerDiv">
              <h3>Welcome!</h3>
            </div>

            <form action="" onSubmit={handleSubmit} className="form grid">
              <div className="inputDiv">
                <label htmlFor="email">Email</label>
                <div className="input flex">
                  <FaUserShield className="icon" />
                  <input
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleInput}
                    placeholder="Enter Email"
                  />
                </div>
              </div>
              {errors.email &&(
                <span className="showMessage"> {errors.email}</span>
              )}
              <div className="inputDiv">
                <label htmlFor="password">Password</label>
                <div className="input flex">
                  <BsFillShieldLockFill className="icon" />
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleInput}
                    placeholder="Enter password"
                  />
                </div>
              </div>
              {errors.password && (
                <span className="showMessage"> {errors.password}</span>
              )}

              <button type="submit" className="login-btn">
                <span>Login</span>
                <AiOutlineSwapRight className="icon" />
              </button>

              <div className="footerDiv flex">
                <span className="text">Don&apos;t have an account?</span>
                <Link to={"/Signup"}>
                  <button className="signup-btn">Sign Up</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer /> 
    </>
  );
}