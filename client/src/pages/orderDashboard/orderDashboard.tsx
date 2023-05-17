import { gql, useQuery } from "@apollo/client";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card } from "@chakra-ui/react";
import React from "react";
import { useCookies } from "react-cookie";

const GETORDER = gql`
    query GetFreelancerOrders {
        getFreelancerOrders {
            id
            gigId
            clientId
            freelancerId
            status
            createdAt
            updatedAt
        }
    }   
`;

export const OrderDashboard = () => {

    const { error, data } = useQuery(GETORDER, {
        onCompleted: (data) => {
            console.log(data);
        },

        onError: (error) => {
            console.log(error);
        }
    });

    if (data?.getFreelancerOrders) {
        return (
            <Accordion allowMultiple>
                {data.getFreelancerOrders.map((order: any) => {
                    return (
                        <AccordionItem>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex='1' textAlign='left'>
                                        {order.id}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Card>
                                    <p>{order.id}</p>
                                    <p>{order.gigId}</p>
                                    <p>{order.clientId}</p>
                                    <p>{order.freelancerId}</p>
                                    <p>{order.status}</p>
                                    <p>{order.createdAt}</p>
                                    <p>{order.updatedAt}</p>
                                </Card>
                            </AccordionPanel>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        );
    } else {
        return (
            <div>
                <br />
                <br />
                <br />
                <h1>Orders</h1>
                <p>There are no orders</p>
            </div>
        );
    }
};