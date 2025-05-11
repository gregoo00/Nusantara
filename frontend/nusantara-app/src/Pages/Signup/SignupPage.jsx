import React, { useEffect, useState } from 'react';
import './SignupPage.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaUtensils } from 'react-icons/fa';
import { FaUserShield, FaEnvelope } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Footer from '../../Components/Footer/footer';
import video from "../../assets/loginVideo.mp4";

export default function SignupPage() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const [values, setValues] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Basic validation
    const err = {
      email: values.email ? '' : 'Email is required',
      username: values.username ? '' : 'Username is required',
      password: values.password ? '' : 'Password is required',
      confirmPassword: values.confirmPassword
        ? values.password === values.confirmPassword
          ? ''
          : 'Passwords do not match'
        : 'Confirm Password is required',
    };
    setErrors(err);

    if (!err.email && !err.username && !err.password && !err.confirmPassword) {
      axios
        .post('http://localhost:8081/signup', values)
        .then((result) => {
          if (result.data.signupStatus) {
            navigate('/login');
          } else {
            alert('Signup failed. Please try again.');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div className="logoDiv">
        <Link to="/HomePage" className="logo flex">
          <h1>
            <FaUtensils className="icon" />
            Nusantara
          </h1>
        </Link>
      </div>
      <div className="signuppage flex" data-aos="fade-right">
        <div className="contain flex">
          <div className="videoDiv">
            <video className="bgVideo" src={video} autoPlay muted loop></video>
          </div>

          <div className="formDiv flex">
            <div className="headerDiv">
              <h3>Create an Account</h3>
            </div>

            <form action="" onSubmit={handleSubmit} className="form grid">
              <div className="inputDiv">
                <label htmlFor="email">Email</label>
                <div className="input flex">
                  <FaEnvelope className="icon" />
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleInput}
                    placeholder="Enter email"
                  />
                </div>
                {errors.email && (
                  <span className="showMessage">{errors.email}</span>
                )}
              </div>

              <div className="inputDiv">
                <label htmlFor="username">Username</label>
                <div className="input flex">
                  <FaUserShield className="icon" />
                  <input
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleInput}
                    placeholder="Enter username"
                  />
                </div>
                {errors.username && (
                  <span className="showMessage">{errors.username}</span>
                )}
              </div>

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
                {errors.password && (
                  <span className="showMessage">{errors.password}</span>
                )}
              </div>

              <div className="inputDiv">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input flex">
                  <BsFillShieldLockFill className="icon" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleInput}
                    placeholder="Confirm password"
                  />
                </div>
                {errors.confirmPassword && (
                  <span className="showMessage">{errors.confirmPassword}</span>
                )}
              </div>

              <button type="submit" className="signup-btn">
                <span>Sign Up </span>
                <AiOutlineSwapRight className="icon" />
              </button>

              <div className="footerDiv flex">
                <span className="text">Already have an account?</span>
                <Link to={"/Login"}>
                  <button className="login-btn">Login</button>
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