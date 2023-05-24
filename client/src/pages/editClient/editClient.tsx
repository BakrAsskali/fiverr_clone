import { gql, useMutation, useQuery } from '@apollo/client';
import {
    Button,
    Card,
    FormControl,
    FormLabel,
    Input,
    Text,
} from '@chakra-ui/react';
import { useRef } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const GETUSER = gql`
    query GetUser($userJwtToken: String!) {
        getUser(userJwtToken: $userJwtToken) {
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

const DELETEUSER = gql`
    mutation DeleteUser($userJwtToken: String!) {
        DeleteUser(userJwtToken: $userJwtToken)
}
`;



export const EditClient = () => {

    const navigate = useNavigate();

    const cookies = new Cookies();
    const userToken = cookies.get('userJwtToken');

    const [deleteUser] = useMutation(DELETEUSER, {
        onCompleted: (data) => {
            console.log(data);
            onDeleteSuccess(data);
        },
    });

    const { data, error } = useQuery(GETUSER, {
        variables: {
            userJwtToken: userToken,
        },
    });

    const [UpdateUser] = useMutation(UPDATEUSER, {
        onCompleted: (data) => {
            console.log(data);
            onUpdateSuccess(data);
        },

        onError: (error) => {
            console.log(error);
        },


    });

    function onDeleteSuccess(data: any) {
        cookies.remove('userJwtToken');
        navigate('/');
    }

    const handleDeleteUser = async (e: any) => {
        e.preventDefault();
        const confirmation = confirmationRef.current?.value;

        if (confirmation === 'DELETE') {
            deleteUser({
                variables: {
                    userJwtToken: userToken,
                },
            });
        }
    };

    if (error) {
        console.log(error);
    }

    function onUpdateSuccess(data: any) {
        navigate('/');
    }

    const handleUpdateUser = (e: any) => {
        e.preventDefault();
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const phoneNumber = phoneNumberRef.current?.value;
        const profilePicture = profilePictureRef.current?.value;
        const bio = bioRef.current?.value;
        const skills = skillsRef.current?.value;
        const education = educationRef.current?.value;
        const experience = experienceRef.current?.value;
        const languages = languagesRef.current?.value;
        const hourlyRate = hourlyRateRef.current?.value;

        const user = {
            firstName,
            lastName,
            username,
            email,
            phoneNumber,
            profilePicture,
            bio,
            skills,
            education,
            experience,
            languages,
            hourlyRate,
        };

        UpdateUser({
            variables: {
                input: user,
            },
        });
    };

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const profilePictureRef = useRef<HTMLInputElement>(null);
    const bioRef = useRef<HTMLInputElement>(null);
    const skillsRef = useRef<HTMLInputElement>(null);
    const educationRef = useRef<HTMLInputElement>(null);
    const experienceRef = useRef<HTMLInputElement>(null);
    const languagesRef = useRef<HTMLInputElement>(null);
    const hourlyRateRef = useRef<HTMLInputElement>(null);
    const confirmationRef = useRef<HTMLInputElement>(null);

    return (
        <div style={{
            backgroundColor: '#F5F5F5',
            minWidth: '100vw',
        }}>
            <Card maxWidth="80%" style={{
                margin: 'auto',
            }}>
                <form onSubmit={handleUpdateUser}>
                    <Card p="10">
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
                                <Input placeholder="Confirm New Password" type='password' />
                            </FormControl>
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
                </form>
                <br />
                <br />
                <br />
                <FormControl >
                    <FormLabel style={{
                        color: "#FF0000",
                        width: "100%",
                        marginLeft: "30vw",
                    }}
                        fontSize="2xl"
                    ><b>Delete Account</b>

                    </FormLabel>
                    <Text style={{
                        color: "#FF0000",
                        width: "100%",
                    }}>
                        <b style={{
                            fontSize: "1.2vw",
                        }}>Attention
                            <br />
                            This action cannot be undone. This will permanently delete your account and all of your data. Please type in your password to confirm.
                        </b>
                    </Text>
                    <br />
                    <Input placeholder="Enter Password" type='password' ref={confirmationRef} />
                    <br />
                    <br />
                    <Input placeholder="Confirm Password" type='password' />
                    <br />
                    <br />
                    <Button onClick={handleDeleteUser} style={{
                        backgroundColor: "#FF0000",
                        color: "#FFFFFF",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                        width: "100%",
                    }}>
                        Delete Account
                    </Button>
                </FormControl>
            </Card >
        </div>
    );
};