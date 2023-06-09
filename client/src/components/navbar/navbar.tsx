import { gql, useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import { ChangeEvent, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import "../../assets/styles/NavbarElements.css";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstName
      lastName
      username
      email
      phoneNumber
      type
      profilePicture
      bio
      skills
      education
      experience
      languages
      hourlyRate
      rating
      reviews
      gigs
      createdAt
      updatedAt
      userJwtToken {
        token
      }
    }
  }
`;

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

  const [cookies, setCookie, removeCookie] = useCookies(["userJwtToken"]);

  function onLoginSuccess(response: any) {
    console.log(response);
    setCookie("userJwtToken", response.token, { path: "/" });
    window.location.href = "/";
    console.log(cookies);
  }

  const loginHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredEmail = emailRef.current?.value || "";
    const enteredPassword = passwordRef.current?.value || "";
    if (enteredEmail.trim().length === 0 || !enteredEmail.includes("@")) {
      return;
    }
    if (enteredPassword.trim().length === 0) {
      return;
    }
    await login({
      variables: {
        email: enteredEmail,
        password: enteredPassword
      }
    });
    onClose();
  };
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [login, { data, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      console.log(data);
      onLoginSuccess(data.login.userJwtToken);
    },
  });
  if (error) console.log(error);
  if (data) console.log(data);

  return (
    <form onSubmit={loginHandler} className="login_popup" style={{
      width: "20%",
    }}>
      <div className="close_btn" onClick={onClose}></div>
      <h1 style={{
        textAlign: "center",
        color: "black",
      }}>Sign in</h1>
      <div className="input_field">
        <input
          ref={emailRef}
          type="email"
          className="validate"
          placeholder="Email"
        />
      </div>
      <div className="input_field">
        <input
          ref={passwordRef}
          type="password"
          className="validate"
          placeholder="Password"
        />
      </div>
      <a>
        <Button className="second_button" style={{
          color: "green"
        }}
          type="submit"
        >
          Sign in
        </Button>
      </a>
      <br />
      <p>--------------or---------------</p>
      <div className="google_signin">
        <div id="my-signin2">
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </div>
      </div>
      <div className="signup_link">
        <p>Don't have an account?</p>
        <a href="/signup">
          <Button style={{
            alignItems: "center",
          }}>
            Sign up
          </Button>
        </a>
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
            <a href="/signup">Become a Seller</a>
          </li>
          <li>
            <button onClick={togglePopup}>Sign in</button>
          </li>
          <div className="nav-btn">
            <li>
              <a className="nav-btn-link" href="/signup" style={{ fontWeight: "bold" }}>
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
