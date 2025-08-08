import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Aos from "aos";
import axios from "axios";
import "aos/dist/aos.css";
import "./Restaurant.css";

import cimol from "../../assets/cimol.jpg";
import cimol3 from "../../assets/CimolBojot3.jpeg";
import cimol2 from "../../assets/cimol bojot2.webp";
import WarungNasi from "../../assets/WarungNasi.jpg";
import NasgorLegend from "../../assets/NasgorLegend.jpeg";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/footer";

const Data = [
  {
    id: 1,
    imgSrc: [cimol, cimol3, cimol2],
    foodTitle: "Cimol Bojot AA Anggrek",
    location:
      "Jl. Anggrek Cakra No.9 4, RT.4/RW.6, Sukabumi Utara, Kec. Kb. Jeruk, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11530",
    grade: "4.3",
    fees: "Rp.6.000 - 20.000/orang",
    description: "Cimol Bojot AA adalah jajanan khas Bandung yang sedang viral..."
  },
  {
    id: 2,
    imgSrc: [WarungNasi],
    foodTitle: "Warung Nasi Sederhana Pring Lestari",
    location: "RQ2Q+M4V, RT.5/RW.11, Palmerah, West Jakarta City, Jakarta 11480",
    grade: "4.5",
    fees: "Rp.10.000 - 30.000/orang",
    description: "Warung makan tradisional Indonesia..."
  },
  {
    id: 3,
    imgSrc: [NasgorLegend],
    foodTitle: "Nasi Goreng Legend Binus Syahdan",
    location: "Jl. H. Sennin No.51, Palmerah, Kec. Palmerah, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11480",
    grade: "4.2",
    fees: "Dibawah Rp.50.000/orang",
    description: "Nasi goreng dengan cita rasa autentik Asia Tenggara."
  }
];

const Recommendations = [
  { id: 1, imgSrc: [cimol3], foodTitle: "Cimol", location: "Jl. Anggrek Cakra No.9", grade: "4.3" },
  { id: 2, imgSrc: WarungNasi, foodTitle: "Warung Nasi", location: "Palmerah, Jakarta", grade: "4.5" },
  { id: 3, imgSrc: NasgorLegend, foodTitle: "Nasi Goreng Legend", location: "Jl. H. Sennin No.51", grade: "4.2" }
];

