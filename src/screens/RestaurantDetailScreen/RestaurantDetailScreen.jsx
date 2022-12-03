import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneRestaurant } from '../../services/Restaurant.services';
import { createFav, deleteFav, getOneFav } from '../../services/User.services';
import Navbar from './../../components/Navbar/Navbar';
import AuthContext from './../../contexts/AuthContext';
import './RestaurantDetailScreen.css';

/* IMAGES */
import calendarIcon from '../../assets/images/restaurant/calendar-icon.png';
import cuisineIcon from '../../assets/images/restaurant/cuisine-icon.png';
import favedIcon from "../../assets/images/restaurant/faved-icon.png";
import locationIcon from '../../assets/images/restaurant/location-icon.png';
import reviewWhiteIcon from '../../assets/images/restaurant/review_white-icon.png';
import unfavIcon from "../../assets/images/restaurant/unfav-icon.png";

export default function RestaurantDetailScreen() {
  const [restaurant, setRestaurant] = useState('');
  const [favImg, setFavImg] = useState(unfavIcon);
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    getOneRestaurant(id)
      .then((resto) => {
        setRestaurant(resto)
      })
      .catch((err) => navigate("/error"));      
  }, [id, navigate]);

  useEffect(() => {
    if (restaurant && currentUser) {
      getOneFav(restaurant.id, currentUser.id)
        .then((fav) => {
          setFavImg(fav.length !== 0 ? favedIcon : unfavIcon);
        })
        .catch((err) => navigate("/error"));      
    }
  }, [restaurant, currentUser, navigate])

  const handleFavourite = () => {
    if (restaurant && currentUser) {
      const body = { user: currentUser.id, restaurant: restaurant.id };
      
      if (favImg === unfavIcon) {        
        createFav(body)
          .then((favCreated) => {
            setFavImg(favedIcon);
          })
          .catch((err) => navigate("/error"));
      } else {
        deleteFav(restaurant.id, currentUser.id)
          .then((favDeleted) => {
            setFavImg(unfavIcon);
          })
          .catch((err) => navigate("/error"));
      }
    }
  }
  
  return (
    restaurant && (
      <div id="restaurant-detail-container">
        <Navbar />
        <div
          className="resto-img"
          style={{ backgroundImage: `url(${restaurant.images[0]})` }}
        ></div>
        <div className="resto-info">
          <header className='resto-header-wrapper'>
            <h1>{restaurant.name}</h1>
            <div className="fav-wrapper" onClick={handleFavourite}>
              <img src={favImg} alt="favImg" className="fav-icon" />
            </div>
          </header>
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
            <div id="reviews-container">No reviews yet</div>
          </div>
        </div>
      </div>
    )
  );
}
