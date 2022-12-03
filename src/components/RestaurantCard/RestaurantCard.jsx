import React from "react";
import { Link } from "react-router-dom";
import cuisineIcon from "../../assets/images/restaurant/cuisine-icon.png";
import locationIcon from "../../assets/images/restaurant/location-icon.png";
import "./RestaurantCard.css";

export default function RestaurantCard({
  images,
  name,
  neighborhood,
  cuisine_type,
  id
}) {

  return (
    <Link to={`/restaurant/${id}`} className="card-link">
      <div
        className="card-img"
        style={{ backgroundImage: `url(${images[0]})` }}
      ></div>
      <div className="card-content">
        <h6>{name}</h6>
        <div className="resto-info-wrapper">
          <img src={locationIcon} alt="locationIcon" className="icon-resto" />
          <span>{neighborhood}</span>
        </div>
        <div className="resto-info-wrapper">
          <img src={cuisineIcon} alt="cuisineIcon" className="icon-resto" />
          <span>{cuisine_type} cuisine</span>
        </div>
      </div>
    </Link>
  );
}