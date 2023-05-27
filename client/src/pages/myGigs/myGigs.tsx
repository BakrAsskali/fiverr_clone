import { gql, useQuery } from "@apollo/client";
import { on } from "events";
import React from "react";
import { Accordion } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const GET_GIGS = gql`
    query GetGigsByToken($freelancerTokenInput: UserJwtTokenInput) {
        getGigsByToken(input: $freelancerTokenInput) {
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
            freelancerTokenInput: {
                token: cookies.userJwtToken
            }
        }
    });


    if (data) {
        return (
            <div>
                <h1>My Gigs</h1>
                <Accordion>
                    {data.getGigsByToken.map((gig: any) => (
                        <Accordion.Item eventKey={gig.id}>
                            <Accordion.Header>{gig.title}</Accordion.Header>
                            <Accordion.Body>
                                <p>{gig.description}</p>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
        );
    } else {
        return (
            <div>
                <h1>My Gigs</h1>
                <p>Loading...</p>
            </div>
        );
    }
};