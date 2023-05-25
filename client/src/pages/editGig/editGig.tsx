import { gql, useMutation } from '@apollo/client';
import {
    Button,
    Card,
    FormControl,
    FormLabel,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
    Textarea,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const UPDATE_GIG = gql`
    mutation UpdateGig($updateGigId: ID!, $input: GigInput) {
        updateGig(id: $updateGigId, input: $input) {
            id
            title
            shortTitle
            description
            shortDesc
            price
            coverImage
            images
            category
            deliveryTime
            revisionNumber
            features
            sales
            rating
            reviews
            freelancerToken {
            token
            }
            createdAt
            updatedAt
        }
    }
`;

const DELETE_GIG = gql`
    mutation UpdateGig($deleteGigId: ID!) {
        deleteGig(id: $deleteGigId) {
            id
            title
            shortTitle
            description
            shortDesc
            price
            coverImage
            images
            category
            deliveryTime
            revisionNumber
            features
            sales
            rating
            reviews
            freelancerToken {
                token
            }
            createdAt
            updatedAt
        }
    }
`;

export const EditGig = () => {

    const gigId = window.location.pathname.split('/')[2];

    const [cookies, setCookie] = useCookies();
    const navigate = useNavigate();
    const [updateGig] = useMutation(UPDATE_GIG, {
        onCompleted: (data) => {
            console.log(data);
            navigate('/');
        }
    });

    const [deleteGig] = useMutation(DELETE_GIG, {
        onCompleted: (data) => {
            console.log(data);
            navigate('/');
        }
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const gigName = gigNameRef.current?.value;
        const gigDescription = gigDescriptionRef.current?.value;
        const gigPrice = gigPriceRef.current?.value;
        const gigImage = gigImageRef.current?.value;
        const gigDeliveryTime = gigDeliveryTimeRef.current?.value;

        const gig = {
            gigName,
            gigDescription,
            gigPrice,
            gigImage,
            gigDeliveryTime,
        };

        updateGig({
            variables: {
                input: gig,
            }
        });
    };

    const gigNameRef = useRef<HTMLInputElement>(null);
    const gigDescriptionRef = useRef<HTMLTextAreaElement>(null);
    const gigPriceRef = useRef<HTMLInputElement>(null);
    const gigImageRef = useRef<HTMLInputElement>(null);
    const gigDeliveryTimeRef = useRef<HTMLInputElement>(null);

    const handleDelete = (e: any) => {
        e.preventDefault();

        deleteGig({
            variables: {
                deleteGigId: gigId,
            }
        });
    };

    return (
        <div style={{
            width: '100vw',
            height: '100%',
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
        }}>
            <Card maxWidth="80%" style={{
                margin: 'auto',
                marginTop: '5%',
                marginBottom: '5%',
                padding: '5%',
                textAlign: 'center',
                backgroundColor: '#F5F5F5',
            }}>
                <form onSubmit={handleSubmit}>
                    <Card
                        p="10"
                    >
                        <h1>Update your gig</h1>
                        <br />
                        <div className="changeName">
                            <FormControl>
                                <FormLabel>Product Name</FormLabel>
                                <Input placeholder="Enter New Name" type='text' ref={gigNameRef} />
                            </FormControl>
                        </div>
                        <br />
                        <div className="changeDescription">
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Textarea placeholder='Enter Description'
                                    style={{
                                        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.25)',
                                    }} ref={gigDescriptionRef} />
                            </FormControl>
                        </div>
                        <br />
                        <div className="changePrice">
                            <FormControl>
                                <FormLabel>Price</FormLabel>
                                <NumberInput defaultValue={0} min={0} max={2000} ref={gigPriceRef}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                        </div>
                        <br />
                        <div className="changeImage">
                            <FormControl>
                                <FormLabel>Image</FormLabel>
                                <Input type='file' ref={gigImageRef} />
                            </FormControl>
                        </div>
                        <br />
                        <div className="changeDeliveryTime">
                            <FormControl>
                                <FormLabel>Delivery Time</FormLabel>
                                <NumberInput defaultValue={0} min={1} max={20} placeholder='days' ref={gigDeliveryTimeRef}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                        </div>
                        <br />
                        <div className="submit">
                            <a href="/">
                                <Button type="submit">Update</Button>
                            </a>
                        </div>
                    </Card>
                </form>
                <br />
                <br />
                <br />
                <FormControl onSubmit={handleDelete}>
                    <FormLabel style={{
                        color: "#FF0000",
                        width: "100%",
                        marginLeft: "30vw",
                    }}
                        fontSize="2xl"
                    ><b>Delete Gig</b>

                    </FormLabel>
                    <Text style={{
                        color: "#FF0000",
                        width: "100%",
                    }}>
                        <b style={{
                            fontSize: "1.2vw",
                        }}>Attention
                            <br />
                            This action cannot be undone. This will permanently delete your product. Please type in your password to confirm.
                        </b>
                    </Text>
                    <br />
                    <Input placeholder="Enter Password" type='password' />
                    <br />
                    <br />
                    <Input placeholder="Confirm Password" type='password' />
                    <br />
                    <br />
                    <Button style={{
                        backgroundColor: "#FF0000",
                        color: "#FFFFFF",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",

                    }}>
                        Delete
                    </Button>
                </FormControl>
            </Card >
        </div>
    );
};