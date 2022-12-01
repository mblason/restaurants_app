import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/HomeScreen/HomeScreen";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* HOME */}
        <Route path="/" element={<HomeScreen />} />
        {/* AUTH */}
        {/* RESTAURANTS CRUD */}
      </Routes>
    </div>
  );
}

export default App;