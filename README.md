 Sistema de Gestión de Inscripciones y Pagos (Prototipo con Microservicios)

Este repositorio contiene un **prototipo funcional mínimo** basado en la arquitectura diseñada en la **Semana 3** (Modelo C4 + UML).

La finalidad es validar una arquitectura de microservicios que utiliza un **API Gateway** como punto de entrada único y un **Frontend** simple para interactuar.

---

Características Principales

* **Arquitectura de Microservicios:** Servicios independientes para **Usuarios** y **Pagos**.
* **API Gateway:** Punto de entrada con **autenticación JWT** básica.
* **Frontend:** Desarrollado en **React (Vite)** para consumir los servicios.
* **Aislamiento de Datos:** Cada microservicio utiliza su propia base de datos (patrón **Database per Service**).
* **Código Ligero:** Usa **SQLite** por defecto para simplicidad, pero está diseñado para ser compatible con PostgreSQL/MySQL.

---

📂 Estructura del Repositorio

Este proyecto sigue un patrón de **Monorepositorio** (Mono-repo) para simplificar la gestión de múltiples proyectos:

.
├── src/
│   ├── gateway/            -> API Gateway (Express + proxy)
│   ├── users-service/      -> Microservicio de usuarios (BD independiente)
│   ├── payments-service/   -> Microservicio de pagos (BD independiente)
│   └── frontend/           -> Frontend en React (Vite)
├── docs/
│   └── ADRs.md             -> Decisiones arquitectónicas actualizadas
└── README.md               -> Este archivo


Requisitos Previos

Asegúrate de tener instalado:

* **Node.js** (versión recomendada: `>= 18`)
* **npm** (versión recomendada: `>= 9`)
* *Opcional:* **PostgreSQL/MySQL** si deseas configurar una base de datos real (el prototipo usa SQLite por defecto).

---

 Instalación y Ejecución

Sigue estos pasos para levantar el sistema completo en tu entorno local:

1. Clonar el Repositorio

git clone [[https://github.com/lizcast06/Prototipo.git](https://github.com/lizcast06/Prototipo.git)](https://github.com/lizcast06/Prototipo.git)
cd Prototipo
-----

2. Instalar Dependencias
Ejecuta este comando en la raíz del proyecto. El script se encargará de instalar las dependencias en cada servicio (gateway, users-service, payments-service, frontend).

npm install

3. Levantar todos los Servicios
Utiliza el script dev:all para iniciar simultáneamente el Gateway, los Microservicios y el Frontend:

npm run dev:all

Endpoints Principales para Pruebas
Puedes interactuar con el sistema a través del Frontend o directamente usando el API Gateway (http://localhost:3000/api).

Servicio	Método	Ruta	Descripción
Usuarios	POST	/api/usuarios	Crea un nuevo usuario.
Usuarios	GET	/api/usuarios	Lista todos los usuarios registrados.
Pagos	POST	/api/pagos	Registra un nuevo pago.
Pagos	GET	/api/pagos	Lista todos los registros de pagos.


ADRs (Decisiones Arquitectónicas)
Las decisiones clave de la arquitectura se resumen a continuación y se detallan en /docs/ADRs.md.

ID	Decisión	Estado
ADR-01	Arquitectura basada en microservicios en lugar de monolito.	Aceptado
ADR-02	Estrategia de base de datos independiente por servicio.	Aceptado
ADR-03	OAuth2/JWT para autenticación.	Modificado

Cambios de Implementación
Durante el desarrollo del prototipo, se realizaron los siguientes ajustes para simplificar la ejecución local:

Autenticación: Se usó JWT simple en lugar de implementar el flujo completo de OAuth2 (ADR-03).

Base de Datos: Se reemplazó PostgreSQL por SQLite para evitar instalaciones complejas y simplificar el setup.

Proxy: El API Gateway se implementó con http-proxy-middleware en Express en lugar de usar un proxy dedicado como Nginx.

Todos estos cambios y sus justificaciones están documentados en detalle en el archivo /docs/ADRs.md.
