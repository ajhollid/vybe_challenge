// @ts-ignore
import React from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import marketCapIcon from "../../assets/market-cap.svg";
import tpsIcon from "../../assets/tps.svg";
import balanceIcon from "../../assets/balances.svg";

const NavBar = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="nav-bar">
      <a className="nav-link" onClick={() => handleNavigate("/market-cap")}>
        <img className="nav-icon" src={marketCapIcon} alt="Market Cap" />
      </a>
      <a className="nav-link" onClick={() => handleNavigate("/tps")}>
        <img className="nav-icon" src={tpsIcon} alt="TPS" />
      </a>
      <a className="nav-link" onClick={() => handleNavigate("/balances")}>
        <img className="nav-icon" src={balanceIcon} alt="Balances" />
      </a>
    </div>
  );
};

export default NavBar;
