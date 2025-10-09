import React, { useEffect, useState } from "react";
import { mockDB } from "../utils/mockDB";
import Styles from "./Materias.module.css";

interface Materia {
  id: string;
  nombre: string;
  profesor: string;
  codigo: number;
}

const Materias: React.FC = () => {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading] = useState(true);
  const [materiasInscritas, setMateriasInscritas] = useState<string[]>([]);

  // Materias adicionales de ingeniería
  const materiasIngenieria: Omit<Materia, "id">[] = [
    {
      nombre: "Cálculo Diferencial",
      profesor: "Dr. Roberto Mendoza",
      codigo: 201,
    },
    {
      nombre: "Física General",
      profesor: "Dra. Laura Sánchez",
      codigo: 202,
    },
    {
      nombre: "Algoritmos y Programación",
      profesor: "Ing. Carlos Ramírez",
      codigo: 203,
    },
    {
      nombre: "Química General",
      profesor: "Dr. Miguel Torres",
      codigo: 204,
    },
    {
      nombre: "Experiencia de Usuario",
      profesor: "Arq. Ana López",
      codigo: 205,
    },
  ];

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const data = await mockDB.materias.getAll();

        // Agregar las materias de ingeniería a las existentes
        const materiasCompletas = [
          ...data,
          ...materiasIngenieria.map((materia, index) => ({
            ...materia,
            id: `ing-${index + 1}`,
          })),
        ];

        setMaterias(materiasCompletas);
      } catch (error) {
        console.error("Error al obtener materias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterias();
  }, []);

  const handleInscribirse = async (materiaId: string) => {
    try {
      // Simular proceso de inscripción
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Agregar a la lista de materias inscritas
      setMateriasInscritas((prev) => [...prev, materiaId]);

      console.log(`Inscrito en la materia: ${materiaId}`);
    } catch (error) {
      console.error("Error al inscribirse:", error);
    }
  };

  const estaInscrito = (materiaId: string) => {
    return materiasInscritas.includes(materiaId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-white">
        Cargando materias...
      </div>
    );
  }

  if (materias.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-white">
        No hay materias registradas.
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Materias disponibles
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materias.map((materia) => {
          const inscrito = estaInscrito(materia.id);

          return (
            <div
              key={materia.id}
              className={`bg-blue/10 backdrop-blur-lg border ${
                inscrito ? "border-green-400" : "border-white/20"
              } rounded-2xl shadow-lg p-5 hover:scale-105 transition-transform duration-300`}
            >
              <h2 className="text-xl font-semibold mb-2">{materia.nombre}</h2>
              <p className="text-sm mb-1">
                👩‍🏫 Profesor:{" "}
                <span className="font-medium">{materia.profesor}</span>
              </p>
              <p className="text-sm mb-4">
                🎓 Código: <span className="font-medium">{materia.codigo}</span>
              </p>

              <button
                onClick={() => handleInscribirse(materia.id)}
                disabled={inscrito}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                  inscrito
                    ? "bg-green-600 text-white cursor-not-allowed"
                    : "bg-blue-300 hover:bg-blue-400 text-gray-800"
                }`}
              >
                {inscrito ? "Inscrito" : "Inscribirse"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Resumen de inscripciones */}
      {materiasInscritas.length > 0 && (
        <div className="mt-8 p-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl">
          <h3 className="text-xl font-semibold mb-3 text-center">
            Resumen de Inscripciones
          </h3>
          <p className="text-center">
            Te has inscrito en {materiasInscritas.length} materia
            {materiasInscritas.length !== 1 ? "s" : ""}
          </p>
        </div>
      )}
    </div>
  );
};

export default Materias;
