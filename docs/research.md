I. Patrones de Diseño GoF (Gang of Four)

Los 23 patrones de diseño GoF se consideran la base del diseño orientado a objetos, proveyendo soluciones probadas para problemas recurrentes de estructura y comunicación de código.1 Su uso promueve la reusabilidad, la flexibilidad y la mantenibilidad del software.1

1.1. Patrones Creacionales

Se enfocan en la creación de objetos, encapsulando la lógica de instanciación para evitar exponer los detalles de la creación al cliente.4 Esto incrementa la flexibilidad en la forma en que el sistema crea objetos.

Patrón
Ventajas
Desventajas
Ejemplo de Uso en la Industria
Factory Method
Desacopla la creación del objeto de su uso. Permite a las subclases decidir qué clase concreta instanciar, facilitando la extensión del código (Principio Abierto/Cerrado).4
Requiere la creación de subclases y una jerarquía de clases paralela para cada tipo de producto, lo que puede aumentar la complejidad inicial.6
Frameworks web y librerías que necesitan crear componentes específicos (ej. botones, ventanas) sin conocer las implementaciones concretas del sistema operativo subyacente.5
Singleton
Garantiza que una clase tenga una y solo una instancia única, proveyendo un punto de acceso global controlado.5 Útil para recursos compartidos.8
El acceso global puede complicar las pruebas unitarias ya que el objeto no puede ser fácilmente simulado o reconfigurado, introduciendo dependencias directas.6
Gestores de configuración de aplicaciones, pools de conexiones a bases de datos, o servicios de logging (registro de eventos).8


1.2. Patrones Estructurales

Se ocupan de la composición y la relación entre clases y objetos para formar estructuras más grandes, manteniendo la flexibilidad.4

Patrón
Ventajas
Desventajas
Ejemplo de Uso en la Industria
Adapter (Adaptador)
Permite que dos interfaces incompatibles colaboren. Reutiliza clases existentes que no pueden modificarse (ej. sistemas legacy).4
Puede añadir una capa de complejidad si la traducción entre interfaces es muy compleja.
Conexión de librerías o APIs externas que usan un modelo de datos diferente al de la aplicación principal.10
Facade (Fachada)
Proporciona una interfaz simplificada a un subsistema complejo, reduciendo el acoplamiento y la complejidad percibida por el cliente.10
El Facade puede convertirse en un God Object (antipatrón) si asume demasiadas responsabilidades internas.12
Un gestor que centraliza la interacción con una biblioteca compleja de terceros o un conjunto de microservicios internos.13
Proxy
Proporciona un sustituto o marcador de posición para controlar el acceso al objeto real (control de acceso, seguridad, carga diferida).11
Puede introducir latencia o complejidad si la lógica de control del Proxy se vuelve excesiva.
Servicios de acceso remoto o virtualización. Utilizado para implementar caché, seguridad o gestión de sesiones.13


1.3. Patrones de Comportamiento

Se centran en la comunicación efectiva, la interacción y la asignación de responsabilidades entre objetos, promoviendo el acoplamiento flojo.1

Patrón
Ventajas
Desventajas
Ejemplo de Uso en la Industria
Strategy (Estrategia)
Define una familia de algoritmos encapsulados de forma independiente. Permite seleccionar y cambiar el comportamiento (algoritmo) de un objeto en tiempo de ejecución.2
El aumento de la testabilidad puede requerir que el cliente conozca y elija la estrategia adecuada, añadiendo una pequeña sobrecarga.
Implementación de diferentes algoritmos de ordenación, cálculo de impuestos o políticas de validación que deben ser intercambiables.2
Observer (Observador)
Define una dependencia de uno-a-muchos. Los suscriptores (observadores) reciben notificaciones automáticas cuando el sujeto (observable) cambia de estado, manteniendo el acoplamiento flojo.16
Si la lógica de notificación es demasiado compleja, puede ser difícil de rastrear. El sujeto debe gestionar la lista de observadores, lo que puede ser costoso en alto volumen.16
Sistemas de eventos, procesamiento asíncrono, y la actualización de interfaces de usuario (Vistas) en respuesta a cambios de datos (Modelos).16
Mediator (Mediador)
Centraliza la comunicación compleja entre un conjunto de objetos (colegas). Los objetos no necesitan referenciarse directamente, reduciendo las dependencias muchos-a-muchos.7
Si la coordinación de las interacciones es demasiado compleja, el Mediador puede crecer y volverse un objeto difícil de mantener (potencial God Object).16
Gestión de tráfico de aviones en una torre de control (simulación) o coordinación de componentes de interfaz de usuario con interacciones complejas.16


