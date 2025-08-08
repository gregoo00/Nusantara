import React from 'react';
import './About.css';

const About = () => {
  const faqs = [
    {
      question: "Apa itu Nusantara?",
      answer: "Nusantara adalah platform untuk menemukan restoran terbaik di Indonesia, menawarkan ulasan, rekomendasi, dan informasi tentang kuliner lokal."
    },
    {
      question: "Bagaimana cara mencari restoran di platform ini?",
      answer: "Gunakan Search Bar yang terdapat di tengah Navbar untuk mencari restoran berdasarkan nama restoran"
    },
    {
      question: "Apakah saya perlu mendaftar untuk menggunakan layanan ini?",
      answer: "Tidak, Anda dapat menjelajahi restoran tanpa mendaftar. Namun, membuat akun memungkinkan Anda memberikan sebuah review."
    },
    {
      question: "Bagaimana cara menghubungi tim dukungan?",
      answer: "Anda dapat mengisi formulir di halaman 'Contact' untuk mengirim pesan, dan tim kami akan merespons secepat mungkin."
    }
  ];

  return (
    <div className="about">
      <div className="about-content">
        <h1>Tentang Kami</h1>
        <p>
          Nusantara adalah platform kuliner yang didedikasikan untuk mempromosikan kekayaan kuliner Indonesia. 
          Kami membantu Anda menemukan restoran terbaik, dari warung lokal hingga tempat makan mewah, dengan ulasan 
          terpercaya dan rekomendasi yang dipersonalisasi. Misi kami adalah merayakan keberagaman rasa Nusantara dan 
          menghubungkan pecinta kuliner dengan pengalaman gastronomi yang tak terlupakan.
        </p>
        <p>
          Didirikan pada tahun 2025, kami berkomitmen untuk mendukung bisnis kuliner lokal sambil memberikan pengalaman 
          pengguna yang intuitif dan menyenangkan. Bergabunglah dengan kami untuk menjelajahi dunia kuliner Indonesia!
        </p>

        <h2>Pertanyaan Umum (FAQ)</h2>
        <div className="faq-section">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3 className="faq-question">{faq.question}</h3>
              <p className="faq-answer">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;