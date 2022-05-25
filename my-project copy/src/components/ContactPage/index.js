import React from 'react'
import '../ContactPage/style.css'
import Navbar from '../Navbar/index'

const ContactUs  = () => {
    return(
    <>
        <Navbar />

      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
      />
      <title>CSS Responsive Contact Form With Google Map</title>
      <link href="css/style.css" rel="stylesheet" type="text/css" />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        crossOrigin="anonymous"
      />
      <div className="contact-wrap">
        <div className="contact-in">
          <h1>Contact Info</h1>
          <h2>
            <i className="fa fa-phone" aria-hidden="true" /> Phone
          </h2>
          <p>123-456-789</p>
          <h2>
            <i className="fa fa-envelope" aria-hidden="true" /> Email
          </h2>
          <p>info@unicankaya.com</p>
          <h2>
            <i className="fa fa-map-marker" aria-hidden="true" /> Address
          </h2>
          <p>Çankaya University , Ankara</p>
          <ul>
            <li>
              <a href="#">
                <i className="fa fa-facebook" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-twitter" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-google" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-instagram" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
        <div className="contact-in">
          <h1>Send a Message</h1>
          <form>
            <input
              type="text"
              placeholder="Full Name"
              className="contact-in-input"
            />
            <input type="text" placeholder="Email" className="contact-in-input" />
            <input type="text" placeholder="Subject" className="contact-in-input" />
            <textarea
              placeholder="Message"
              className="contact-in-textarea"
              defaultValue={""}
            />
            <input type="submit" defaultValue="SUBMIT"  value="SEND"  className="contact-in-btn" />
          </form>
        </div>
        <div className="contact-in">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2558.387221880294!2d32.56181822975239!3d39.818225577677524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d317c30f845953%3A0x5f3e95544c6eecc7!2s%C3%87ankaya%20University!5e0!3m2!1sen!2sin!4v1652619083987!5m2!1sen!2sin"
            width="100%"
            height="auto"
            frameBorder={0}
            style={{ border: 0 }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex={0}
          />
        </div>
      </div>
      </>
    )
}

export default ContactUs