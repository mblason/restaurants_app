import React from "react";
import { Link } from "react-router-dom";
import "./RestaurantCard.css";

export default function RestaurantCard({
  images,
  name,
  neighborhood,
  id,
  rating
}) {
  return (
    <Link
      to={`/restaurant/${id}`}
      className="card-link"
    >
      <div
        className="card-img"
        style={{ backgroundImage: `url(${images[0]})` }}
      ></div>
      <div className="card-content">
        <h6>{name}</h6>
        <p>{neighborhood}</p>
        <span>rating</span>        
      </div>
    </Link>
  );
}