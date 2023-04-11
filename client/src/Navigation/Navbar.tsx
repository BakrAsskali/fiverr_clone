import { GoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import "/home/bakaria19/Documents/Web/fiverr_clone/client/src/Navigation/NavbarElements.css";

interface PopupProps {
  onClose: () => void;
}

function PopupComponent(props: PopupProps) {
  const { onClose } = props;
  const [isActive, setIsActive] = useState(false);
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

const Navbar = () => {
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
        <a href="/explore" style={{ fontWeight: "bold" }}>
          Explore
        </a>
        <button onClick={togglePopup}>Sign in</button>
      </div>
      <div className="nav-btn">
        <a className="nav-btn-link" href="/join" style={{ fontWeight: "bold" }}>
          Join
        </a>
      </div>
      {isActive && <PopupComponent onClose={togglePopup} />}
    </nav>
  );
};

export default Navbar;
