import React from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Inscripciones from "./pages/Inscripciones";
import ProtectedRoute from "./components/ProtectedRoute";
import { isAuthenticated, logout } from "./utils/auth";
import styles from "./App.module.css";

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // No mostrar navbar/footer en páginas de login/register
  const hideNavbarFooter = location.pathname === "/login" || location.pathname === "/register";

  if (hideNavbarFooter) {
    return (
      <div className={styles.appContainer}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className={styles.appContainer}>
      {/* Navbar solo visible en Home e Inscripciones */}
      <nav className={`navbar navbar-expand-lg navbar-dark ${styles.navbar}`}>
        <div className="container">
          <Link className={`navbar-brand ${styles.navbarBrand}`} to="/">
            🎓 Inscripciones
          </Link>
          
          <div className="d-flex align-items-center">
            {isAuthenticated() ? (
              <div className="d-flex align-items-center gap-3">
                <span className="text-white">¡Bienvenido!</span>
                <Link 
                  className={`btn btn-light btn-sm ${styles.primaryButton}`} 
                  to="/inscripciones"
                >
                  📋 Inscripciones
                </Link>
                <button 
                  className={`btn btn-outline-light btn-sm ${styles.outlineButton}`} 
                  onClick={handleLogout}
                >
                  🔒 Cerrar sesión
                </button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link 
                  className={`btn btn-outline-light btn-sm ${styles.outlineButton}`} 
                  to="/login"
                >
                  🔑 Login
                </Link>
                <Link 
                  className={`btn btn-light btn-sm ${styles.primaryButton}`} 
                  to="/register"
                >
                  ✨ Registro
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <Routes>
          <Route path="/" element={
            <div className="text-center text-white py-5">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className={styles.heroSection}>
                    <h1 className="display-4 fw-bold mb-4">
                      🎓 Sistema de Pagos
                    </h1>
                    <p className="lead mb-4 fs-5 opacity-90">
                      Gestiona tus inscripciones de manera fácil y segura
                    </p>
                    <div className="mt-4">
                      {!isAuthenticated() ? (
                        <div className="d-flex justify-content-center gap-3">
                          <Link 
                            className={`btn btn-light btn-lg ${styles.primaryButton}`} 
                            to="/register"
                          >
                            Comenzar Ahora
                          </Link>
                          <Link 
                            className={`btn btn-outline-light btn-lg ${styles.outlineButton}`} 
                            to="/login"
                          >
                            Ingresar
                          </Link>
                        </div>
                      ) : (
                        <Link 
                          className={`btn btn-light btn-lg ${styles.primaryButton}`} 
                          to="/inscripciones"
                        >
                          Ver Inscripciones
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="row mt-5">
                <div className="col-md-4 mb-4">
                  <div className={styles.featureCard}>
                    <div className="fs-1 mb-3">⚡</div>
                    <h5>Rápido y Seguro</h5>
                    <p className="small opacity-90">Procesos optimizados</p>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className={styles.featureCard}>
                    <div className="fs-1 mb-3">🎯</div>
                    <h5>Fácil de Usar</h5>
                    <p className="small opacity-90">Interfaz intuitiva</p>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className={styles.featureCard}>
                    <div className="fs-1 mb-3">🔒</div>
                    <h5>Protegido</h5>
                    <p className="small opacity-90">Tus datos seguros</p>
                  </div>
                </div>
              </div>
            </div>
          }/>
          
          <Route path="/inscripciones" element={
            <ProtectedRoute>
              <Inscripciones />
            </ProtectedRoute>
          } />
        </Routes>
      </div>

      {/* Footer solo visible en Home e Inscripciones */}
      <footer className={`text-center text-white py-4 mt-5 ${styles.footer}`}>
        <div className="container">
          <p className="mb-0 opacity-80">© 2024 Inscripciones</p>
        </div>
      </footer>
    </div>
  );
};

export default App;