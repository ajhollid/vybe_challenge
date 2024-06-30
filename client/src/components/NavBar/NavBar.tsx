// @ts-ignore
import React from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="nav-bar">
      <a className="nav-link" onClick={() => handleNavigate("/market-cap")}>
        Market Cap
      </a>
      <a className="nav-link" onClick={() => handleNavigate("/tps")}>
        TPS
      </a>
      <a className="nav-link" onClick={() => handleNavigate("/balances")}>
        Wallet Balances
      </a>
    </div>
  );
};

export default NavBar;
