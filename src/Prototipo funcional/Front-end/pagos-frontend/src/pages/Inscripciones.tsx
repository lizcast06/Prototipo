// src/pages/Inscripciones.tsx
import React, { useEffect, useState } from "react";
import api from "../api";
import styles from "./Inscripciones.module.css";

type Inscripcion = {
  id?: string;
  descripcion: string;
  monto: number;
  fecha?: string;
};

const Inscripciones: React.FC = () => {
  const [list, setList] = useState<Inscripcion[]>([]);
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchList = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/pagos/listar");
      setList(res.data || []);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Error cargando inscripciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    try {
      await api.post("/pagos/inscribir", { descripcion, monto: Number(monto) });
      setDescripcion("");
      setMonto("");
      setSuccess("✅ Inscripción registrada exitosamente");
      await fetchList();
      
      // Auto-ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Error creando inscripción");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={styles.inscripcionesContainer}>
      <h1 className={styles.header}>📋 Gestión de Inscripciones</h1>
      
      {error && <div className={styles.errorAlert}>{error}</div>}
      {success && <div className={styles.successMessage}>{success}</div>}

      {/* Formulario de registro */}
      <div className={styles.formCard}>
        <h3 className={styles.subHeader}>➕ Nueva Inscripción</h3>
        <form onSubmit={handleCreate} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Descripción</label>
            <input 
              className={styles.input}
              type="text" 
              value={descripcion} 
              onChange={e => setDescripcion(e.target.value)} 
              placeholder="Inscripcion UTT"
              required 
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Monto</label>
            <input 
              className={styles.input}
              type="number" 
              value={monto} 
              onChange={e => setMonto(e.target.value === "" ? "" : Number(e.target.value))} 
              placeholder="0.00"
              min="0"
              step="0.01"
              required 
            />
          </div>
          
          <button className={styles.submitButton} type="submit">
            💾 Registrar
          </button>
        </form>
      </div>

      {/* Lista de inscripciones */}
      <div className={styles.tableContainer}>
        <h3 className={styles.subHeader}>📊 Inscripciones Registradas</h3>
        
        {loading ? (
          <div className={styles.loading}>
            <div>⏳ Cargando inscripciones...</div>
          </div>
        ) : (
          <div className={styles.tableResponsive}>
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th>#</th>
                  <th>Descripción</th>
                  <th>Monto</th>
                  <th>Fecha de Registro</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {list.length === 0 ? (
                  <tr>
                    <td colSpan={4} className={styles.emptyState}>
                      <div className={styles.emptyStateIcon}>📭</div>
                      <p>No hay inscripciones registradas</p>
                      <small>Comienza agregando una nueva inscripción arriba</small>
                    </td>
                  </tr>
                ) : (
                  list.map((it, idx) => (
                    <tr key={it.id || idx}>
                      <td>{idx + 1}</td>
                      <td>{it.descripcion}</td>
                      <td className={styles.amount}>{formatCurrency(it.monto)}</td>
                      <td className={styles.date}>
                        {it.fecha ? formatDate(it.fecha) : "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inscripciones;