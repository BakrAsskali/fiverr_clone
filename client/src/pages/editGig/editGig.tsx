import { gql, useMutation } from '@apollo/client';
import { BlobServiceClient } from '@azure/storage-blob';
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
            token {
            token
            }
            createdAt
            updatedAt
        }
    }
`;

const DELETE_GIG = gql`
    mutation DeleteGig($deleteGigId: ID!) {
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
            token {
                token
            }
            createdAt
            updatedAt
        }
    }
`;

async function uploadBlob(filename: any, file: any) {
    const blobServiceClient = new BlobServiceClient(
        "https://bakaria.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-06-10T03:01:30Z&st=2023-05-30T19:01:30Z&spr=https,http&sig=ENvqgE9rh5rybi%2Fzf5IFE9Rf%2BF3Li6NSpmkTb58usa0%3D"
    );
    const containerClient = blobServiceClient.getContainerClient("images");
    const BlobClient = containerClient.getBlobClient(filename);
    const blockBlobClient = BlobClient.getBlockBlobClient();
    await blockBlobClient.uploadBrowserData(file, {
        blockSize: 4 * 1024 * 1024, // 4MB block size
        concurrency: 20, // 20 concurrency
        onProgress: (ev) => console.log(ev),
    });
    console.log("done");

}

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
        const filename = gigImage?.replace("C:\\fakepath\\", "");

        const gig = {
            title: gigName,
            description: gigDescription,
            price: gigPrice,
            coverImage: filename,
            deliveryTime: gigDeliveryTime,
        };

        uploadBlob(filename, gigImage).then(() => {
            updateGig({
                variables: {
                    updateGigId: gigId,
                    input: gig,
                }
            });
        });
    };

    if (!cookies.userJwtToken) navigate('/login')

    const gigNameRef = useRef<HTMLInputElement>(null);
    const gigDescriptionRef = useRef<HTMLTextAreaElement>(null);
    const gigPriceRef = useRef<HTMLInputElement>(null);
    const gigImageRef = useRef<HTMLInputElement>(null);
    const gigDeliveryTimeRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);


    const handleDelete = (e: any) => {
        e.preventDefault();

        if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
            alert("Passwords do not match");
            return;
        }
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
                <form onSubmit={handleDelete}>
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
                    <Input placeholder="Enter Password" type='password' ref={passwordRef} />
                    <br />
                    <br />
                    <Input placeholder="Confirm Password" type='password' ref={confirmPasswordRef} />
                    <br />
                    <br />
                    <Button style={{
                        backgroundColor: "#FF0000",
                        color: "#FFFFFF",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",

                    }} type='submit'>
                        Delete
                    </Button>
                </form>
            </Card >
        </div>
    );
};