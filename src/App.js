import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthScreen from "./screens/AuthScreen/AuthScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoadingScreen from "./screens/LoadingScreen/LoadingScreen";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* AUTH */}
        <Route path="/" element={<AuthScreen />} />
        {/* <Route path="/validation" element={<LoadingScreen />} /> */}
        <Route path="/activate/:token" element={<LoadingScreen />} />

        {/* HOME */}
        <Route path="/home" element={<HomeScreen />} />

        {/* RESTAURANTS CRUD */}
      </Routes>
    </div>
  );
}

export default App;