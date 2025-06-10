import { useEffect } from "react";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import "./Main.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// Placeholder images
import cimol from "../../assets/cimol.jpg";
import cimol3 from "../../assets/CimolBojot3.jpeg";
import cimol2 from "../../assets/cimol bojot2.webp";
import WarungNasi from "../../assets/WarungNasi.jpg";
import NasgorLegend from "../../assets/NasgorLegend.jpeg";

// Data for each category
const umkm = [
  {
    id: 1,
    imgSrc: [cimol, cimol3, cimol2],
    foodTitle: "Cimol Bojot  AA Anggrek",
    location: "Jl. Anggrek Cakra No.9 4, RT.4/RW.6, Sukabumi Utara, Kec. Kb. Jeruk, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11530",
    grade: "4.3",
    fees: " Rp.6.000 - 20.000/orang",
    description: "Cimol Bojot AA adalah jajanan khas Bandung yang sedang viral, terutama di kalangan pecinta kuliner pedas. Berbahan dasar tepung tapioka, cimol ini memiliki tekstur kenyal dan tidak kopong, disajikan dengan bumbu tabur yang gurih, pedas, dan aromatik, seperti balado daun jeruk, bawang goreng, atau bon cabe",
  },
  {
    id: 2,
    imgSrc: [WarungNasi],
    foodTitle: "Warung Nasi Sederhana Pring Lestari",
    location: "RQ2Q+M4V, RT.5/RW.11, Palmerah, West Jakarta City, Jakarta 11480",
    grade: "4.5",
    fees: "Rp.10.000 - 30.000/Orang",
    description: "Warung makan tradisional Indonesia yang terkenal dengan hidangan sederhana, terjangkau, dan lezat. Biasanya menyajikan aneka lauk-pauk seperti ayam goreng, tempe orek, telur balado, sayur kolplay, dan ikan goreng, disandingkan dengan nasi putih hangat. Warteg dikenal sebagai tempat makan yang ramah di kantong, sering menjadi pilihan pekerja, mahasiswa, dan masyarakat umum untuk makan sehari-hari.",
  },
  {
    id: 3,
    imgSrc: [NasgorLegend],
    foodTitle: "Nasi Goreng Legend Binus Syahdan",
    location: "Jl. H. Sennin No.51, Palmerah, Kec. Palmerah, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11480",
    grade: "4.2",
    fees: "Rp.15.000 - 35.000/Orang",
    description: "Nasi goreng dengan cita rasa autentik Asia Tenggara, disajikan dengan porsi yang memuaskan dan kualitas rasa konsisten, meraih rating 5 bintang dari pengunjung. Selain nasi goreng, mereka menyediakan berbagai hidangan Asia dan Indonesia lainnya.",
  },
];

const affordable = [
  {
    id: 1,
    imgSrc: [cimol, cimol3, cimol2],
    foodTitle: "Cimol Bojot  AA Anggrek",
    location: "Jl. Anggrek Cakra No.9 4, RT.4/RW.6, Sukabumi Utara, Kec. Kb. Jeruk, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11530",
    grade: "4.3",
    fees: " Rp.6.000 - 20.000/Orang",
    description: "Cimol Bojot AA adalah jajanan khas Bandung yang sedang viral, terutama di kalangan pecinta kuliner pedas. Berbahan dasar tepung tapioka, cimol ini memiliki tekstur kenyal dan tidak kopong, disajikan dengan bumbu tabur yang gurih, pedas, dan aromatik, seperti balado daun jeruk, bawang goreng, atau bon cabe",
  },
  {
    id: 2,
    imgSrc: [WarungNasi],
    foodTitle: "Warung Nasi Sederhana Pring Lestari",
    location: "RQ2Q+M4V, RT.5/RW.11, Palmerah, West Jakarta City, Jakarta 11480",
    grade: "4.5",
    fees: "Rp.10.000 - 30.000/Orang",
    description: "Warung makan tradisional Indonesia yang terkenal dengan hidangan sederhana, terjangkau, dan lezat. Biasanya menyajikan aneka lauk-pauk seperti ayam goreng, tempe orek, telur balado, sayur kolplay, dan ikan goreng, disandingkan dengan nasi putih hangat. Warteg dikenal sebagai tempat makan yang ramah di kantong, sering menjadi pilihan pekerja, mahasiswa, dan masyarakat umum untuk makan sehari-hari.",
  },
  {
    id: 3,
    imgSrc: [NasgorLegend],
    foodTitle: "Nasi Goreng Legend Binus Syahdan",
    location: "Jl. H. Sennin No.51, Palmerah, Kec. Palmerah, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11480",
    grade: "4.2",
    fees: "Rp.15.000 - 35.000/Orang",
    description: "Nasi goreng dengan cita rasa autentik Asia Tenggara, disajikan dengan porsi yang memuaskan dan kualitas rasa konsisten, meraih rating 5 bintang dari pengunjung. Selain nasi goreng, mereka menyediakan berbagai hidangan Asia dan Indonesia lainnya.",
  },
];

