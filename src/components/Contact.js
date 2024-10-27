import React from 'react';

const Contact = () => (
  <section className="contact">
    <h2>Contact Us</h2>
    <p>We're here to help. Reach out to us with any questions.</p>
    <form>
      <input type="text" placeholder="Your Name" required />
      <input type="email" placeholder="Your Email" required />
      <textarea placeholder="Your Message" rows="4" required></textarea>
      <button type="submit">Send Message</button>
    </form>
  </section>
);

export default Contact;
