import React from "react";
import "../../assets/styles/editClient.css";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Card,
    Button,
    Text,
  } from '@chakra-ui/react';
  import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
  import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";



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