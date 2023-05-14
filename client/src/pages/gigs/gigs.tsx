import { gql, useQuery } from "@apollo/client";
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Grid, GridItem, Heading, Image, Input, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/Gigs.css";

const GET_GIGS = gql`
  query GetGigs {
    getGigs {
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

export const Gigs = () => {
  const navigate = useNavigate();
  const [sort, setSort] = useState<string>("sales");
  const [open, setOpen] = useState<boolean>(false);

  const resort = (sort: string) => {
    setSort(sort);
    setOpen(false);
  };

  const { data, error } = useQuery(GET_GIGS);

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
                    <Button onClick={() => resort("sales")}>Sales</Button>
                    <Button onClick={() => resort("rating")}>Rating</Button>
                    <Button onClick={() => resort("price")}>Price</Button>
                  </Stack>
                )}
              </ButtonGroup>
              <Divider />
              <Text>Category</Text>
              <ButtonGroup>
                <Button>All</Button>
                <Button>Graphics & Design</Button>
                <Button>Digital Marketing</Button>
                <Button>Writing & Translation</Button>
                <Button>Video & Animation</Button>
                <Button>Music & Audio</Button>
                <Button>Programming & Tech</Button>
                <Button>Business</Button>
              </ButtonGroup>
              <Divider />
              <Text>Delivery Time</Text>
              <ButtonGroup>
                <Button>All</Button>
                <Button>24 Hours</Button>
                <Button>3 Days</Button>
                <Button>7 Days</Button>
              </ButtonGroup>
              <Divider />
              <Text>Price</Text>
              <ButtonGroup>
                <Button>All</Button>
                <Button>Under $25</Button>
                <Button>$25 - $50</Button>
                <Button>$50 - $100</Button>
                <Button>$100 - $200</Button>
                <Button>$200 & Above</Button>
              </ButtonGroup>
              <Divider />
              <Text>Online Sellers</Text>
              <ButtonGroup>
                <Button>All</Button>
                <Button>Online</Button>
              </ButtonGroup>
            </Stack>
          </GridItem>
        </Grid>
      </Box>
      <Grid templateColumns="repeat(12, 1fr)" gap={6}>
        <GridItem colSpan={10}>
          <SimpleGrid columns={3} spacing={10}>
            {data?.getGigs
              .map((gig: any) => (
                <Card key={gig.id} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                  <Image src={gig.coverImage} alt={gig.title} />
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
