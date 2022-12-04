import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import RestaurantForm from '../../components/RestaurantForm/RestaurantForm';
import { createRestaurant, editRestaurant } from '../../services/Restaurant.services';
import './RestaurantFormScreen.css';

export default function RestaurantFormScreen() {
  const [mongoErr, setMongoErr] = useState('');
  const [isCreate, setIsCreate] = useState('');
  const [isEdit, setIsEdit] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/restaurant/create") {
      setIsCreate(true);    
    } else if (location.pathname === "/restaurant/edit") {
      setIsEdit(true);
    }
  }, [location])

  const handleOnSubmit = (data) => {
    if (isCreate) {
      createRestaurant(data)
        .then((resto) => {
          navigate("/myRestaurants");
        })
        .catch((err) => {
          window.scrollTo(0, 0);
          err?.response?.data && setMongoErr(err.response.data.errors);
        });
    }

    if (isEdit) {
      data.id = location.state;
      editRestaurant(data)
        .then((resto) => {
          navigate("/myRestaurants");
        })
        .catch((err) => {
          window.scrollTo(0, 0);
          err?.response?.data && setMongoErr(err.response.data.errors);
        });
    }
  };

  return (
    <div className="form-restaurant-container">
      {isCreate && <h2>Let's post your restaurant!</h2>}
      {isEdit && <h2>Edit your restaurant</h2>}
      <Navbar />
      <RestaurantForm
        mongoErr={mongoErr}
        handleFormSubmit={handleOnSubmit}
        isCreate={isCreate}
        isEdit={isEdit}
        restaurantId={location.state}
      />
    </div>
  );
}