// Single product page design
import { gql, useMutation, useQuery } from "@apollo/client";
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Image, Slider, Text } from "@chakra-ui/react";
import { on } from "events";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/Gig.css";

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

const GETUSER = gql`
  query GetUser($userJwtToken: String!) {
    getUser(userJwtToken: $userJwtToken) {
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

const CREATE_ORDER = gql`
  mutation CreateOrder($order: OrderInput) {
    createOrder(input: $order) {
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

export const Gig = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
  const gigId = window.location.pathname.split("/")[2];
  const { data, error } = useQuery(GETGIG, {
    variables: {
      getGigId: gigId
    }
  });

  const { data: userData, error: userError } = useQuery(GETUSER, {
    variables: {
      userJwtToken: cookies.userJwtToken
    },
    onCompleted: (userData) => {
      console.log(userData);
    },
  });
  if (error) console.log(error);

  const [createOrder, { data: orderData, error: orderError }] = useMutation(CREATE_ORDER, {
    onCompleted: (data) => {
      console.log(data);
      navigate("/orders");
    },
  });

  const handleOrder = () => {
    createOrder({
      variables: {
        order: {
          gigId: gigId,
          clientId: cookies.userJwtToken,
          freelancerToken: {
            token: data.getGig.token.token
          },
          status: "PENDING"
        }
      }
    });
  };

  return (
    <div style={{
      backgroundColor: "#f5f5f5",
    }}>
      <Box className="gig" style={{
        // backgroundImage: `url(${data?.getGig.coverImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}>
        <Card className="gig-card" style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)"
        }}>
          <CardHeader className="gig-card-header">
            <Flex className="gig-card-header-flex">
              <Avatar className="gig-card-header-avatar" src={userData?.getUser.profilePicture} />
              <Box className="gig-card-header-box">
                <Heading className="gig-card-header-box-heading" size="md">{userData?.getUser.firstName} {userData?.getUser.lastName}</Heading>
                <Text className="gig-card-header-box-text">{userData?.getUser.rating} ({userData?.getUser.reviews})</Text>
              </Box>
            </Flex>
          </CardHeader>
          <CardBody className="gig-card-body">
            {/* <Image className="gig-card-body-image" src={data?.getGig.coverImage} /> */}
            <Heading className="gig-card-body-heading" size="md">{data?.getGig.title}</Heading>
            <Text className="gig-card-body-text">{data?.getGig.shortDesc}</Text>
            <Text className="gig-card-body-text">{data?.getGig.description}</Text>
            <Text className="gig-card-body-text">{data?.getGig.price}</Text>
            <Text className="gig-card-body-text">{data?.getGig.deliveryTime}</Text>
            <Text className="gig-card-body-text">{data?.getGig.revisionNumber}</Text>
            <Text className="gig-card-body-text">{data?.getGig.features}</Text>
            <Text className="gig-card-body-text">{data?.getGig.sales}</Text>
            <Text className="gig-card-body-text">{data?.getGig.rating}</Text>
            <Text className="gig-card-body-text">{data?.getGig.reviews}</Text>
          </CardBody>
          <CardFooter className="gig-card-footer">
            <Button className="gig-card-footer-button" colorScheme="blue" onClick={handleOrder}>Place Order</Button>
            <Button className="gig-card-footer-button" colorScheme="blue">Add to favorites</Button>
          </CardFooter>
        </Card>
      </Box>
    </div>
  )
};
