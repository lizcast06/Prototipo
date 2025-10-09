El módulo de **inscripciones de materias** permite que los alumnos seleccionen y registren sus materias desde una interfaz desarrollada con **React y TypeScript**.  
Para mantener una estructura limpia, flexible y mantenible, se implementaron **cuatro patrones de diseño**:  
**Factory Method, Facade, Observer y MVVM (Model–View–ViewModel)**.  
Estos patrones mejoran la organización del código, la reutilización de componentes y la comunicación entre la vista y la lógica de negocio.

---

## 1. Patrón Creacional: Factory Method
**Objetivo:** Centralizar la creación de objetos de tipo `Materia`, permitiendo instanciar distintos tipos (obligatorias, optativas, laboratorio) de forma dinámica.

**Ventajas:**
- Facilita la extensión de nuevas clases sin modificar el código principal.
- Aumenta la cohesión y reduce el acoplamiento.

**Ejemplo:**
```tsx
// MateriaFactory.ts
export interface Materia {
  nombre: string;
  tipo: string;
}

export class MateriaObligatoria implements Materia {
  constructor(public nombre: string, public tipo = "Obligatoria") {}
}

export class MateriaOptativa implements Materia {
  constructor(public nombre: string, public tipo = "Optativa") {}
}

export class MateriaFactory {
  static crearMateria(nombre: string, tipo: string): Materia {
    if (tipo === "Obligatoria") return new MateriaObligatoria(nombre);
    return new MateriaOptativa(nombre);
  }
}
```

**Uso:**
```tsx
const nuevaMateria = MateriaFactory.crearMateria("Programación Web", "Obligatoria");
```

**Aplicación en el módulo:** Permite que las materias mostradas en pantalla se generen dinámicamente según el tipo seleccionado por el alumno.

---

## 2. Patrón Estructural: Facade
**Objetivo:** Simplificar la comunicación entre el formulario de inscripción y las peticiones al backend.

**Ventajas:**
- Oculta la complejidad de múltiples llamadas HTTP.
- Centraliza la lógica de conexión en una sola clase.

**Ejemplo:**
```tsx
// InscripcionesFacade.ts
import api from "./api";

export class InscripcionesFacade {
  static async inscribirMateria(materiaId: number, alumnoId: number) {
    return await api.post("/inscripciones", { materiaId, alumnoId });
  }

  static async obtenerMaterias() {
    return await api.get("/materias");
  }

  static async eliminarInscripcion(id: number) {
    return await api.delete(`/inscripciones/${id}`);
  }
}
```

**Uso:**
```tsx
await InscripcionesFacade.inscribirMateria(5, 12);
```

**Aplicación en el módulo:** El componente de inscripción solo necesita llamar a los métodos del `Facade`, reduciendo el código repetido y mejorando la legibilidad.

---

## 3. Patrón de Comportamiento: Observer
**Objetivo:** Actualizar automáticamente la interfaz cuando cambian las materias inscritas.

**Ventajas:**
- Mantiene sincronización automática entre el estado y la interfaz.
- Facilita la actualización en tiempo real de las listas.

**Ejemplo:**
```tsx
// useMateriasObserver.tsx
import { useState, useEffect } from "react";
import { InscripcionesFacade } from "./InscripcionesFacade";

export const useMateriasObserver = () => {
  const [materias, setMaterias] = useState([]);

  const actualizar = async () => {
    const res = await InscripcionesFacade.obtenerMaterias();
    setMaterias(res.data);
  };

  useEffect(() => {
    actualizar();
  }, []);

  return { materias, actualizar };
};
```

**Uso:**
```tsx
const { materias, actualizar } = useMateriasObserver();
```

**Aplicación en el módulo:** Cada vez que se inscribe o elimina una materia, la interfaz se actualiza automáticamente sin recargar la página.

---

## 4. Patrón Emergente: MVVM (Model–View–ViewModel)
**Objetivo:** Separar la lógica (ViewModel) de la interfaz (View) para lograr un código más limpio y escalable.

**Ventajas:**
- Mejora la separación de responsabilidades.
- Permite pruebas unitarias sobre la lógica sin depender de la interfaz.

**Ejemplo:**
```tsx
// useInscripcionesVM.ts
import { useState } from "react";
import { InscripcionesFacade } from "./InscripcionesFacade";

export const useInscripcionesVM = () => {
  const [materias, setMaterias] = useState([]);
  const [cargando, setCargando] = useState(false);

  const inscribirMateria = async (materiaId: number, alumnoId: number) => {
    setCargando(true);
    await InscripcionesFacade.inscribirMateria(materiaId, alumnoId);
    const res = await InscripcionesFacade.obtenerMaterias();
    setMaterias(res.data);
    setCargando(false);
  };

  return { materias, cargando, inscribirMateria };
};
```

**Uso en el componente (View):**
```tsx
// InscripcionesView.tsx
import React from "react";
import { useInscripcionesVM } from "./useInscripcionesVM";

const InscripcionesView = () => {
  const { materias, cargando, inscribirMateria } = useInscripcionesVM();

  return (
    <div>
      <h2>Inscripción de Materias</h2>
      {cargando && <p>Cargando...</p>}
      <ul>
        {materias.map((m: any) => (
          <li key={m.id}>{m.nombre}</li>
        ))}
      </ul>
      <button onClick={() => inscribirMateria(3, 1)}>Inscribir Materia</button>
    </div>
  );
};

export default InscripcionesView;
```

**Aplicación en el módulo:** El componente `InscripcionesView` actúa como la vista, mientras que `useInscripcionesVM` contiene la lógica del negocio (ViewModel), manteniendo el código organizado.

---

## Tabla Resumen
| Tipo de patrón | Nombre | Función principal | Aplicación en el módulo de inscripciones | Beneficio clave |
|----------------|---------|------------------|------------------------------------------|-----------------|
| Creacional | Factory Method | Crear objetos dinámicos de Materia | Genera materias según tipo seleccionado | Escalabilidad y flexibilidad |
| Estructural | Facade | Simplificar llamadas a la API | Centraliza la comunicación con el backend | Menor acoplamiento |
| Comportamiento | Observer | Sincronizar interfaz con datos | Actualiza lista de materias automáticamente | Reactividad y actualización en tiempo real |
| Emergente | MVVM | Separar vista y lógica | Organiza el código en capas (View y ViewModel) | Mantenimiento y pruebas más sencillas |

