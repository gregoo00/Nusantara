import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import video from "../../assets/loginVideo.mp4";

import Aos from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const navigate = useNavigate();

  return (
    <section className="home">
      <div className="overlay"></div>
      <video src={video} muted autoPlay loop type="loginVideo.mp4"></video>

      <div className="homeContent container">
        <div className="textDiv">
          <span data-aos="fade-up" className="smallText">
            Discover Our Culinary Delights
          </span>

          <h1 data-aos="fade-up" className="homeTitle" style={{ textDecoration: 'none' }}>
            Find Your Perfect Meal and Explore a Variety of Delicious Dishes from Local Vendors
          </h1>
        </div>
      </div>
    </section>
  );
}

export default Home;