import { gql, useMutation } from '@apollo/client';
import {
    Button,
    Card,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import "../../assets/styles/editClient.css";

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

    const navigate = useNavigate();

    const cookies = new Cookies();
    const userToken = cookies.get('userJwtToken');



    const [updateUser, { data, error }] = useMutation(UPDATEUSER, {
        onCompleted: (data) => {
            console.log(data);
            navigate('/');
        },

        onError: (error) => {
            console.log(error);
        },


    });

    if (error) {
        console.log(error);
    }

    function onUpdateSuccess(data: any) {
        console.log(data);
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

        updateUser({
            variables: {
                updateUserId: userToken,
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

    return (
        <form onSubmit={handleUpdateUser}>
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
    );
};