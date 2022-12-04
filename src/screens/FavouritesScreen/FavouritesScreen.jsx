import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import trashIcon from '../../assets/images/users/trash-icon.png';
import Navbar from '../../components/Navbar/Navbar';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import AuthContext from '../../contexts/AuthContext';
import { getAllFavs } from '../../services/User.services';
import { deleteFav } from './../../services/User.services';
import './FavouritesScreen.css';

export default function FavouritesScreen() {
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState('');
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            setLoading(true);
            getAllFavs(currentUser.id)
            .then((favs) => {
                setFavourites(favs);
                setLoading(false);
            })
            .catch(err => navigate('/error'));
        }

    }, [currentUser, navigate])

    const handleDeleteFavourite = (e) => {
        const [ user, restaurant ] = e.target.id.split(',');
        
        deleteFav(restaurant, user)
          .then((favDeleted) => {
            setFavourites(favourites.filter((fav) => fav.id !== favDeleted.id));
          })
          .catch((err) => navigate("/error"));
    }

    return (
      <div id="favouritesScreen-container">
        <h2>Your favourites restaurants</h2>
        <Navbar />
        {loading && (
          <div className="spinner-container">
            <span className="loader"></span>
          </div>
        )}
        {!loading && favourites.length > 0 && (
          <div className="cards-container">
            {favourites.map((fav) => (
              <div className="card-wrapper">
                <RestaurantCard key={fav.id} {...fav.restaurant} />
                <div
                  className="actions-wrapper"
                  onClick={handleDeleteFavourite}
                >
                  <img
                    id={`${fav.user},${fav.restaurant.id}`}
                    src={trashIcon}
                    alt="trashIcon"
                    className="action-icon"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && favourites.length === 0 && (
          <div className="no-data-msg-container">
            <h4>Nothing here yet...</h4>
          </div>
        )}
      </div>
    );
}
