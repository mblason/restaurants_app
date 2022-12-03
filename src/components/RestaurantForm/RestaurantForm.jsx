import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { getOneRestaurant } from '../../services/Restaurant.services';
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
      <div>
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          defaultValue={restaurantData.name}
          name="name"
          id="name"
          onChange={handleOnChange}
          className={`form-control ${mongoErr?.name ? "is-invalid" : ""}`}
        ></input>
        {mongoErr?.name && (
          <div className="error-feedback">{mongoErr?.name}</div>
        )}
      </div>
      <div>
        <label htmlFor="neighborhood" className="form-label">
          Neighborhood
        </label>
        <input
          type="text"
          defaultValue={restaurantData.neighborhood}
          name="neighborhood"
          id="neighborhood"
          onChange={handleOnChange}
          className={`form-control ${
            mongoErr?.neighborhood ? "is-invalid" : ""
          }`}
        ></input>
        {mongoErr?.neighborhood && (
          <div className="error-feedback">{mongoErr?.neighborhood}</div>
        )}
      </div>
      <div>
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <input
          type="text"
          defaultValue={restaurantData.address}
          name="address"
          id="address"
          onChange={handleOnChange}
          className={`form-control ${mongoErr?.address ? "is-invalid" : ""}`}
        ></input>
        {mongoErr?.address && (
          <div className="error-feedback">{mongoErr?.address}</div>
        )}
      </div>
      <div>
        <label htmlFor="images" className="form-label">
          Images
        </label>
        <input
          type="file"
          defaultValue={restaurantData.images}
          name="images"
          id="images"
          onChange={handleOnChange}
          className={`form-control ${mongoErr?.images ? "is-invalid" : ""}`}
          multiple
          required
        ></input>
        {mongoErr?.images && (
          <div className="error-feedback">{mongoErr?.images}</div>
        )}
      </div>
      <div>
        <label htmlFor="cuisine_type" className="form-label">
          Cuisine type
        </label>
        <input
          type="text"
          defaultValue={restaurantData.cuisine_type}
          name="cuisine_type"
          id="cuisine_type"
          onChange={handleOnChange}
          className={`form-control ${
            mongoErr?.cuisine_type ? "is-invalid" : ""
          }`}
        ></input>
        {mongoErr?.cuisine_type && (
          <div className="error-feedback">{mongoErr?.cuisine_type}</div>
        )}
      </div>

      <div>
        <label className="form-label">Opening times</label>

        <div>
          <label htmlFor="Monday" className="form-label">
            Monday
          </label>

          <input
            type="text"
            defaultValue={restaurantData?.operating_hours?.Monday}
            name="Monday"
            id="Monday"
            onChange={handleOnChange}
            className={`form-control ${
              Object.hasOwn(mongoErr, "operating_hours.Monday")
                ? "is-invalid"
                : ""
            }`}
          ></input>
          {Object.hasOwn(mongoErr, "operating_hours.Monday") && (
            <div className="error-feedback">This field is required.</div>
          )}
        </div>

        <div>
          <label htmlFor="Tuesday" className="form-label">
            Tuesday
          </label>

          <input
            type="text"
            defaultValue={restaurantData?.operating_hours?.Tuesday}
            name="Tuesday"
            id="Tuesday"
            onChange={handleOnChange}
            className={`form-control ${
              Object.hasOwn(mongoErr, "operating_hours.Tuesday")
                ? "is-invalid"
                : ""
            }`}
          ></input>
          {Object.hasOwn(mongoErr, "operating_hours.Tuesday") && (
            <div className="error-feedback">This field is required.</div>
          )}
        </div>

        <div>
          <label htmlFor="Wednesday" className="form-label">
            Wednesday
          </label>

          <input
            type="text"
            defaultValue={restaurantData?.operating_hours?.Wednesday}
            name="Wednesday"
            id="Wednesday"
            onChange={handleOnChange}
            className={`form-control ${
              Object.hasOwn(mongoErr, "operating_hours.Wednesday")
                ? "is-invalid"
                : ""
            }`}
          ></input>
          {Object.hasOwn(mongoErr, "operating_hours.Wednesday") && (
            <div className="error-feedback">This field is required.</div>
          )}
        </div>

        <div>
          <label htmlFor="Thursday" className="form-label">
            Thursday
          </label>

          <input
            type="text"
            defaultValue={restaurantData?.operating_hours?.Thursday}
            name="Thursday"
            id="Thursday"
            onChange={handleOnChange}
            className={`form-control ${
              Object.hasOwn(mongoErr, "operating_hours.Thursday")
                ? "is-invalid"
                : ""
            }`}
          ></input>
          {Object.hasOwn(mongoErr, "operating_hours.Thursday") && (
            <div className="error-feedback">This field is required.</div>
          )}
        </div>

        <div>
          <label htmlFor="Friday" className="form-label">
            Friday
          </label>

          <input
            type="text"
            defaultValue={restaurantData?.operating_hours?.Friday}
            name="Friday"
            id="Friday"
            onChange={handleOnChange}
            className={`form-control ${
              Object.hasOwn(mongoErr, "operating_hours.Friday")
                ? "is-invalid"
                : ""
            }`}
          ></input>
          {Object.hasOwn(mongoErr, "operating_hours.Friday") && (
            <div className="error-feedback">This field is required.</div>
          )}
        </div>

        <div>
          <label htmlFor="Saturday" className="form-label">
            Saturday
          </label>

          <input
            type="text"
            defaultValue={restaurantData?.operating_hours?.Saturday}
            name="Saturday"
            id="Saturday"
            onChange={handleOnChange}
            className={`form-control ${
              Object.hasOwn(mongoErr, "operating_hours.Saturday")
                ? "is-invalid"
                : ""
            }`}
          ></input>
          {Object.hasOwn(mongoErr, "operating_hours.Saturday") && (
            <div className="error-feedback">This field is required.</div>
          )}
        </div>

        <div>
          <label htmlFor="Sunday" className="form-label">
            Sunday
          </label>

          <input
            type="text"
            defaultValue={restaurantData?.operating_hours?.Sunday}
            name="Sunday"
            id="Sunday"
            onChange={handleOnChange}
            className={`form-control ${
              Object.hasOwn(mongoErr, "operating_hours.Sunday")
                ? "is-invalid"
                : ""
            }`}
          ></input>
          {Object.hasOwn(mongoErr, "operating_hours.Sunday") && (
            <div className="error-feedback">This field is required.</div>
          )}
        </div>
      </div>

      <button onClick={handleOnClick}>
        {loading ? (
          <div className="loader-small"></div>
        ) : isCreate ? (
          "CREATE"
        ) : (
          "EDIT"
        )}
      </button>
    </form>
  );
}