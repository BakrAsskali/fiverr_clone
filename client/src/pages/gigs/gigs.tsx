import { gql, useQuery } from "@apollo/client";
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Grid, GridItem, Heading, Image, Input, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import "../../assets/styles/Gigs.css";

const GET_GIGS = gql`
  query {
    getGigs {
      id
      title
      description
      price
      images
      cover
      category
      createdAt
      updatedAt
    }
  }
`;

export const Gigs = () => {
  const [sort, setSort] = useState<string>("sales");
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const resort = (sort: string) => {
    setSort(sort);
    setOpen(false);
  };

  const { error, data } = useQuery(GET_GIGS);
  if (error) console.log(error);
  if (data) console.log(data);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      backgroundColor: "#f5f5f5",
      top: "50%",
      left: "50%",
      transform: "translate(75%, 200%)",
    }}>
      <Text fontSize="3xl" style={{
        textAlign: "center",
      }}>Search for a Gig</Text>
      <div className="menu" style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "0 20px",
      }}>
        <div className="menu-left">
          <span>Budget</span>
          <Input size="sm" type="text" placeholder="Min" />
          <Input size="sm" type="text" placeholder="Max" />
          <Button colorScheme="blue">Apply</Button>
        </div>
        <div className="menu-right">
          <span>Sort by</span>
          <span>
            {sort === "sales" ? ("Best Selling") : ("Newest")}
          </span>
          <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
          {open && (
            <div className="rightMenu">
              {sort === "sales" ? (
                <span onClick={() => resort("createdAt")}>Newest</span>
              ) : (
                <span onClick={() => resort("sales")}>Best Selling</span>
              )}
            </div>
          )}
        </div>
      </div>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {data?.getGigs.map((gig: any) => (
          <a href={`/gig/${gig.id}`}>
            <GridItem key={gig.id}>
              <Card>
                <CardBody>
                  <Image src={gig.cover} alt="" />
                  <Stack spacing={4} mt={4}>
                    <Heading fontSize="xl">{gig.title}</Heading>
                    <Text>{gig.description}</Text>
                    <Text>{gig.price}</Text>
                    <Text>{gig.category}</Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup>
                    <Button colorScheme="blue">Buy now</Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </GridItem>
          </a>
        ))}
      </Grid>
    </div>
  );
};