const trending = [
  {
    id: 1,
    imgSrc: [cimol, cimol3, cimol2],
    foodTitle: "Cimol Bojot  AA Anggrek",
    location: "Jl. Anggrek Cakra No.9 4, RT.4/RW.6, Sukabumi Utara, Kec. Kb. Jeruk, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11530",
    grade: "4.3",
    fees: " Rp.6.000 - 20.000/orang",
    description: "Cimol Bojot AA adalah jajanan khas Bandung yang sedang viral, terutama di kalangan pecinta kuliner pedas. Berbahan dasar tepung tapioka, cimol ini memiliki tekstur kenyal dan tidak kopong, disajikan dengan bumbu tabur yang gurih, pedas, dan aromatik, seperti balado daun jeruk, bawang goreng, atau bon cabe",
  },
  {
    id: 2,
    imgSrc: [WarungNasi],
    foodTitle: "Warung Nasi Sederhana Pring Lestari",
    location: "RQ2Q+M4V, RT.5/RW.11, Palmerah, West Jakarta City, Jakarta 11480",
    grade: "4.5",
    fees: "Rp.10.000 - 30.000/orang",
    description: "Warung makan tradisional Indonesia yang terkenal dengan hidangan sederhana, terjangkau, dan lezat. Biasanya menyajikan aneka lauk-pauk seperti ayam goreng, tempe orek, telur balado, sayur kolplay, dan ikan goreng, disandingkan dengan nasi putih hangat. Warteg dikenal sebagai tempat makan yang ramah di kantong, sering menjadi pilihan pekerja, mahasiswa, dan masyarakat umum untuk makan sehari-hari.",
  },
  {
    id: 3,
    imgSrc: [NasgorLegend],
    foodTitle: "Nasi Goreng Legend Binus Syahdan",
    location: "Jl. H. Sennin No.51, Palmerah, Kec. Palmerah, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11480",
    grade: "4.2",
    fees: "Rp.15.000 - 35.000/Orang",
    description: "Nasi goreng dengan cita rasa autentik Asia Tenggara, disajikan dengan porsi yang memuaskan dan kualitas rasa konsisten, meraih rating 5 bintang dari pengunjung. Selain nasi goreng, mereka menyediakan berbagai hidangan Asia dan Indonesia lainnya.",
  },
];

const renderStars = (grade) => {
  const stars = [];
  const rating = parseFloat(grade);
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const emptyStars = 5 - Math.ceil(rating);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="star-icon star-filled" />);
  }
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="star-icon star-half" />);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="star-icon star-empty" />);
  }
  return stars;
};

const Main = () => {
  // Initialize AOS for animations
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="main-page">
      <section className="category-section">
        <h2 className="category-title" data-aos="fade-up">UMKM</h2>
        <div className="restaurant-slider" data-aos="fade-up">
          {umkm.map((restaurant) => (
            <Link key={restaurant.id} to={`/RestaurantPage/${restaurant.id}`} className="restaurant-card-link">
              <div className="restaurant-card">
                <img
                  src={restaurant.imgSrc[0]} // Use the first image for the card
                  alt={restaurant.foodTitle}
                  className="restaurant-image"
                />
                <div className="restaurant-content">
                  <h3 className="restaurant-title">{restaurant.foodTitle}</h3>
                  <p className="restaurant-location">{restaurant.location}</p>
                  <p className="restaurant-fees">{restaurant.fees}</p>
                  <div className="restaurant-grade">
                    {renderStars(restaurant.grade)}
                    <span className="rating-value">{restaurant.grade}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="category-section">
        <h2 className="category-title" data-aos="fade-up">Affordable</h2>
        <div className="restaurant-slider" data-aos="fade-up">
          {affordable.map((restaurant) => (
            <Link key={restaurant.id} to={`/RestaurantPage/${restaurant.id}`} className="restaurant-card-link">
              <div className="restaurant-card">
                <img
                  src={restaurant.imgSrc[0]}
                  alt={restaurant.foodTitle}
                  className="restaurant-image"
                />
                <div className="restaurant-content">
                  <h3 className="restaurant-title">{restaurant.foodTitle}</h3>
                  <p className="restaurant-location">{restaurant.location}</p>
                  <p className="restaurant-fees">{restaurant.fees}</p>
                  <div className="restaurant-grade">
                    {renderStars(restaurant.grade)}
                    <span className="rating-value">{restaurant.grade}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="category-section">
        <h2 className="category-title" data-aos="fade-up">Trending</h2>
        <div className="restaurant-slider" data-aos="fade-up">
          {trending.map((restaurant) => (
            <Link key={restaurant.id} to={`/RestaurantPage/${restaurant.id}`} className="restaurant-card-link">
              <div className="restaurant-card">
                <img
                  src={restaurant.imgSrc[0]}
                  alt={restaurant.foodTitle}
                  className="restaurant-image"
                />
                <div className="restaurant-content">
                  <h3 className="restaurant-title">{restaurant.foodTitle}</h3>
                  <p className="restaurant-location">{restaurant.location}</p>
                  <p className="restaurant-fees">{restaurant.fees}</p>
                  <div className="restaurant-grade">
                    {renderStars(restaurant.grade)}
                    <span className="rating-value">{restaurant.grade}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Main;