import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import "../../assets/styles/NavbarElements.css";

interface PopupProps {
  onClose: () => void;
}

function PopupComponent(props: PopupProps) {
  const { onClose } = props;
  const responseMessage = (response: any) => {
    console.log(response);
  };
  const errorMessage = (error: any) => {
    console.log(error);
  };

  return (
    <div className="login_popup">
      <div className="close_btn" onClick={onClose}></div>
      <h1>Sign in</h1>
      <div className="input_field">
        <input type="email" className="validate" placeholder="Email" />
      </div>
      <div className="input_field">
        <input type="password" className="validate" placeholder="Password" />
      </div>
      <button className="second_button">Sign in</button>
      <br />
      <p>--------------or---------------</p>
      <div className="google_signin">
        <div id="my-signin2">
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </div>
      </div>
      <div className="signup_link">
        <p>Don't have an account?</p> <a href="/signup">Sign up</a>
      </div>
    </div>
  );
}
export interface NavbarProps {
  className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-navbars-and-templates
 */
export const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const togglePopup = () => {
    setIsActive(!isActive);
  };
  return (
    <nav>
      <a href="/">
        <h1>Logo</h1>
      </a>
      <br />
      <div className="nav-menu">
        <a href="/Gigs" style={{ fontWeight: "bold" }}>
          Explore
        </a>
        <button onClick={togglePopup}>Sign in</button>
      </div>
      <div className="nav-btn">
        <a
          className="nav-btn-link"
          href="/signup"
          style={{ fontWeight: "bold" }}
        >
          Join
        </a>
      </div>
      {isActive && <PopupComponent onClose={togglePopup} />}
    </nav>
  );
};
