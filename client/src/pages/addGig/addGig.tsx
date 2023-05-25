import React from "react";
import {
  Box,
  Container,
  Input,
  Select,
  Textarea,
  Button,
  Card,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { FaAlignCenter } from "react-icons/fa";

export const AddGig = () => {
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
        <form action="">
            <Card p="10">
            <Container style={{
                width:'1400px',
                padding:'50px 0px',
            }}>
               <h1 >Add New Gig</h1>
              
                <Box className="sections" style={{
                    display:'flex',
                    justifyContent:'space-between',
                    gap:'80px'
                }}>
                <Box className="info" style={{
                    flex:'1',
                    display:'flex',
                    flexDirection:'column',
                    gap:'5px',
                    justifyContent:'space-between',
                    marginLeft:'-100px'
                }}>
                    <div className="changeName">
                        <FormControl>
                            <FormLabel>Product Name</FormLabel>
                            <Input placeholder="Enter New Name" type='text' />
                        </FormControl>
                    </div>
                    <br />
                    <div className="coverImage">
                        <FormControl>
                            <FormLabel>Cover Image</FormLabel>
                            <Input type="file" />
                        </FormControl>
                    </div>
                    <br />
                    <div className="uploadImage">
                        <FormControl>
                            <FormLabel>Upload Images</FormLabel>
                            <Input type="file" />
                        </FormControl>
                    </div>
                    <br />
                    <div className="desc">
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea placeholder="Enter description" style={{
                                padding:'20px',
                                width:'300px',
                                height:'300px',
                                boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.25)'
                            }}/>
                        </FormControl>
                    </div> 
                    <br />
                    <div className="shortDesc">
                        <FormControl>
                            <FormLabel>Short Desscription</FormLabel>
                            <Textarea placeholder="Enter description of your service" style={{
                                padding:'20px',
                                width:'300px',
                                height:'300px',
                                boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.25)'
                            }}/>
                        </FormControl>
                    </div>    
                </Box>
                <Box className="details" style={{
                    flex:'1',
                    display:'flex',
                    flexDirection:'column',
                    gap:'5px',
                    justifyContent:'space-between',
                    marginRight:'-100px'
                }}>
                    <div className="category" style={{
                        backgroundColor:'white',
                    }}>
                        <FormControl>
                            <FormLabel >Category</FormLabel>
                            <Select placeholder='Select option' size='md'>
                                <option value='option1'>Music </option>
                                <option value='option2'>Web</option>
                                <option value='option3'>Photography</option>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="serviceTitle">
                        <FormControl>
                            <FormLabel>Service Title</FormLabel>
                            <Input placeholder="e.g. One-page web design" type="text" />
                        </FormControl>
                    </div>
                    <div className="features">
                        <FormControl>
                            <FormLabel>Features</FormLabel>
                            <Input type="text" placeholder="e.g. page design" />
                            <br />
                            <br />
                            <Input type="text" placeholder="e.g. file uploading" />
                            <br />
                            <br />
                            <Input type="text" placeholder="e.g. setting up a domain" />
                            <br />
                            <br />
                            <Input type="text" placeholder="e.g. hosting" />
                        </FormControl>
                    </div>
                    <div className="deliveryTime">
                        <FormControl>
                            <FormLabel>Delivery Time</FormLabel>
                            <Input placeholder="e.g. 2 Days" type="text" />
                        </FormControl>
                    </div>
                    <div className="revisionNumber">
                        <FormControl>
                            <FormLabel>Revision Number</FormLabel>
                            <Input type="number" />
                        </FormControl>
                    </div>
                   <div className="price">
                        <FormControl>
                            <FormLabel>Price</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                pointerEvents='none'
                                color='gray.300'
                                fontSize='1.2em'
                                children='$'
                                />
                                <Input placeholder='Enter amount' />
                                <InputRightElement>
                                <CheckIcon color='green.500' />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    </div>
                    <Button>Create</Button>
                </Box>
                </Box>
            </Container>
            </Card>
        </form>
        </Card>
    </div>
 
  );
};

