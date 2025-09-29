// src/pages/Inscripciones.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Materias.module.css";

interface Subject {
  id: number;
  name: string;
  capacity: number;
}

interface Enrollment {
  id: number;
  subject_name: string;
}

const Inscripciones: React.FC = () => {
  const studentId = 1; // 👈 luego lo tomas de auth o JWT
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  // Cargar materias y mis inscripciones
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/subjects")
      .then((res) => setSubjects(res.data));
    axios
      .get(`http://localhost:4000/api/enrollment/${studentId}`)
      .then((res) => setEnrollments(res.data));
  }, [studentId]);

  // Inscribir alumno
  const enroll = async (subjectId: number) => {
    try {
      await axios.post("http://localhost:4000/api/enrollment", {
        studentId,
        subjectId,
      });
      alert("✅ Inscripción exitosa");
      // refrescar inscripciones
      const res = await axios.get(
        `http://localhost:4000/api/enrollment/${studentId}`
      );
      setEnrollments(res.data);
    } catch (err: any) {
      alert(err.response?.data?.message || "Error al inscribirse");
    }
  };

  return (
    <div>
      <h2 className="mb-4">📋 Gestión de Inscripciones</h2>

      <h4>Materias Disponibles</h4>
      <ul className="list-group mb-4">
        {subjects.map((s) => (
          <li
            key={s.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {s.name} (Cupo: {s.capacity})
            <button
              className="btn btn-primary btn-sm"
              onClick={() => enroll(s.id)}
            >
              Inscribirme
            </button>
          </li>
        ))}
      </ul>

      <h4>Mis Inscripciones</h4>
      <ul className="list-group">
        {enrollments.map((e) => (
          <li key={e.id} className="list-group-item">
            {e.subject_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inscripciones;
