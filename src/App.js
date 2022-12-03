import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
/* SCREENS */
import AuthScreen from "./screens/AuthScreen/AuthScreen";
import ErrorScreen from "./screens/ErrorScreen/ErrorScreen";
import FavouritesScreen from "./screens/FavouritesScreen/FavouritesScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoadingScreen from "./screens/LoadingScreen/LoadingScreen";
import MyRestaurantsScreen from "./screens/MyRestaurantsScreen/MyRestaurantsScreen";
import RestaurantDetailScreen from "./screens/RestaurantDetailScreen/RestaurantDetailScreen";
import RestaurantFormScreen from "./screens/RestaurantFormScreen/RestaurantFormScreen";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* AUTH */}
        <Route path="/" element={<AuthScreen />} />
        <Route path="/activate/:token" element={<LoadingScreen />} />
        <Route path="/validation" element={<LoadingScreen />} />
        {/* HOME */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          }
        />
        {/* RESTAURANTS CRUD */}
        <Route
          path="/restaurant/:id"
          element={
            <ProtectedRoute>
              <RestaurantDetailScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myRestaurants"
          element={
            <ProtectedRoute>
              <MyRestaurantsScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurant/create"
          element={
            <ProtectedRoute>
              <RestaurantFormScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurant/edit"
          element={
            <ProtectedRoute>
              <RestaurantFormScreen />
            </ProtectedRoute>
          }
        />

        {/* USERS FAVS */}
        <Route
          path="/myFavourites"
          element={
            <ProtectedRoute>
              <FavouritesScreen />
            </ProtectedRoute>
          }
        />
        {/* MISC & ERROR */}
        <Route path="/error" element={<ErrorScreen />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </div>
  );
}

export default App;