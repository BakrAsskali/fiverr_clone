import { gql, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import "../../assets/styles/Gigs.css";

// const GETGIGS_QUERY = useQuery(
//   gql`
//     query GetGigs {
//       getGigs {
//         id
//         title
//         shortTitle
//         description
//         shortDesc
//         price
//         cover
//         images
//         category
//         deliveryTime
//         revisionNumber
//         features
//         sales
//         rating
//         reviews
//         freelancerId
//         createdAt
//         updatedAt
//       }
//     }
//   `
// );

export const Gigs = () => {
  const [sort, setSort] = useState("newest");
  const [open, setOpen] = useState(false);
  const resort = (type: string) => {
    setSort(type);
    setOpen(false);
  };

  return (
    <div className="gigs">
      <div className="gigs__header">
        <h1>Find the perfect freelance services for your business</h1>
        <div className="gigs__header__sort">
          <div className="gigs__header__sort__button">
            <button onClick={() => setOpen(!open)}>
              {sort === "newest"
                ? "Newest"
                : sort === "popular"
                ? "Popular"
                : "Recommended"}
            </button>
            <div
              className={`gigs__header__sort__button__dropdown ${
                open ? "open" : ""
              }`}
            >
              <button onClick={() => resort("newest")}>Newest</button>
              <button onClick={() => resort("popular")}>Popular</button>
              <button onClick={() => resort("recommended")}>Recommended</button>
            </div>
          </div>
        </div>
      </div>
      <div className="gigs__body">
        <div className="gigs__body__cards">
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          >
            <Card>
              <CardHeader>
                <Heading size="md"></Heading>
              </CardHeader>
              <CardBody>
                <p>View a summary of all your customers over the last month.</p>
              </CardBody>
              <CardFooter>
                <Button>View here</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Heading size="md"> Customer dashboard</Heading>
              </CardHeader>
              <CardBody>
                <p>View a summary of all your customers over the last month.</p>
              </CardBody>
              <CardFooter>
                <Button>View here</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Heading size="md"> Customer dashboard</Heading>
              </CardHeader>
              <CardBody>
                <p>View a summary of all your customers over the last month.</p>
              </CardBody>
              <CardFooter>
                <Button>View here</Button>
              </CardFooter>
            </Card>
          </SimpleGrid>
        </div>
      </div>
    </div>
  );
};
