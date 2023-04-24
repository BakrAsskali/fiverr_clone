import React, { useState } from "react";
import "../../assets/styles/Gigs.css";
// import { gigs } from "../../data";
import GigCard from "../../components/gigCard/GigCard";

type Gig = {
  id: number;
  img: string;
  pp: string;
  username: string;
  desc: string;
  star: number;
  price: number;
  createdAt: string;
};

export const Gigs: React.FC = () => {
  const [sort, setSort] = useState<string>("sales");
  const [open, setOpen] = useState<boolean>(false);

  const reSort = (type: string) => {
    setSort(type);
    setOpen(false);
  };

  const gigs: Gig[] = [
    {
      id: 1,
      img: "./img/gig1.png",
      pp: "./img/pp1.png",
      username: "John Doe",
      desc: "I will make a custom digital portrait for you",
      star: 4.5,
      price: 50,
      createdAt: "2022-04-20T08:40:51.620Z",
    },
    {
      id: 2,
      img: "./img/gig2.png",
      pp: "./img/pp2.png",
      username: "Jane Doe",
      desc: "I will design a unique logo for your business",
      star: 4.8,
      price: 100,
      createdAt: "2022-03-15T08:40:51.620Z",
    },
    {
      id: 3,
      img: "./img/gig3.png",
      pp: "./img/pp3.png",
      username: "John Smith",
      desc: "I will create an eye-catching flyer for your event",
      star: 4.7,
      price: 75,
      createdAt: "2022-05-01T08:40:51.620Z",
    },
  ];

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">FIVERR &gt; GRAPHICS &amp; DESIGN</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Fiverr's AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input type="text" placeholder="min" />
            <input type="text" placeholder="max" />
            <button>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">SortBy</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {gigs.map((gig) => (
            <GigCard key={gig.id} item={gig} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
