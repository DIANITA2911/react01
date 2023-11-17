import { Routes, Route, Outlet, Switch, Redirect } from "react-router-dom";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { getAuth, signOut } from "firebase/auth";
//import "./BarraNavegacion.css";
import { useNavigate } from "react-router-dom";

///////////////// PROTEGIDA - SistemaCRUD //////////////
import SistemaCRUD from "../protegido/SistemaCRUD";
import ListaDeAlumnos from "../protegido/sistemacrud/ListaDeAlumnos";

///////////////// PROTEGIDA - SistemaFILE //////////////
import SistemaFILE from "../protegido/SistemaFILE";
import Fotos from "../protegido/sistemafile/Fotos";

//////////////////////// PAG. PUBLICOS /////////////////
import RegisterForm from "../login/RegisterForm";
import LoginForm from "../login/LoginForm";
import AppLista from "../protegido/sistemacrud/AppLista";

const BarraRutasProtected = () => {
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
                <Link className="nav-link" to="/sistema-crud/applista">
                  Sistema CRUD
                </Link>{" "}
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/sistema-crud/alumnos">
                  Alumnos
                </Link>{" "}
              </li>
              <li class="nav-item">
                <Link className="nav-link" to="/sistema-file/fotos">
                  Fotos
                </Link>{" "}
              </li>
            </ul>
            <div className="d-flex" id="login">
              <ul className="navbar-nav me-auto">
                {user ? ( ////////  Usuario autenticado  ///////////
                  <li className="nav-link">
                    Usuario autenticado: <span> {user.email}</span>{" "}
                  </li>
                ) : null}
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
        <Route path="/iniciarsesion" element={<LoginForm />} />
        <Route path="/nuevoregistro" element={<RegisterForm />} />

        <Route path="/sistema-crud" element={<MarcoParaSistemaCRUD />}>
          <Route index element={<SistemaCRUD />} />
          <Route path="applista" element={<AppLista />} />
          <Route path="alumnos" element={<ListaDeAlumnos />} />
        </Route>

        <Route path="/sistema-file" element={<MarcoParaSistemaFILE />}>
          <Route index element={<SistemaFILE />} />
          <Route path="fotos" element={<Fotos />} />
        </Route>
      </Routes>
    </div>
  );
};

export default BarraRutasProtected;

function MarcoParaSistemaCRUD() {
  return (
    <div className="container-page">
      <h1>Marco sistema CRUD</h1>
      <Outlet /> {/* Aquí se mostrarán las rutas secundarias */}
    </div>
  );
}

function MarcoParaSistemaFILE() {
  return (
    <div className="container-page">
      <h1>Marco Sistema FILES</h1>
      <Outlet /> {/* Aquí se mostrarán las rutas secundarias */}
    </div>
  );
}

/*
  
                {user ? (         ////////  Para cerrar sesión   ///////////
                <li><Link onClick={handleSignOut} > Cerrar sesión </Link> </li> 
                ) : (
                <li> <Link to="/iniciarsesion">Iniciar sesión</Link> </li>
              )}

              <li><Link to="/nuevoregistro">Registrar</Link></li>

              {user ? (         ////////  Usuario autenticado  ///////////
                <li>Usuario autenticado: <span> {user.email}</span> </li> 
                ) : (
                null
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
