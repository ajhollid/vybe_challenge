import "./App.css";
import Home from "./pages/Home";
import TPS from "./pages/TPS";
import MarketCap from "./pages/MarketCap";
import TopWallets from "./pages/Balances";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<MarketCap />} />
          <Route path="/market-cap" element={<MarketCap />} />
          <Route path="/tps" element={<TPS />} />
          <Route path="/balances" element={<TopWallets />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
