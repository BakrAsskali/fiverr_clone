import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import "../../assets/styles/NavbarElements.css";
import { AUTH_TOKEN } from "../../constants";

interface PopupProps {
  onClose: () => void;
}

function PopupComponent(props: PopupProps) {
  const { onClose } = props;
  const responseMessage = (response: any) => {
    console.log(response);
  };
  const errorMessage = () => {
    console.log("error");
  };

  return (
    <form className="login_popup">
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
    </form>
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
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const togglePopup = () => {
    setIsActive(!isActive);
  };
  return (
    <nav>
      <div className="logo">
        <a href="/">
          <span className="text">fiverr</span>
          <span className="dot">.</span>
        </a>
      </div>
      
      <br />
      <div className="nav-menu">
        <ul>
          <li>
            <a href="/Gigs" style={{ fontWeight: "bold" }}>
              Explore
            </a>
          </li>
          <li>
            <button onClick={togglePopup}>Sign in</button>
          </li>
          <div className="nav-btn">
            <li>
              <a className="nav-btn-link" href="/signup"style={{ fontWeight: "bold" }}>
                Join
              </a>
            </li>
          </div>
        </ul>
        
        
      </div>
      
      {isActive && <PopupComponent onClose={togglePopup} />}
    </nav>
  );
};