II. Patrones Emergentes (Arquitectónicos)

Estos patrones abordan la estructura del sistema a un nivel superior, enfocándose en la separación de preocupaciones a través de capas o modelos.17

Patrón
Definición y Enfoque
Cuándo Conviene Aplicarlos
MVC (Model-View-Controller)
Divide la aplicación en tres partes: Modelo (datos y lógica de negocio), Vista (presentación de la interfaz) y Controlador (manejo de la entrada del usuario).17
Aplicaciones web tradicionales y de escritorio con interfaces de usuario. Ideal cuando se busca una clara separación entre la lógica del negocio y la presentación.17
DAO (Data Access Object)
Provee una capa de abstracción sobre la tecnología de persistencia de datos (ej. SQL, NoSQL), aislando la lógica de negocio de los detalles de la base de datos.19
En cualquier sistema que requiera cambiar la tecnología de almacenamiento de datos sin modificar las capas superiores, y para facilitar la inyección de mocks en pruebas unitarias.19
MVVM (Model-View-ViewModel)
Evolución de MVC, popular en entornos reactivos. El ViewModel expone datos del Modelo a la Vista de forma optimizada para el data binding, desacoplando aún más la interfaz.20
Aplicaciones con interfaces de usuario ricas y complejas (ej. Android, frameworks front-end modernos) que se benefician de la automatización del enlace de datos (data binding).20
DDD (Domain-Driven Design - Diseño Dirigido por el Dominio)
Es un enfoque arquitectónico que se centra en modelar el software basado rigurosamente en el dominio del negocio real, utilizando un lenguaje común entre expertos y desarrolladores.19
En sistemas con lógica de negocio altamente compleja, donde el entendimiento del dominio es crítico para el éxito del proyecto y se busca una arquitectura sostenible y robusta.17
CQRS (Command Query Responsibility Segregation)
Separa los modelos de datos y las operaciones de escritura (Comandos, que aplican lógica de negocio) y lectura (Consultas, que son rápidas y simples).21
Sistemas con alta concurrencia y donde la carga de lectura es mucho mayor que la de escritura, o cuando las reglas de negocio en la escritura son complejas y las consultas requieren optimizaciones específicas. No es conveniente si el dominio es simple (CRUD simple).21


III. Antipatrones

Los antipatrones son soluciones fallidas comunes que generan consecuencias negativas a largo plazo, aumentando la deuda técnica y disminuyendo la mantenibilidad.22

3.1. God Object (Objeto Divino)

Definición: Una clase que centraliza demasiadas responsabilidades y referencias a numerosos tipos de datos, violando el Principio de Responsabilidad Única (SRP).12
Perjuicios (Por qué es dañino):
Mantenimiento difícil: Cualquier cambio para una rutina puede tener un "efecto dominó" inesperado en otras partes del sistema debido al alto acoplamiento.12
Bajo Escalabilidad: Actúa como un cuello de botella central, haciendo que el sistema sea frágil y propenso a fallos en cascada.24
Testabilidad Nula: Es casi imposible de probar unitariamente de forma aislada.
Cómo Evitarlo: Aplicar los principios SOLID. Descomponer la funcionalidad en componentes más pequeños y enfocados. Utilizar una arquitectura por capas para distribuir responsabilidades (ej. separar lógica de negocio, acceso a datos y presentación).24

3.2. Spaghetti Code (Código Espagueti)

Definición: Código que carece de estructura lógica, modularización y un flujo de ejecución claro. Las funciones son largas, las variables mal nombradas y los módulos se enlazan de forma caótica.25
Perjuicios (Por qué es dañino):
Pesadilla de Mantenimiento: Hace que el debugging sea extremadamente difícil, ya que es imposible seguir el flujo del programa.25
Alta Deuda Técnica: La adición de nuevas funcionalidades resulta en la constante ruptura de las existentes, volviendo imposible dar estimaciones precisas de tiempo.25
Cómo Evitarlo:
Refactorización y Modularización: Romper funciones largas en unidades pequeñas y cohesionadas. Introducir clases para organizar el código en componentes reutilizables.28
Uso de Patrones: Adoptar patrones de diseño GoF y arquitectónicos, ya que imponen estructuras probadas que fuerzan la organización del código.28
Documentación y Estándares: Usar nombres claros para variables y funciones y seguir una guía de estilo consistente.26

IV. CI/CD (Continuous Integration / Continuous Delivery/Deployment)

