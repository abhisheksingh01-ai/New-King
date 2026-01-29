import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Home from "./home/Home";
import Login from "./auth/Login/Login";
import Dashboard from "./auth/dashboard/Dashboard";
import NotFound from './home/NotFound';
const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("isAdminLoggedIn");
  return isAuthenticated ? <Outlet /> : <Navigate to="/hidden-login" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/satta-king" element={<Home />} />
          <Route path="/chart" element={<Home />} />
        <Route path="/hidden-login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/hidden-dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}