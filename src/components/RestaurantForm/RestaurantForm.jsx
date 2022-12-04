import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { getOneRestaurant } from '../../services/Restaurant.services';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './RestaurantForm.css';

export default function RestaurantForm({
  mongoErr,
  handleFormSubmit,
  restaurantId,
  isCreate,
  isEdit
}) {
  const [restaurantData, setRestaurantData] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (restaurantId) {
      getOneRestaurant(restaurantId)
        .then((resto) => {          
          setRestaurantData(resto);
        })
        .catch((err) => navigate("/error"));
    }
  }, [navigate, restaurantId]);

  const handleOnClick = () => {
    setLoading(true);
  };

  const handleOnChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setImages(files);
    }

    setRestaurantData({ ...restaurantData, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    const extraData = {
      ...restaurantData,
      owner: currentUser.id,
    };

    for (let data in extraData) {
      formData.append(data, extraData[data]);
    }

    for (let image of images) {
      formData.append("images", image);
    }

    handleFormSubmit(formData);
    setLoading(false);
  };

  return (
    <form onSubmit={handleOnSubmit} className="form-restaurant-create-edit">
      <Input
        placeholder="Ex: McDonald's"
        id="name"
        name="name"
        error={mongoErr?.name && mongoErr.name}
        onChange={handleOnChange}
        label="Name"
        defaultValue={restaurantData.name}
      />

      <Input
        placeholder="Ex: Queens"
        id="neighborhood"
        name="neighborhood"
        error={mongoErr?.neighborhood && mongoErr.neighborhood}
        onChange={handleOnChange}
        label="Neighborhood"
        defaultValue={restaurantData.neighborhood}
      />

      <Input
        placeholder="Ex: 5-48 49th Ave, New York"
        id="address"
        name="address"
        error={mongoErr?.address && mongoErr.address}
        onChange={handleOnChange}
        label="Address"
        defaultValue={restaurantData.address}
      />

      <Input
        type="file"
        id="images"
        name="images"
        error={mongoErr?.images && mongoErr.images}
        onChange={handleOnChange}
        label="Images"
        defaultValue={restaurantData.images}
        multiple={true}
        required={true}
      />

      <Input
        placeholder="Ex: American"
        id="cuisine_type"
        name="cuisine_type"
        error={mongoErr?.cuisine_type && mongoErr.cuisine_type}
        onChange={handleOnChange}
        label="Cuisine type"
        defaultValue={restaurantData.cuisine_type}
      />

      <div>
        <label className="form-label">Opening times</label>

        <Input
          placeholder="Ex: 10:00am - 23:00pm or Closed"
          id="Monday"
          name="Monday"
          error={
            Object.hasOwn(mongoErr, "operating_hours.Monday") &&
            "This field is required."
          }
          onChange={handleOnChange}
          label="Monday"
          defaultValue={restaurantData?.operating_hours?.Monday}
        />

        <Input
          placeholder="Ex: 10:00am - 23:00pm or Closed"
          id="Tuesday"
          name="Tuesday"
          error={
            Object.hasOwn(mongoErr, "operating_hours.Tuesday") &&
            "This field is required."
          }
          onChange={handleOnChange}
          label="Tuesday"
          defaultValue={restaurantData?.operating_hours?.Tuesday}
        />

        <Input
          placeholder="Ex: 10:00am - 23:00pm or Closed"
          id="Wednesday"
          name="Wednesday"
          error={
            Object.hasOwn(mongoErr, "operating_hours.Wednesday") &&
            "This field is required."
          }
          onChange={handleOnChange}
          label="Wednesday"
          defaultValue={restaurantData?.operating_hours?.Wednesday}
        />

        <Input
          placeholder="Ex: 10:00am - 23:00pm or Closed"
          id="Thursday"
          name="Thursday"
          error={
            Object.hasOwn(mongoErr, "operating_hours.Thursday") &&
            "This field is required."
          }
          onChange={handleOnChange}
          label="Thursday"
          defaultValue={restaurantData?.operating_hours?.Thursday}
        />

        <Input
          placeholder="Ex: 10:00am - 23:00pm or Closed"
          id="Friday"
          name="Friday"
          error={
            Object.hasOwn(mongoErr, "operating_hours.Friday") &&
            "This field is required."
          }
          onChange={handleOnChange}
          label="Friday"
          defaultValue={restaurantData?.operating_hours?.Friday}
        />

        <Input
          placeholder="Ex: 10:00am - 23:00pm or Closed"
          id="Saturday"
          name="Saturday"
          error={
            Object.hasOwn(mongoErr, "operating_hours.Saturday") &&
            "This field is required."
          }
          onChange={handleOnChange}
          label="Saturday"
          defaultValue={restaurantData?.operating_hours?.Saturday}
        />

        <Input
          placeholder="Ex: 10:00am - 23:00pm or Closed"
          id="Sunday"
          name="Sunday"
          error={
            Object.hasOwn(mongoErr, "operating_hours.Sunday") &&
            "This field is required."
          }
          onChange={handleOnChange}
          label="Sunday"
          defaultValue={restaurantData?.operating_hours?.Sunday}
        />
      </div>

      <Button
        onClick={handleOnClick}
        loading={loading}
        {...(!loading && isCreate && { text: "Create" })}
        {...(!loading && !isCreate && { text: "Edit" })}
      ></Button>
    </form>
  );
}