CI/CD es un conjunto de prácticas automatizadas esenciales para aumentar la velocidad, la frecuencia y la fiabilidad de la entrega de software.29

4.1. Definición y Diferencias


Concepto
Qué Es
Intervención Humana
Principal Objetivo
CI (Integración Continua)
Práctica donde los desarrolladores fusionan el código frecuentemente al repositorio central. Se ejecuta automáticamente la compilación y las pruebas.31
Mínima. Se requiere para el commit inicial y la revisión del fallo.
Detectar errores de integración rápidamente y mantener la estabilidad del código base.32
CD (Entrega Continua / Delivery)
Extiende CI: el código se construye, prueba y se despliega automáticamente a un entorno de staging o preproducción listo para la liberación.31
Manual. Se requiere intervención para la aprobación final (el "clic de un botón") antes de ir a producción.31
Garantizar que el software sea desplegable en cualquier momento, pero con una puerta de control de negocio/calidad.33
CD (Despliegue Continuo / Deployment)
Extiende la Entrega Continua: todo cambio que pasa las pruebas automatizadas se despliega automáticamente a producción, sin necesidad de aprobación manual.32
Nula. Solo un fallo en la prueba detiene el despliegue.32
Acelerar el feedback loop con el cliente y eliminar la presión de los "días de lanzamiento".32

Beneficios en Equipos de Desarrollo Profesional:
Entrega Rápida: Acelera la liberación de nuevas funcionalidades y actualizaciones.34
Aumento de la Fiabilidad y Calidad: La automatización rigurosa de las pruebas y la validación en cada commit disminuye los errores humanos.34
Reducción de Riesgos: Los cambios pequeños y frecuentes son más fáciles de aislar y revertir en caso de fallo.34
Colaboración Mejorada: Fomenta la colaboración y el entendimiento compartido entre Desarrollo y Operaciones (DevOps).34

4.2. Herramientas Más Usadas

La elección de la herramienta depende de la infraestructura y el ecosistema del equipo.36

Herramienta
Tipo
Curva de Aprendizaje
Características Clave
GitHub Actions
Cloud-based
Fácil 37
Integración profunda y nativa con el repositorio GitHub. Utiliza archivos YAML. Amplio marketplace de acciones preconstruidas.36
GitLab CI
Cloud-based/Self-Managed
Moderada 37
Integración nativa y built-in dentro del ecosistema GitLab. Sencilla gestión de runners.36
Jenkins
Servidor Standalone
Empinada 37
Open-source. Altamente personalizable con un ecosistema de plugins masivo. Ideal para entornos complejos o legacy.36
CircleCI
Cloud-based
Buena 36
Enfoque en velocidad y rendimiento. Amplio soporte multi-cloud.36


4.3. Ejemplos de Pipelines Típicos

Un pipeline profesional sigue típicamente una secuencia de etapas, donde el éxito de una etapa es un prerrequisito para la siguiente.38
Source (Fuente): Se inicia por un cambio de código (ej. commit o Pull Request).34
Build (Compilación): Compila el código fuente para crear un artefacto ejecutable (ej. binario, imagen Docker, paquete JAR).34
Test (Prueba): Ejecuta pruebas unitarias, de integración y de seguridad. Esto valida el comportamiento y la calidad del código.34
Deploy (Implementación/Despliegue): El artefacto es liberado al entorno de destino (staging, preproducción o producción).34

4.4. Ejemplo de YAML de Pipeline Sencillo

Este ejemplo, basado en la sintaxis de GitLab CI, define un flujo básico de 3 etapas.

YAML


stages:
  - build
  - test
  - deploy

build_job:
  stage: build
  script:
    # 1. Comando para compilar el código fuente y generar el artefacto (ej. un JAR o binario).
    - echo "Iniciando la fase de Construcción..."
    -./build_application.sh 
  artifacts:
    # 2. Guarda el resultado de la compilación para que esté disponible para el siguiente job (test_unit).
    paths:
      -./dist/

test_unit:
  stage: test
  script:
    # 3. Comando para ejecutar las pruebas automatizadas (solo se ejecuta si build_job tuvo éxito).
    - echo "Ejecutando Pruebas Unitarias..."
    -./run_unit_tests.sh
  
deploy_staging:
  stage: deploy
  script:
    # 4. Comando para desplegar el artefacto de 'build_job' al entorno de staging.
    - echo "Desplegando a Entorno Staging..."
    -./deploy_script.sh staging
  rules:
    # 5. Restricción: este despliegue solo se ejecuta automáticamente si estamos en la rama 'main' o 'master'.
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH 


