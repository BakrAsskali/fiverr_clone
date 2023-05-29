import { gql, useQuery } from "@apollo/client";
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Grid, GridItem, Heading, Image, Input, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/Gigs.css";

const GET_GIGS = gql`
  query GetGigsBySort($category: String, $deliveryTime: Int, $price: Float) {
    getGigsBySort(category: $category, deliveryTime: $deliveryTime, price: $price) {
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

export const Gigs = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("All");
  const [deliveryTime, setDeliveryTime] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const fetchGigs = (category: string, deliveryTime: number, price: number) => {
    return useQuery(GET_GIGS, {
      variables: {
        category: category,
        deliveryTime: deliveryTime,
        price: price,
      },
    });
  };

  const { data, error } = useQuery(GET_GIGS, {
    variables: {
      category: category,
      deliveryTime: deliveryTime,
      price: price,
    },
  });

  if (error) {
    console.log(error);
  }

  const sendToGigHandler = (id: string) => () => {
    navigate(`/gig/${id}`);
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Box>
        <Heading as="h1" size="xl" textAlign="center">
          Gigs
        </Heading>
        <br />
        <br />
        <Grid templateColumns="repeat(12, 1fr)" gap={6} style={{
          margin: "0 auto",
          alignContent: "center",
        }}>
          <GridItem colSpan={2} style={{
            position: "sticky",
            top: "0",
            alignSelf: "flex-start",
            alignContent: "center",
          }}>
            <Stack spacing={3} style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              padding: "0 10px",
              alignSelf: "center",
            }}>
              <ButtonGroup>
                <Button onClick={() => setOpen(!open)} style={{
                  backgroundColor: "#1dbf73",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "5px",
                  border: "none",
                  boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)",
                  padding: "10px 16px",
                  fontSize: "16px",
                  cursor: "pointer",
                  outline: "none",
                  transition: "all .3s ease",
                }}>Sort</Button>
                {open && (
                  <Stack spacing={3} p={3} bg="gray.100" rounded="md">
                    <Button >Sales</Button>
                    <Button >Rating</Button>
                    <Button >Price</Button>
                  </Stack>
                )}
              </ButtonGroup>
              <Divider />
              <Text fontSize='xl'>category</Text>
              <ButtonGroup size='' spacing='15'>
                <Button padding='2' isActive onClick={() => setCategory('All')} >All</Button>
                <Button padding='2' isActive onClick={() => setCategory('Graphics & Design')}>Graphics & Design</Button>
                <Button padding='2' isActive onClick={() => setCategory('Digital Marketing')}>Digital Marketing</Button>
                <Button padding='2' isActive onClick={() => setCategory('Writing & Translation')}>Writing & Translation</Button>
                <Button padding='2' isActive onClick={() => setCategory('Video & Animation')}>Video & Animation</Button>
                <Button padding='2' isActive onClick={() => setCategory('Music & Audio')}>Music & Audio</Button>
                <Button padding='2' isActive onClick={() => setCategory('Programming & Tech')}>Programming & Tech</Button>
                <Button padding='2' isActive onClick={() => setCategory('Business')}>Business</Button>
              </ButtonGroup>
              <Divider />
              <Text fontSize='xl'>Delivery Time</Text>
              <ButtonGroup size='' spacing='6'>
                <Button padding='2' isActive onClick={() => setDeliveryTime(0)}>All</Button>
                <Button padding='2' isActive onClick={() => setDeliveryTime(1)}>24 Hours</Button>
                <Button padding='2' isActive onClick={() => setDeliveryTime(3)}>3 Days</Button>
                <Button padding='2' isActive onClick={() => setDeliveryTime(7)}>7 Days</Button>
              </ButtonGroup>
              <Divider />
              <Text fontSize='xl'>Price</Text>
              <ButtonGroup size='' spacing='6'>
                <Button padding='2' isActive onClick={() => setPrice(0)}>All</Button>
                <Button padding='2' isActive onClick={() => setPrice(25)}>Under $25</Button>
                <Button padding='2' isActive onClick={() => setPrice(50)}>$25 - $50</Button>
                <Button padding='2' isActive onClick={() => setPrice(100)}>$50 - $100</Button>
                <Button padding='2' isActive onClick={() => setPrice(199)}>$100 - $200</Button>
                <Button padding='2' isActive onClick={() => setPrice(200)}>$200 & Above</Button>
              </ButtonGroup>
              <Divider />
              <Divider />
            </Stack>
          </GridItem>
        </Grid>
      </Box>
      <Grid templateColumns="repeat(12, 1fr)" gap={6}>
        <GridItem colSpan={10}>
          <SimpleGrid columns={3} spacing={10}>
            {data?.getGigsBySort
              .filter((gig: any) => {
                if (category === 'All' && deliveryTime === 0 && price === 0) {
                  return true;
                } else if (category === 'All') {
                  return gig.deliveryTime === deliveryTime;
                } else if (deliveryTime === 0) {
                  return gig.category === category;
                } else if (price === 0) {
                  return gig.category === category && gig.deliveryTime === deliveryTime;
                } else {
                  return gig.category === category && gig.deliveryTime === deliveryTime && gig.price <= price;
                }
              })
              .map((gig: any) => (
                <Card key={gig.id} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                  <LazyLoadImage src={gig.coverImage} alt={gig.title} loading="lazy" />
                  <CardBody>
                    <Heading as="h2" size="md">
                      {gig.shortTitle}
                    </Heading>
                    <Text>{gig.shortDesc}</Text>
                  </CardBody>
                  <CardFooter>
                    <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                      <GridItem colSpan={6}>
                        <Text>${gig.price}</Text>
                      </GridItem>
                      <GridItem colSpan={6}>
                        <Button colorScheme="blue" size="sm" onClick={sendToGigHandler(gig.id)}>
                          View
                        </Button>
                      </GridItem>
                    </Grid>
                  </CardFooter>
                </Card>
              ))}
          </SimpleGrid>
        </GridItem>
      </Grid>
    </>
  );
};
