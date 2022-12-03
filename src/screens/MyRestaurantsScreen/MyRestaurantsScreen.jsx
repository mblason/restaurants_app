import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import addIcon from '../../assets/images/restaurant/add-icon.png';
import editIcon from '../../assets/images/restaurant/edit-icon.png';
import trashIcon from "../../assets/images/restaurant/trash-icon.png";
import Navbar from '../../components/Navbar/Navbar';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import AuthContext from '../../contexts/AuthContext';
import { deleteRestaurant, getUserRestaurants } from '../../services/Restaurant.services';
import './MyRestaurantsScreen.css';

export default function MyRestaurantsScreen() {
    const [myRestaurants, setMyRestaurants] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            getUserRestaurants(currentUser.id)
            .then((restaurants) => {
                setMyRestaurants(restaurants)
            })
            .catch(err => navigate('/error'))
        }
    }, [currentUser, navigate])

    const handleDeleteRestaurant = (e) => {
      const { id } = e.target;

      deleteRestaurant(id)
        .then((restaurantDeleted) => {
          setMyRestaurants(myRestaurants.filter((resto) => resto.id !== restaurantDeleted.id));
        })
        .catch((err) => navigate("/error"));
    }

    return (
      <div id="myRestaurantsScreen-container">
        <h2>Your posted restaurants</h2>
        <Link to="/restaurant/create">
          <img src={addIcon} alt="addIcon" className="icon-navbar" />
          <span>Create</span>
        </Link>
        <Navbar />
        {myRestaurants.length !== 0 && (
          <div className="cards-container">
            {myRestaurants.map((resto) => (
              <div className="card-wrapper" key={resto.id}>
                <RestaurantCard {...resto} />
                <div className="actions-wrapper">
                  <Link to="/restaurant/edit" state={resto.id}>
                    <img
                      src={editIcon}
                      alt="editIcon"
                      className="action-icon"
                    />
                  </Link>
                  <img
                    onClick={handleDeleteRestaurant}
                    id={resto.id}
                    src={trashIcon}
                    alt="trashIcon"
                    className="action-icon"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
}