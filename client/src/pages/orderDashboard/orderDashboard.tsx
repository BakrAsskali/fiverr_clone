import { gql, useQuery } from "@apollo/client";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card } from "@chakra-ui/react";
import React from "react";
import { useCookies } from "react-cookie";

const GETORDER = gql`
    query GetFreelancerOrders($input: UserJwtTokenInput) {
        getFreelancerOrders(input: $input) {
            id
            gigId
            clientId
            freelancerToken {
            token
            }
            status
            createdAt
            updatedAt
        }
    }  
`;

const GETGIG = gql`
    query GetGig($getGigId: ID) {
        getGig(id: $getGigId) {
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

export const OrderDashboard = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['userJwtToken']);

    const { error, data } = useQuery(GETORDER, {
        variables: {
            input: {
                token: cookies.userJwtToken
            }
        },
        onCompleted: (data) => {
            console.log(data);
        },

        onError: (error) => {
            console.log(error);
        }
    });

    if (!cookies.userJwtToken) {
        window.location.href = "/login";
    }

    if (data) {
        return (
            <Box style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px"
            }}>
                <h1>Orders</h1>
                <Accordion allowToggle>
                    {data.getFreelancerOrders.map((order: any) => (
                        <AccordionItem>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    <p>Order ID:{order.id}</p>
                                </Box>
                                <Box flex="1" textAlign="left"
                                >
                                    {order.status}
                                </Box>
                                <Box flex="1" textAlign="left">
                                    Order Updated At: {order.updatedAt}
                                </Box>
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <Card>
                                    <Box>
                                        <p>Order ID: {order.id}</p>
                                        <p>Order Status: {order.status}</p>
                                        <p>Order Created At: {order.createdAt}</p>
                                        <p>Order Updated At: {order.updatedAt}</p>
                                    </Box>
                                </Card>
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Box>
        )
    } else {
        return (
            <Box>
                <p>No Orders</p>
            </Box>
        )
    }
};