// src/pages/Register.tsx
import React, { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Register.module.css";

const Register: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api.post("/auth/register", { nombre, email, password });
      alert("🎉 Registro exitoso. Ahora inicia sesión.");
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Error registrando usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>✨ Crear Cuenta</h2>
        {error && <div className={styles.errorAlert}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nombre completo</label>
            <input 
              className={styles.input}
              type="text" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              placeholder="Ingresa tu nombre"
              required 
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Correo electrónico</label>
            <input 
              className={styles.input}
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="tu@email.com"
              required 
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Contraseña</label>
            <input 
              className={styles.input}
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Mínimo 6 caracteres"
              required 
              minLength={6} 
            />
          </div>
          
          <button 
            className={styles.submitButton} 
            type="submit" 
            disabled={loading}
          >
            {loading ? "⏳ Creando cuenta..." : "🚀 Registrarse"}
          </button>
        </form>
        
        <div className={styles.loginLink}>
          <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
        </div>
      </div>
    </div>
  );
};


export default Register;