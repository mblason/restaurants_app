import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneRestaurant } from '../../services/Restaurant.services';
import './RestaurantDetailScreen.css';

/* IMAGES */
import locationIcon from '../../assets/images/restaurant/location-icon.png';
import cuisineIcon from '../../assets/images/restaurant/cuisine-icon.png';
import calendarIcon from '../../assets/images/restaurant/calendar-icon.png';
import reviewWhiteIcon from '../../assets/images/restaurant/review_white-icon.png';
import Navbar from './../../components/Navbar/Navbar';

export default function RestaurantDetailScreen() {
  const [restaurant, setRestaurant] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getOneRestaurant(id)
      .then((resto) => {
        setRestaurant(resto)
      })
      .catch((err) => navigate("/error"));
  }, [id, navigate]);
  
  return (    
    restaurant && (
      <div id="restaurant-detail-container">
        <Navbar/ >      
        <div
          className="resto-img"
          style={{ backgroundImage: `url(${restaurant.images[0]})` }}
        ></div>
        <div className="resto-info">
          <h1>{restaurant.name}</h1>
          <div className="resto-info-wrapper">
            <img src={locationIcon} alt="locationIcon" className="icon-resto" />
            <span>
              {restaurant.neighborhood} - {restaurant.address}
            </span>
          </div>
          <div className="resto-info-wrapper">
            <img src={cuisineIcon} alt="cuisineIcon" className="icon-resto" />
            <span>{restaurant.cuisine_type} cuisine</span>
          </div>
          <div className="resto-info-wrapper">
            <img src={calendarIcon} alt="calendarIcon" className="icon-resto" />
            <span>Opening times:</span>
            <ul>
              <li>Monday: {restaurant.operating_hours.Monday}</li>
              <li>Tuesday: {restaurant.operating_hours.Tuesday}</li>
              <li>Wednesday: {restaurant.operating_hours.Wednesday}</li>
              <li>Thursday: {restaurant.operating_hours.Thursday}</li>
              <li>Friday: {restaurant.operating_hours.Friday}</li>
              <li>Saturday: {restaurant.operating_hours.Saturday}</li>
              <li>Sunday: {restaurant.operating_hours.Sunday}</li>
            </ul>
          </div>
          <div className="resto-info-wrapper">
            <img
              src={reviewWhiteIcon}
              alt="reviewWhiteIcon"
              className="icon-resto"
            />
            <span>Reviews:</span>
            <div>No reviews yet</div>
          </div>
        </div>
      </div>
    )
  );
}
