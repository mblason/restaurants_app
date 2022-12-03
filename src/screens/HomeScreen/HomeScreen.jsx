import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import { getAllRestaurants } from './../../services/Restaurant.services';
import './HomeScreen.css';

export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllRestaurants()
    .then(restaurants => {
      setRestaurants(restaurants)
    })
    .catch(err => navigate('/error'))
  }, [navigate])
  
  return (
    <div id="homeScreen-container">
      <h2>Welcome! Discover our restaurants</h2>    
      <Navbar /> 
      {restaurants.length !== 0 && 
        <div className="cards-container">         
          {restaurants.map(resto =>
            <RestaurantCard
              key={resto.id}
              {...resto}
            />)}        
        </div>
      }
    </div>
  )
}