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
    <>
      <div className="gigs">
        <div className="menu">
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
      </div>
      {/* <Grid>
        <GridItem colSpan={2}>
          <Box className="gigs-container">
            <SimpleGrid columns={3} spacing={30}>
              <Box className="gig-card">
                <Card maxW='sm'>
                  <CardBody>
                    <Image
                      src={data.getGigs[0].cover}
                      borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                      <Heading size='md'>{data.getGigs[0].title}</Heading>
                      <Text>
                        {data.getGigs[0].description}
                      </Text>
                      <Text color='blue.600' fontSize='2xl'>
                        ${data.getGigs[0].price}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing='2'>
                      <Button variant='solid' colorScheme='blue'>
                        Buy now
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </Box>
              <Box className="gig-card">
                <Card maxW='sm'>
                  <CardBody>
                    <Image
                      src={data.getGigs[1].cover}
                      borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                      <Heading size='md'>{data.getGigs[2].title}</Heading>
                      <Text>
                        {data.getGigs[1].description}
                      </Text>
                      <Text color='blue.600' fontSize='2xl'>
                        ${data.getGigs[1].price}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing='2'>
                      <Button variant='solid' colorScheme='blue'>
                        Buy now
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </Box>
              <Box className="gig-card">
                <Card maxW='sm'>
                  <CardBody>
                    <Image
                      src={data.getGigs[2].cover}
                      borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                      <Heading size='md'>{data.getGigs[2].title}</Heading>
                      <Text>
                        {data.getGigs[2].description}
                      </Text>
                      <Text color='blue.600' fontSize='2xl'>
                        ${data.getGigs[2].price}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing='2'>
                      <Button variant='solid' colorScheme='blue'>
                        Buy now
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </Box>
              <Box className="gig-card">
                <Card maxW='sm'>
                  <CardBody>
                    <Image
                      src={data.getGigs[3].cover}
                      borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                      <Heading size='md'>{data.getGigs[2].title}</Heading>
                      <Text>
                        {data.getGigs[3].description}
                      </Text>
                      <Text color='blue.600' fontSize='2xl'>
                        ${data.getGigs[3].price}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing='2'>
                      <Button variant='solid' colorScheme='blue'>
                        Buy now
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </Box>
              <Box className="gig-card">
                <Card maxW='sm'>
                  <CardBody>
                    <Image
                      src={data.getGigs[4].cover}
                      borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                      <Heading size='md'>{data.getGigs[2].title}</Heading>
                      <Text>
                        {data.getGigs[4].description}
                      </Text>
                      <Text color='blue.600' fontSize='2xl'>
                        ${data.getGigs[4].price}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing='2'>
                      <Button variant='solid' colorScheme='blue'>
                        Buy now
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </Box>
              <Box className="gig-card">
                <Card maxW='sm'>
                  <CardBody>
                    <Image
                      src={data.getGigs[5].cover}
                      borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                      <Heading size='md'>{data.getGigs[2].title}</Heading>
                      <Text>
                        {data.getGigs[5].description}
                      </Text>
                      <Text color='blue.600' fontSize='2xl'>
                        ${data.getGigs[5].price}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing='2'>
                      <Button variant='solid' colorScheme='blue'>
                        Buy now
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </Box>
              <Box className="gig-card">
                <Card maxW='sm'>
                  <CardBody>
                    <Image
                      src={data.getGigs[6].cover}
                      borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                      <Heading size='md'>{data.getGigs[2].title}</Heading>
                      <Text>
                        {data.getGigs[6].description}
                      </Text>
                      <Text color='blue.600' fontSize='2xl'>
                        ${data.getGigs[6].price}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing='2'>
                      <Button variant='solid' colorScheme='blue'>
                        Buy now
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </Box>
              <Box className="gig-card">
                <Card maxW='sm'>
                  <CardBody>
                    <Image
                      src={data.getGigs[7].cover}
                      borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                      <Heading size='md'>{data.getGigs[2].title}</Heading>
                      <Text>
                        {data.getGigs[7].description}
                      </Text>
                      <Text color='blue.600' fontSize='2xl'>
                        ${data.getGigs[7].price}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing='2'>
                      <Button variant='solid' colorScheme='blue'>
                        Buy now
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </Box>
              <Box className="gig-card">
                <Card maxW='sm'>
                  <CardBody>
                    <Image
                      src={data.getGigs[8].cover}
                      borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                      <Heading size='md'>{data.getGigs[2].title}</Heading>
                      <Text>
                        {data.getGigs[8].description}
                      </Text>
                      <Text color='blue.600' fontSize='2xl'>
                        ${data.getGigs[8].price}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing='2'>
                      <Button variant='solid' colorScheme='blue'>
                        Buy now
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </Box>
            </SimpleGrid>
          </Box>
        </GridItem>
      </Grid> */}
    </>
  );
};
