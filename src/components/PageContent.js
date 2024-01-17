import { useRef, useState } from "react";
import classes from "./PageContent.module.css";
import emailjs from '@emailjs/browser';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
// const dotenv = require("dotenv");

// dotenv.config({ path: ".env" });

const PageContent = ({ title }) => {

  // const form = useRef();

  // const sendEmail = (e) => {
  //   e.preventDefault();

  //   emailjs.sendForm(process.env.YOUR_SERVICE_ID, process.env.YOUR_TEMPLATE_ID, form.current, process.env.YOUR_PUBLIC_KEY)
  //     .then((result) => {
  //       console.log(result.text);
  //     }, (error) => {
  //       console.log(error.text);
  //     });
  // };


  return (
    <>
      <div className={classes.content}>
        <h1>{title}</h1>
        <p>Our page is destined to give a friendly environment for all kinds of needs regarding moving or traveling.
          The users in need for places to stay in can surf our website to find the most conforting and suitable acomodation for
          them for a good price and a lot of utilities incorporated. </p>
      </div>


      {/* <div className={classes.content}>
        <p>I have a question...
          <form ref={form} onSubmit={sendEmail}>
            <h>Name:</h>
            <input type="text" name="to_name" />
            <p></p>
            <h>Email:</h>
            <input type="email" name="from_name" />
            <p></p>
            <h>Message:</h>
            <textarea name="message" />
            <p></p>
            <Popup trigger={<input style={{ color: "black", border: "-moz-initial" }} type="submit" value="Send" />}
              modal nested>{close => (
                <div className='modal'>
                  <div className='content'> Message Sent Successfully!</div>
                  <div>
                    <button style={{ color: "black" }} onClick={() => close()}>Close </button>
                  </div>
                </div>
              )}
            </Popup>
          </form>
        </p>


        <h2>Contact Us</h2>
        <div>
          <p>Name: Ploscaru Carla</p>
          <p>Email: carlaploscaru@gmail.com</p>
          <p>Phone number: 0771224970 </p>
          <p>Instagram: <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">@booking</a></p>
          <p>Facebook: <a href="https://www.facebook.com/?locale=ro_RO" target="_blank" rel="noopener noreferrer">@booking</a></p>
          <p>Twitter: <a href="https://twitter.com/i/flow/login" target="_blank" rel="noopener noreferrer">@booking</a></p>
          <p>Tiktok: <a href="https://www.tiktok.com/login?enter_from=live_center&enter_method=redirect&lang=en&redirect_url=https%3A%2F%2Flivecenter.tiktok.com" target="_blank" rel="noopener noreferrer">@booking</a></p>
        </div>
      </div> */}

    </>
  );
};

export default PageContent;