const RestaurantPage = () => {
  const { id } = useParams();
  const restaurant = Data.find((item) => item.id === parseInt(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const user_id = 1; // contoh user login

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:8081/reviews/${id}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!restaurant) {
    return <div className="not-found">Restaurant not found</div>;
  }

  const handleRating = (value) => setRating(value);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() && rating > 0) {
      axios.post("http://localhost:8081/reviews", {
        restaurant_id: parseInt(id),
        user_id,
        rating,
        comment
      }).then(res => {
        setReviews(prev => [...prev, res.data]);
        setComment("");
        setRating(0);
      }).catch(err => console.error(err));
    }
  };

  const handleDeleteReview = (reviewId) => {
    axios.delete(`http://localhost:8081/reviews/${reviewId}/${user_id}`)
      .then(() => {
        setReviews(reviews.filter(r => r.id !== reviewId));
      })
      .catch(err => console.error(err));
  };

  const handleEditReview = (review) => {
    setEditMode(review.id);
    setRating(review.rating);
    setComment(review.comment);
  };

  const handleUpdateReview = (e) => {
    e.preventDefault();
    if (comment.trim() && rating > 0 && editMode) {
      axios.put(`http://localhost:8081/reviews/${editMode}/${user_id}`, {
        rating,
        comment
      }).then(() => {
        setReviews(reviews.map(r =>
          r.id === editMode ? { ...r, rating, comment } : r
        ));
        setEditMode(null);
        setComment("");
        setRating(0);
      }).catch(err => console.error(err));
    }
  };

  const renderStars = (grade) => {
    const stars = [];
    const ratingValue = parseFloat(grade);
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(ratingValue)) stars.push(<FaStar key={i} className="star-icon star-filled" />);
      else if (i === Math.ceil(ratingValue) && ratingValue % 1 !== 0) stars.push(<FaStarHalfAlt key={i} className="star-icon star-half" />);
      else stars.push(<FaRegStar key={i} className="star-icon star-empty" />);
    }
    return stars;
  };

  const handlePrevSlide = () => {
    if (currentImageIndex > 0) setCurrentImageIndex(currentImageIndex - 1);
  };

  const handleNextSlide = () => {
    if (currentImageIndex < restaurant.imgSrc.length - 1) setCurrentImageIndex(currentImageIndex + 1);
  };

  const filteredRecommendations = Recommendations.filter(rec => rec.id !== parseInt(id));

  return (
    <>
      <Navbar />
      <section className="restaurant-page">
        <div className="container">
          
          <div data-aos="fade-up" className="image-slider">
            {restaurant.imgSrc.map((img, index) => (
              <img key={index} src={img} alt={restaurant.foodTitle}
                className={`slider-image ${currentImageIndex === index ? "active" : ""}`} />
            ))}
            {currentImageIndex > 0 && <button className="slider-arrow left" onClick={handlePrevSlide}><FaArrowLeft /></button>}
            {currentImageIndex < restaurant.imgSrc.length - 1 && <button className="slider-arrow right" onClick={handleNextSlide}><FaArrowRight /></button>}
            <div className="slider-indicators">
              {restaurant.imgSrc.map((_, index) => (
                <button key={index} className={`indicator ${currentImageIndex === index ? "active" : ""}`}
                  onClick={() => setCurrentImageIndex(index)}></button>
              ))}
            </div>
          </div>

          
          <div data-aos="fade-up" className="restaurant-details">
            <h1 className="restaurant-title">{restaurant.foodTitle}</h1>
            <p className="restaurant-location">{restaurant.location}</p>
            <div className="restaurant-rating">{renderStars(restaurant.grade)}
              <span className="rating-value">{restaurant.grade}</span>
            </div>
            <p className="restaurant-fees">{restaurant.fees}</p>
            <p className="restaurant-description">{restaurant.description}</p>
          </div>

          
          <div data-aos="fade-up" className="review-section">
            <h2 className="section-title">{editMode ? "Edit Review" : "Leave a Review"}</h2>
            <div className="rating-input">
              <span className="rating-label">Rate:</span>
              {[1, 2, 3, 4, 5].map(value => (
                <FaStar key={value}
                  className={`star-icon rating-star ${value <= rating ? "star-filled" : "star-empty"}`}
                  onClick={() => handleRating(value)} />
              ))}
            </div>
            <div className="comment-input">
              <textarea className="comment-textarea" rows="4"
                placeholder="Write your review..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}></textarea>
            </div>
            {editMode ? (
              <button className="submit-button" onClick={handleUpdateReview}>Update Review</button>
            ) : (
              <button className="submit-button" onClick={handleCommentSubmit}>Submit Review</button>
            )}

            
            <div className="reviews-list">
              {reviews.length > 0 ? reviews.map((review) => (
                <div key={review.id} className={`review-item ${editMode === review.id ? "editing" : ""}`}>
                  <div className="review-top">
                    <div className="review-rating">
                      {renderStars(review.rating)}
                      <span className="rating-value">{review.rating}</span>
                    </div>
                    {review.user_id === user_id && (
                      <div className="review-actions">
                        <button className="edit-button" onClick={() => handleEditReview(review)}>Edit</button>
                        <button className="delete-button" onClick={() => handleDeleteReview(review.id)}>Delete</button>
                      </div>
                    )}
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              )) : <p className="no-reviews">No reviews yet. Be the first to leave one!</p>}
            </div>
          </div>

          
          <div data-aos="fade-up" className="recommendations">
            <h2 className="section-title">Recommended Restaurants</h2>
            <div className="recommendations-grid">
              {filteredRecommendations.map((rec) => (
                <Link key={rec.id} to={`/RestaurantPage/${rec.id}`} className="recommendation-card-link">
                  <div className="recommendation-card">
                    <img src={rec.imgSrc} alt={rec.foodTitle} className="recommendation-image" />
                    <div className="recommendation-content">
                      <h3 className="recommendation-title">{rec.foodTitle}</h3>
                      <p className="recommendation-location">{rec.location}</p>
                      <div className="recommendation-rating">{renderStars(rec.grade)}
                        <span className="rating-value">{rec.grade}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default RestaurantPage;
