import { Routes, Route } from "react-router-dom";
import './App.css';
import CreateProfile from "./components/createprofile/CreateProfile"
import Homepage from "./components/homepage/Homepage"
import Search from "./pages/Search";
import LandingPage from "./components/landingpage/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/search" element={<Search />} />
      <Route path="/create-profile" element={<CreateProfile />} />
      <Route path="/landing" element={<LandingPage />} />
    </Routes>
  );
}

export default App;