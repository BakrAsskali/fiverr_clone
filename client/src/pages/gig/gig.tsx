// Single product page design
import { gql, useQuery } from "@apollo/client";
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Image, Slider, Text } from "@chakra-ui/react";
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
    cover
    images
    category
    deliveryTime
    revisionNumber
    features
    sales
    rating
    reviews
    freelancerId
    createdAt
    updatedAt
    freelancer {
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
}
`;

export const Gig = (gigId: {}) => {
  const { error, data } = useQuery(GETGIG, {
    variables: { getGigId: gigId },
  });
  if (error) console.log(error);

  return (
    <div style={{
      top: "50%",
      left: "50%",
      transform: "translate(550%, 100%)"
    }}>
      <br />
      <br />
      <br />
      <Card maxW='md'>
        <CardHeader>
          <Flex>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Text>
                {data?.getGig.title}
              </Text>
              <Avatar name={data?.getGig.freelancer.username} src={data?.getGig.freelancer.profilePicture} size='sm' />
              <Box>
                <Heading size='sm'>{data?.getGig.freelancer.username}</Heading>
              </Box>
            </Flex>
            <IconButton
              variant='ghost'
              colorScheme='gray'
              aria-label='See menu'
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <Text>
            {data?.getGig.description}
          </Text>
        </CardBody>
        <Image
          objectFit='cover'
          src={data?.getGig.cover}
          alt='Cover'
        />
        <Slider
          aria-label='slider-ex-1'
          defaultValue={data?.getGig.images[0]}
          maxW='40%'
        >
          {data?.getGig.images.map((image: string) => (
            <Image
              key={image}
            />
          ))}
        </Slider>
        <CardFooter
          justify='space-between'
          flexWrap='wrap'
          sx={{
            '& > button': {
              minW: '136px',
            },
          }}
        >
        </CardFooter>
      </Card>
    </div>
  )
};
