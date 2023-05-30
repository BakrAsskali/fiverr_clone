import { gql, useQuery } from "@apollo/client";
import { Button, Card } from "@chakra-ui/react";
import { on } from "events";
import React from "react";
import { Accordion } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const GET_GIGS = gql`
    query GetGigsByToken($getGigsByTokenInput2: UserJwtTokenInput!) {
        getGigsByToken(input: $getGigsByTokenInput2) {
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

export const MyGigs = () => {

    const [cookies, setCookie] = useCookies();

    const navigate = useNavigate();

    if (!cookies.userJwtToken) {
        navigate("/login");
    }

    const { error, data } = useQuery(GET_GIGS, {
        variables: {
            getGigsByTokenInput2: {
                token: cookies.userJwtToken
            }
        }
    });


    if (data) {
        return (
            <div>
                <h1>My Gigs</h1>
                <Card style={{
                    margin: "auto",
                    width: "50%"
                }}>
                    <Accordion>
                        {data.getGigsByToken.map((gig: any) => {
                            return (
                                <Card>
                                    <Accordion.Item eventKey={gig.id}>
                                        <Accordion.Header>
                                            <h1>{gig.title}</h1>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <p>{gig.description}</p>
                                            <Button>
                                                <a href={`/editGig/${gig.id}`}>Edit</a>
                                            </Button>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Card>
                            );
                        })}
                    </Accordion>
                </Card>
            </div>
        );
    } else {
        return (
            <div>
                <h1>My Gigs</h1>
                <p style={{
                    textAlign: "center",
                    fontSize: "1.5rem",
                    fontWeight: "bold"
                }}>
                    You have no gigs yet.
                </p>
                <Button style={{
                    margin: "auto",
                    display: "block"
                }}>
                    <a href="/add">Create one now!</a>
                </Button>
            </div >
        );
    }
};