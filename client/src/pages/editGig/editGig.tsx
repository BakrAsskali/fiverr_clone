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
  export const  EditGig = () => {
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
                <form >
                    <Card
                        p="10"
                    >
                        <h1>Update your gig</h1>
                        <br />
                        <div className="changeName">
                            <FormControl>
                                <FormLabel>Product Name</FormLabel>
                                <Input placeholder="Enter New Name" type='text' />
                            </FormControl>
                        </div>
                        <br />
                        <div className="changeDescription">
                            <FormControl> 
                                <FormLabel>Description</FormLabel>
                                <Textarea placeholder='Enter Description' 
                                style={{
                                    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.25)',
                                }}/>
                            </FormControl>
                        </div>
                        <br />
                        <div className="changePrice">
                            <FormControl>
                                <FormLabel>Price</FormLabel>
                                <NumberInput defaultValue={0} min={0} max={2000}>
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
                                <Input type='file' />
                            </FormControl>
                        </div>
                        <br />
                        <div className="changeDeliveryTime">
                            <FormControl>
                                <FormLabel>Delivery Time</FormLabel>
                                <NumberInput defaultValue={0} min={1} max={20} placeholder='days'>
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
                <FormControl >
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
                    <Button  style={{
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