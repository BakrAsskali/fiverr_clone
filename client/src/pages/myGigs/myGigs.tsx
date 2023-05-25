import { gql, useQuery } from "@apollo/client";
import { on } from "events";
import React from "react";
import { Accordion } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const GET_GIGS = gql`
    query GetGigsByToken($freelancerTokenInput: UserJwtTokenInput) {
        getGigs(freelancerTokenInput: $freelancerTokenInput) {
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
        },
        onCompleted: (data) => {
            console.log(data);

        },

        onError: (error) => {
            console.log(error);
        }
    });

    if (error) {
        console.log(error);
    }

    if (data?.getGigs) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center">My Gigs</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Accordion>
                            {data.getGigs.map((gig: any) => {
                                return (
                                    <Accordion.Item eventKey={gig.id}>
                                        <Accordion.Header>{gig.title}</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="row">
                                                <div className="col-12">
                                                    <h3>{gig.title}</h3>
                                                    <p>{gig.description}</p>
                                                    <p>{gig.price}</p>
                                                    <p>{gig.category}</p>
                                                    <p>{gig.deliveryTime}</p>
                                                    <p>{gig.revisionNumber}</p>
                                                    <p>{gig.features}</p>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                )
                            }
                            )}
                        </Accordion>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <h1>My Gigs</h1>
                <p>You have no gigs</p>
            </div>
        )
    }
}    