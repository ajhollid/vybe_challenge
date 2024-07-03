import { Outlet } from "react-router";
import "./index.css";

import NavBar from "../../components/NavBar/NavBar";
const Home = () => {
  return (
    <div className="home-container">
      <NavBar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
