import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import CartPage from "./pages/CartPage.js";

function App() {
  localStorage.removeItem("Items");
  return (
    <div
      className="App"
      style={{
        height: "100vh",
        width: "100vw",
        flex: 1,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Cart" element={<CartPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
