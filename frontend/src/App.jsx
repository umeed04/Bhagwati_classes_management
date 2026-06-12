import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import AddStudent from "./Components/AddStudent";
import ShowStudent from "./Components/ShowStudent";
import FeesDashboard from "./Components/FeesDashBoard";
import Home from "./Components/Home";
import EditStudent from "./Components/EditStudent";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import ProtectedRoute from "./Components/ProtectedRoute";
function Layout() {

  const location = useLocation();
  const hideLayout = location.pathname === "/";

  return (
    <>

      {!hideLayout && <Navbar />}

      <Routes>

       
        <Route path="/" element={<Login />} />
<Route path="/logout" element={<Logout />} />
        
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddStudent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <ShowStudent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/all"
          element={
            <ProtectedRoute>
              <ShowStudent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update/:id"
          element={
            <ProtectedRoute>
              <EditStudent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/fees"
          element={
            <ProtectedRoute>
              <FeesDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

      {!hideLayout && <Footer />}

    </>
  );
}



function App() {

  return (

    <Router>
      <Layout />
    </Router>

  );

}

export default App;