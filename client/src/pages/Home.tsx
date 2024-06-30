import { Outlet } from "react-router";

import NavBar from "../components/NavBar/NavBar";
const Home = () => {
  return (
    <div style={{ width: "100%" }}>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Home;
