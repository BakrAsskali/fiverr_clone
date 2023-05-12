import { gql, useMutation } from '@apollo/client';
import {
    FormControl,
    FormLabel,
    Input,
    Card,
    Button,
    Text,
  } from '@chakra-ui/react';
  import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
  import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const UPDATEUSER = gql`
    mutation UpdateUser($updateUserId: ID!, $input: UserInput) {
  updateUser(id: $updateUserId, input: $input) {
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



export const EditClient = () => {
    return(
        <Card
      p="10"
      style={{
        position: "absolute",
        display: "flex",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, 10%)",
        width: "35%",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      }}
        >
            <h1>Manage your account</h1>
            <br />
            <div className="changeUsername">
                <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input placeholder="Enter New Username" type='text' />
                </FormControl>
            </div>
            <br />
            <div className="changeEmail">
                <FormControl>
                    <FormLabel>Email Address</FormLabel>
                    <Input placeholder="Enter Email" type='email' />
                    <br />
                    <br />
                    <Input placeholder="Confirm Email" type='email' />
                </FormControl>
            </div>
            <br />
            <div className="changePassword">
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input placeholder="Enter Old Password" type='password' />
                    <br />
                    <br />
                    <Input placeholder="Enter New Password" type='password' />
                    <br />
                    <br />
                    <Input placeholder="Confirm New Password" type='password' />                </FormControl>
            </div>
            <br />
            <div className="changeProfilePicture">
            <FormControl>
                    <FormLabel>Profile Picture</FormLabel>
                    <Input type='file' />
                </FormControl>
            </div>
            <br />
            <div className="changePhoneNumber">
                <FormControl>
                    <FormLabel>Phone Number</FormLabel>
                    <Input placeholder="Enter Phone Number" type='text' />
                </FormControl>
            </div>
            <br />
            <div className="submit">
                <a href="/">
                <Button type="submit">Confirm</Button>
                </a>
            </div>
            


        
        </Card>
    );
};