Explicación:
stages: Define el orden de ejecución: build -> test -> deploy.38 Si un trabajo en una etapa falla, el pipeline se detiene.39
build_job: El trabajo que realiza la compilación. El uso de artifacts es crucial para pasar los archivos generados a los trabajos posteriores.
test_unit: Confirma la calidad del código. Depende del éxito de build_job.38
deploy_staging: Trabaja en la implementación del software. La sección rules (reglas) se utiliza para controlar cuándo y dónde se ejecuta el trabajo (ej. solo despliegues automáticos en la rama principal).40

V. Selección y Estrategia de Aplicación de Patrones en el Módulo de Software


5.1. Justificación de la Elección de 4 Patrones

La selección se basa en la necesidad de:
Testabilidad Máxima: Necesaria para garantizar el éxito en la fase de CI/CD.
Flexibilidad: El módulo debe ser fácil de extender sin modificar el código existente.
Desacoplamiento de Infraestructura: La lógica de negocio no debe depender de la tecnología de persistencia.

Categoría
Patrón Seleccionado
Justificación de la Elección
Integración en el Módulo (Semanas 3–4)
Creacional
Factory Method
Necesario para gestionar la creación de objetos de diferente tipo (ej. distintos proveedores de servicio) sin forzar a la lógica de negocio a conocer sus clases concretas.6
Se implementará una factoría para crear clases de procesadores de datos o manejadores de archivos, basándose en un parámetro de configuración (ej. XMLProcessorFactory vs. JSONProcessorFactory).
Estructural
Adapter (Adaptador)
Esencial para integrar un componente de logging o una API de validación de terceros (que tiene una interfaz incompatible) con el resto del código, sin modificar esa librería externa.4
Se creará un ExternalServiceAdapter que implementará la interfaz de nuestro módulo, traduciendo las llamadas al formato que el servicio legacy o externo requiera.
Comportamiento
Strategy (Estrategia)
Permite que el módulo aplique diferentes reglas de negocio (ej. políticas de cálculo, validación de datos) de forma intercambiable, sin modificar el código principal.2
Se definirán múltiples clases de estrategia (ej. StandardPolicyStrategy, PremiumPolicyStrategy). El Módulo seleccionará la estrategia a aplicar basándose en las entradas del usuario o el estado del sistema en tiempo de ejecución.
Emergente
DAO (Data Access Object)
El patrón DAO aísla la lógica de negocio de la tecnología de persistencia.19 Esto es vital para la testabilidad, ya que permite simular (mockear) la base de datos en las pruebas unitarias de CI, asegurando que solo se pruebe la lógica de negocio, no la infraestructura.19
El código del módulo solo interactuará con la interfaz MyEntityDAO. Para las pruebas unitarias (ejecutadas en CI), se inyectará una implementación de mock (un DAO ficticio en memoria).

Obras citadas
Gang of 4 Design Patterns Explained: Creational, Structural, and Behavioral | DigitalOcean, fecha de acceso: octubre 7, 2025, https://www.digitalocean.com/community/tutorials/gangs-of-four-gof-design-patterns
GoF Design Patterns: An Overview - Sandeep Rai, fecha de acceso: octubre 7, 2025, https://sandeep-rai.medium.com/gof-design-patterns-an-overview-70f18eae8032
Patrones de diseño: ¿qué son?, usos, tipos y ventajas - IT Masters Mag, fecha de acceso: octubre 7, 2025, https://www.itmastersmag.com/transformacion-digital/patrones-de-diseno-descripciones-estandarizadas-para-problemas-repetitivos/
Gang of Four Design Patterns - A Guide to Object-Oriented Design - Coursera, fecha de acceso: octubre 7, 2025, https://www.coursera.org/articles/gang-of-four-design-patterns
Patrones creacionales - Refactoring.Guru, fecha de acceso: octubre 7, 2025, https://refactoring.guru/es/design-patterns/creational-patterns
Tejiendo el Tapiz del Software: La Importancia de los Patrones de Diseño Creacionales | by Vivian Britez | Medium, fecha de acceso: octubre 7, 2025, https://medium.com/@vivianbritez91/tejiendo-el-tapiz-del-software-la-importancia-de-los-patrones-de-dise%C3%B1o-creacionales-bc0bf0b95d8a
Qué son los Patrones de Diseño de software / Design Patterns, fecha de acceso: octubre 7, 2025, https://profile.es/blog/patrones-de-diseno-de-software/
