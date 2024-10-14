import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import FeedPage from "./pages/FeedPage/FeedPage";
import MyAccountPage from "./pages/MyAccountPage/MyAccountPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/my-account" element={<MyAccountPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
