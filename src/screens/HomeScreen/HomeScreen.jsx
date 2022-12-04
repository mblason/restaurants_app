import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import { getAllRestaurants } from './../../services/Restaurant.services';
import './HomeScreen.css';

export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    getAllRestaurants()
    .then(restaurants => {
      setRestaurants(restaurants)
      setLoading(false);
    })
    .catch(err => navigate('/error'))
  }, [navigate])
  
  return (
    <div id="homeScreen-container">
      <h2>Welcome! Discover our restaurants</h2>
      <Navbar />
      {loading && (
        <div className="spinner-container">
          <span className="loader"></span>
        </div>
      )}
      {!loading && restaurants.length > 0 && (
        <div className="cards-container">
          {restaurants.map((resto) => (
            <RestaurantCard key={resto.id} {...resto} />
          ))}
        </div>
      )}
      {!loading && restaurants.length === 0 && (
        <div className="no-data-msg-container">
          <h4>Nothing here yet...</h4>
        </div>
      )}
    </div>
  );
}