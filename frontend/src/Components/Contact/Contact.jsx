import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('Harap isi semua kolom!');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('Harap masukkan email yang valid!');
      return;
    }
    setStatus('Pesan berhasil dikirim!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact">
      <div className="contact-content">
        <h1>Hubungi Kami</h1>
        <p>Kirimkan pesan Anda, dan kami akan segera merespons!</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nama</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama Anda"
              aria-required="true"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan email Anda"
              aria-required="true"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Pesan</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tulis pesan Anda"
              aria-required="true"
            ></textarea>
          </div>
          <button type="submit">Kirim</button>
          {status && <p className="form-status">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;