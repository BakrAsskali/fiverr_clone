import React from "react";
import "../../assets/styles/GigCard.css";

type Gig = {
  img: string;
  pp: string;
  username: string;
  desc: string;
  star: number;
  price: number;
};

type GigCardProps = {
  item: Gig;
};

const GigCard: React.FC<GigCardProps> = ({ item }) => {
  return (
    <div className="gigCard">
      <img src={item.img} alt="" />
      <div className="info">
        <div className="user">
          <img src={item.pp} alt="" />
          <span>{item.username}</span>
        </div>
        <p>{item.desc}</p>
        <div className="star">
          <img src="./img/star.png" alt="" />
          <span>{item.star}</span>
        </div>
      </div>
      <div className="details">
        <img src="./img/heart.png" alt="" />
        <span>STARTING AT</span>
        <h2>${item.price}</h2>
      </div>
    </div>
  );
};

export default GigCard;
