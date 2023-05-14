// Single product page design
import { gql, useQuery } from "@apollo/client";
import { Avatar, Box, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Image, Slider, Text } from "@chakra-ui/react";
import "../../assets/styles/Gig.css";

const GETGIG = gql`
  query GetGig($getGigId: ID!) {
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
    freelancerToken {
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

export const Gig = () => {
  const gigId = window.location.pathname.split("/")[2];
  const { data, error } = useQuery(GETGIG, {
    variables: {
      getGigId: gigId
    }
  });

  const { data: userData, error: userError } = useQuery(GETUSER, {
    variables: {
      userJwtToken: data?.getGig.freelancerToken
    }
  });
  if (error) console.log(error);

  return (
    <div style={{
      backgroundColor: "#f5f5f5",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}>
      <Box className="gig" style={{
        backgroundImage: `url(${data?.getGig.coverImage})`,
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
            <Image className="gig-card-body-image" src={data?.getGig.coverImage} />
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
            <IconButton className="gig-card-footer-icon-button" aria-label="Add to favorites" icon={<i className="fas fa-heart"></i>} />
            <IconButton className="gig-card-footer-icon-button" aria-label="Share" icon={<i className="fas fa-share"></i>} />
            <IconButton className="gig-card-footer-icon-button" aria-label="Place Order" icon={<i className="fas fa-ellipsis-h"></i>} />
          </CardFooter>
        </Card>
      </Box>
    </div>
  )
};
