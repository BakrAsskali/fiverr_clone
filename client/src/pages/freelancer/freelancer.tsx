import { gql, useMutation } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import { ChangeEvent, useRef } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/freelancer.css";

const CREATEUSER_MUTATION = gql`
  mutation CreateUser($input: UserInput) {
  createUser(input: $input) {
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

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-clients-and-templates
 */
export const Freelancer = () => {

  const navigate = useNavigate();
  const responseMessage = (response: any) => {
    console.log(response);
  };
  const errorMessage = () => {
    console.log("error");
  };

  const [cookies, setCookie, removeCookie] = useCookies(["userJwtToken"]);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);

  const signupHandler = (e: any) => {
    e.preventDefault();
    const enteredUsername = usernameRef.current?.value || "";
    const enteredEmail = emailRef.current?.value || "";
    const enteredPassword = passwordRef.current?.value || "";
    const enteredFirstName = firstNameRef.current?.value || "";
    const enteredLastName = lastNameRef.current?.value || "";
    const enteredPhoneNumber = phoneNumberRef.current?.value || "";
    const enteredConfirmPassword = confirmPasswordRef.current?.value || "";
    const enteredType = "freelancer";

    if (
      enteredUsername.trim().length === 0 ||
      enteredEmail.trim().length === 0 ||
      enteredPassword.trim().length === 0 ||
      enteredFirstName.trim().length === 0 ||
      enteredLastName.trim().length === 0 ||
      enteredPhoneNumber.trim().length === 0 ||
      enteredConfirmPassword.trim().length === 0
    ) {
      return;
    }

    if (enteredPassword !== enteredConfirmPassword) {
      return;
    }

    setCookie("userJwtToken", cookies.userJwtToken, { path: "/" });

    const user = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      username: enteredUsername,
      email: enteredEmail,
      password: enteredPassword,
      phoneNumber: enteredPhoneNumber,
      type: enteredType,
    };

    createUser({
      variables: {
        input: user,
      },
    });
  };

  const [createUser, { error, data }] = useMutation(CREATEUSER_MUTATION, {
    onCompleted: (data) => {
      console.log(data);
      setCookie("userJwtToken", data.createUser.userJwtToken.token, {
        path: "/",
      });
      navigate("/");
    },

    onError: (error) => {
      console.log(error);
    },
  });

  if (error) {
    console.log(error);
  }

  if (data)
    console.log(
      data.createUser.userJwtToken.token,
      "data.createUser.userJwtToken.token"
    );
  return (
    <Card
      p="10"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, 10%)",
        width: "50%",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      }}
    >
      <h1>Sign up as a freelancer</h1>
      <form onSubmit={signupHandler}>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input type="text" ref={firstNameRef} isRequired />
          <FormLabel>Last Name</FormLabel>
          <Input type="text" ref={lastNameRef} isRequired />
          <FormLabel>Username</FormLabel>
          <Input type="text" ref={usernameRef} isRequired />
          <FormLabel>Email</FormLabel>
          <Input type="email" ref={emailRef} isRequired />
          <FormLabel>Password</FormLabel>
          <Input type="password" ref={passwordRef} isRequired />
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password" ref={confirmPasswordRef} isRequired />
          <FormLabel>Phone Number</FormLabel>
          <Input type="text" ref={phoneNumberRef} isRequired />
          <FormLabel>Terms and conditions:</FormLabel>
          <Checkbox isRequired>
            Yes, I understand and agree to the Upwork Terms of Service , including
            the User Agreement and Privacy Policy .
          </Checkbox>
          <FormControl
            style={{
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Button type="submit">
              Sign up
            </Button>
            <FormControl>
              <Text>
                ---------------------------------or-------------------------------
              </Text>
              <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            </FormControl>
            <Text>Already have an account?</Text>
            <a href="/login">
              <Button>
                Login
              </Button>
            </a>
          </FormControl>
        </FormControl>
      </form>
    </Card>
  );
};
