import React from "react";
import {
  Routes,
  Route,
  Link,
  Outlet,
  Switch,
  Redirect,
} from "react-router-dom";

import { useAuth } from "./AuthContext";
import { getAuth, signOut } from "firebase/auth";
//import "./BarraNavegacion.css";
import { useNavigate } from "react-router-dom";

import Home from "../public/Home";
import LoginForm from "../login/LoginForm";
import RegisterForm from "../login/RegisterForm";
import AcercaDe from "../public/AcercaDe";
import Contacto from "../public/Contacto";
import Dashboard from "../public/Dashboard";

const BarraRutasPublic = () => {
  const { user } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    if (user) {
      signOut(auth)
        .then(() => {
          // Cierre de sesión exitoso
          navigate("/home"); // Redirigir a ruta /home
        })
        .catch((error) => {
          console.error("Error al cerrar sesión:", error);
        });
    }
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Navbar
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div id="menu" class="collapse navbar-collapse">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>{" "}
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>{" "}
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/acerca">
                  Acerca De
                </Link>{" "}
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/contacto">
                  Contacto
                </Link>{" "}
              </li>
            </ul>
            <div className="d-flex" id="login">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/nuevoregistro">
                    Registrar
                  </Link>
                </li>
                {user ? ( ////////  Para cerrar sesión   ///////////
                  <li className="nav-item">
                    <Link className="nav-link" onClick={handleSignOut}>
                      {" "}
                      Cerrar sesión{" "}
                    </Link>{" "}
                  </li>
                ) : (
                  <li className="nav-item">
                    {" "}
                    <Link className="nav-link" to="/Iniciarsesion">
                      Iniciar sesión
                    </Link>{" "}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/nuevoregistro" element={<RegisterForm />} />
        <Route path="/iniciarsesion" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/acerca" element={<AcercaDe />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </div>
  );
};

export default BarraRutasPublic;

/*
  
                {user ? (         ////////  Para cerrar sesión   ///////////
                <li><Link onClick={handleSignOut} > Cerrar sesión </Link> </li> 
                ) : (
                <li> <Link to="/Iniciarsesion">Iniciar sesión</Link> </li>
              )}
  
  
  /*


/*
const handleSignOut = () => {
    if (user) {
      signOut(auth)
        .then(() => {
          // Cierre de sesión exitoso
          navigate('/home'); // Redirigir a ruta /home
        })
        .catch((error) => {
          console.error('Error al cerrar sesión:', error);
        });
    }
  }
*/
