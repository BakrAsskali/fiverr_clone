import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Card,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import { useRef } from "react";
import { useCookies } from "react-cookie";
import { useHref, useNavigate } from "react-router-dom";
import "../../assets/styles/Login.css";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstName
      lastName
      username
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

export interface LoginProps {
  className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-logins-and-templates
 */
export const Login = () => {

  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const enteredEmail = emailRef.current!.value;
    const enteredPassword = passwordRef.current!.value;

    if (
      enteredEmail.trim().length === 0 ||
      enteredPassword.trim().length === 0
    ) {
      return;
    }

    await login({
      variables: {
        email: enteredEmail,
        password: enteredPassword,
      },
    }).then((response) => {
      navigate("/");
    });
  };

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
    console.log(cookies);
  }

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [login, { data, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data, error) => {
      console.log(data);
      onLoginSuccess(data.login.userJwtToken);
    },
  });

  if (error) {
    console.log(error);
  }

  if (data) {
    console.log(data);
  }

  return (
    <Card
      p="20"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,50%)",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      }}
    >
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Email" ref={emailRef} />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input placeholder="Password" type="password" ref={passwordRef} />
        </FormControl>
        <Button type="submit" style={{
          left: "35%",
          marginTop: "10px",
        }}>
          Login
        </Button>
        <Text textAlign="center">----------------Or---------------</Text>
        <FormControl
          style={{
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <GoogleLogin
            onSuccess={responseMessage}
            onError={errorMessage}
          ></GoogleLogin>
          <Text>Don't have and account?</Text>
          <a href="/signup">
            <Button>Signup</Button>
          </a>
        </FormControl>
      </form>
    </Card>
  );
};
