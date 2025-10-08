I. Patrones de Diseño GoF (Gang of Four)
Los 23 patrones de diseño GoF constituyen la base del diseño orientado a objetos. Su aplicación sistemática proporciona soluciones probadas para problemas recurrentes de estructura y comunicación de código, promoviendo la reusabilidad, la flexibilidad y la mantenibilidad del software .

1.1. Patrones Creacionales (Creación de Objetos)
Se enfocan en la creación de objetos, encapsulando la lógica de instanciación para evitar exponer los detalles de la creación al cliente .

Patrón: Factory Method (Método de Fábrica)

Intención: Proporciona una interfaz para la creación de objetos en una superclase, delegando la decisión de qué tipo de objeto instanciar a las subclases .

Ventajas: Desacopla la creación del objeto de su uso. Permite a las subclases alterar el tipo de objetos que se crearán, facilitando la extensión del código sin modificar el existente (Principio Abierto/Cerrado).   

Desventajas: La flexibilidad incrementada puede requerir la creación de subclases adicionales, lo que aumenta la complejidad inicial de la estructura.   

Uso en la Industria: Común en frameworks y librerías que necesitan crear componentes específicos (ej. conectores de bases de datos, elementos de interfaz) sin conocer las implementaciones concretas.   

Patrón: Singleton

Intención: Garantiza que una clase tenga una única instancia y proporciona un punto de acceso global y controlado a ella.   

Ventajas: Permite acceder a recursos compartidos globalmente y proporciona un control preciso sobre el ciclo de vida de la instanciación.   

Desventajas: El acceso global puede complicar las pruebas unitarias y la capacidad de simular o cambiar el comportamiento durante el testing.   

Uso en la Industria: Típicamente utilizado para gestores de configuración de aplicaciones, pools de conexiones a bases de datos o servicios de logging (registro de eventos).   

1.2. Patrones Estructurales (Composición de Clases y Objetos)
Se ocupan de cómo las clases y los objetos se organizan y componen en estructuras más grandes, manteniendo la flexibilidad y eficiencia .

Patrón: Adapter (Adaptador)

Intención: Traduce la interfaz de una clase a otra, permitiendo que dos interfaces incompatibles colaboren .

Ventajas: Permite la reutilización de clases o librerías existentes (ej. sistemas legacy) sin tener que modificar su código fuente .

Desventajas: Puede introducir una capa de complejidad si la traducción entre interfaces es muy elaborada.

Uso en la Industria: Integración de componentes de terceros o APIs externas que no cumplen con los estándares de interfaz internos.   

Patrón: Facade (Fachada)

Intención: Proporciona una interfaz simplificada a un subsistema complejo o una gran colección de clases.   

Ventajas: Reduce la complejidad y el acoplamiento: el cliente solo interactúa con la fachada simplificada, abstraído de la complejidad interna del subsistema.   

Desventajas: Si la fachada asume demasiadas responsabilidades, corre el riesgo de convertirse en un God Object (antipatrón).   

Uso en la Industria: Simplificación de grandes bibliotecas de clases o la unificación de la comunicación con un conjunto de microservicios internos.   

Patrón: Proxy

Intención: Proporciona un sustituto o marcador de posición para otro objeto real, controlando el acceso al objeto subyacente .

Ventajas: Permite controlar el acceso, añadir lógica de seguridad, realizar gestión de caché o manejar la carga diferida antes de acceder al objeto principal .

Uso en la Industria: Se utiliza en la implementación de proxies de red, acceso remoto o para añadir seguridad a un objeto sensible .

1.3. Patrones de Comportamiento (Comunicación y Responsabilidades)
Se enfocan en la comunicación efectiva y la asignación de responsabilidades entre objetos, promoviendo el acoplamiento flojo .

Patrón: Strategy (Estrategia)

Intención: Define una familia de algoritmos que son intercambiables, encapsulando cada algoritmo por separado. Permite seleccionar un comportamiento diferente en tiempo de ejecución .

Ventajas: Promueve el Principio Abierto/Cerrado, ya que se pueden añadir nuevos algoritmos (estrategias) sin modificar la clase de contexto que los utiliza. Esto mejora la testabilidad.   

Uso en la Industria: Algoritmos de ordenación, cálculo de tarifas o comisiones, o políticas de validación que deben ser intercambiables y dinámicas .

Patrón: Observer (Observador)

Intención: Establece una dependencia de uno-a-muchos, donde un sujeto notifica automáticamente a todos sus dependientes (observadores) sobre cualquier cambio en su estado .

Ventajas: Crea un acoplamiento flojo, dado que el sujeto no necesita conocer las clases concretas de sus observadores .

Uso en la Industria: Sistemas de eventos, procesamiento asíncrono y la actualización de interfaces de usuario en respuesta a cambios de datos .

Patrón: Mediator (Mediador)

Intención: Centraliza la comunicación entre varios objetos (colegas). Los objetos se comunican a través del mediador en lugar de interactuar directamente .

Ventajas: Reduce la complejidad de la comunicación y el acoplamiento al centralizar el control, simplificando la lógica de coordinación compleja .

Desventajas: El mediador puede crecer y volverse demasiado complejo si la coordinación que maneja es excesiva, convirtiéndose potencialmente en un God Object .

Diferencia clave vs. Observer: Observer distribuye eventos sin saber quién escucha; Mediator gestiona explícitamente el flujo de control y las interacciones entre los colegas .

II. Patrones Emergentes (Arquitectónicos)
Estos patrones se enfocan en la estructura de alto nivel del sistema, manejando la separación de preocupaciones, la persistencia y la complejidad del dominio.   

Patrón: MVC (Model-View-Controller)

Definición: Divide la aplicación en Modelo (datos y lógica de negocio), Vista (presentación) y Controlador (coordinación y entrada de usuario) .

Uso Conveniente: Ideal para aplicaciones web y de interfaz gráfica (GUI) que buscan una separación clara entre la lógica del negocio y la presentación .

Patrón: MVVM (Model-View-ViewModel)

Definición: Evolución de MVC, donde el ViewModel actúa como un broker entre el Modelo y la Vista, facilitando el enlace de datos (data binding) y el desacoplamiento .

Uso Conveniente: Popular en el desarrollo de interfaces de usuario modernas (ej. Android o frameworks reactivos) que se benefician de la automatización del enlace de datos, mejorando la testabilidad y la modularidad del código de la interfaz .

Patrón: DAO (Data Access Object)

Definición: Proporciona una interfaz abstracta que aísla la lógica de negocio de la tecnología de persistencia de datos subyacente (ej. MySQL, MongoDB).   

Uso Conveniente: Esencial para la modularidad y testabilidad. Permite cambiar la base de datos sin modificar el código de las capas de negocio y facilita la inyección de mocks para las pruebas unitarias.   

Patrón: DDD (Domain-Driven Design - Diseño Dirigido por el Dominio)

Definición: Enfoque arquitectónico que modela el software basándose fielmente en el dominio del negocio real, utilizando un lenguaje ubicuo .

Uso Conveniente: Se aplica a sistemas con lógica de negocio altamente compleja que requieren una arquitectura sostenible y robusta a largo plazo, concentrándose en cómo se gestionan los datos y la lógica dentro del dominio .

Patrón: CQRS (Command Query Responsibility Segregation)

Definición: Separa rigurosamente las operaciones de lectura (Consultas) y escritura (Comandos) en modelos de datos independientes. El modelo de escritura puede usar lógica de DDD, mientras que el modelo de lectura es simple para la proyección de datos.   

Uso Conveniente: Es excepcionalmente útil en sistemas que manejan alta concurrencia y donde la carga de lectura es significativamente mayor que la de escritura, o cuando las reglas de negocio son muy complejas en la escritura. No es conveniente si el dominio o las reglas de negocio son simples.   

III. Antipatrones (Soluciones Negativas)
Los antipatrones representan errores de diseño documentados que, aunque a veces son soluciones rápidas, tienen consecuencias negativas a largo plazo en la mantenibilidad y la deuda técnica.   

3.1. Antipatrón: God Object (Objeto Divino)
Definición: Una clase que concentra una cantidad desproporcionada de responsabilidades y referencias a numerosos tipos de datos, asumiendo un rol "todopoderoso". Viola el Principio de Responsabilidad Única.   

Por qué es dañino:

Mantenimiento difícil: Los cambios realizados para una rutina pueden tener un "efecto dominó" en otras partes no relacionadas debido al alto acoplamiento.   

Pérdida de Escalabilidad: Se convierte en un cuello de botella, y la complejidad se vuelve inmanejable a medida que el sistema crece.   

Fragilidad: El sistema depende excesivamente de este único componente, aumentando el riesgo de fallos en cascada.   

Cómo Evitarlo: Aplicar los principios SOLID. Descomponer el objeto en componentes más pequeños y enfocados. Utilizar una Arquitectura por Capas para distribuir la responsabilidad (ej. separar la lógica de negocio del acceso a datos).   

3.2. Antipatrón: Spaghetti Code (Código Espagueti)
Definición: Código que carece de estructura, modularización y un flujo lógico claro. Está desordenado y las funciones son largas y entrelazadas.   

Por qué es dañino:

Pesadilla Operacional: Es casi imposible seguir el flujo del programa, lo que hace que el debugging sea extremadamente difícil y la estimación de cambios sea inexacta.   

Riesgo de Rotura Constante: Los desarrolladores rompen funcionalidades existentes al intentar añadir nuevas, acumulando alta deuda técnica.   

Cómo Evitarlo:

Refactorización Continua: Romper funciones largas en unidades más pequeñas y enfocadas.   

Modularización y Clases: Introducir clases y módulos para organizar el código en componentes reutilizables.   

Uso de Patrones de Diseño: Adoptar patrones GoF para imponer estructuras probadas que organizan el código de forma limpia y organizada.   

IV. Integración y Entrega Continua (CI/CD)
CI/CD es el conjunto de prácticas automatizadas que, dentro de la filosofía DevOps, buscan aumentar la velocidad, la frecuencia y la fiabilidad de la entrega de software a los clientes .

4.1. Diferencia entre CI, CD (Delivery) y CD (Deployment)
Continuous Integration (CI - Integración Continua):

Definición: Los desarrolladores integran sus cambios de código en el repositorio principal frecuentemente, disparando automáticamente la compilación y la ejecución de pruebas .

Objetivo: Detectar errores de integración tempranamente y mantener la estabilidad del código .

Continuous Delivery (CD - Entrega Continua):

Definición: El código pasa por todas las etapas de compilación y prueba y se lleva a un entorno de staging o preproducción, quedando listo para ser liberado .

Intervención Humana: El despliegue final a producción requiere una intervención humana manual (ej. la pulsación de un botón) para su aprobación final .

Continuous Deployment (CD - Despliegue Continuo):

Definición: Extiende la Entrega Continua eliminando la intervención humana. Todo cambio que pasa satisfactoriamente las pruebas automatizadas se despliega automáticamente a producción .

Beneficio Clave: Acelera el feedback loop con el cliente y elimina la presión de los "días de lanzamiento" .

Beneficios en Equipos de Desarrollo Profesional:
La implementación de CI/CD ofrece beneficios operacionales significativos: Entrega más rápida de nuevas funcionalidades, mejora de la fiabilidad y la calidad del software gracias a las pruebas automatizadas, reducción del riesgo de errores humanos y mayor colaboración entre los equipos (DevOps).   


4.2. Herramientas de CI/CD Más Usadas
La elección de una herramienta CI/CD debe alinearse con la infraestructura, el modelo de despliegue, y la experiencia del equipo. Aunque todas cumplen funciones similares, varían en su ecosistema, facilidad de uso y curva de aprendizaje :   

Jenkins

Tipo: Servidor Standalone (Autónomo).

Características Clave: Es una herramienta open-source ampliamente utilizada, rica en plugins. Es altamente personalizable y adecuada para entornos complejos o para el manejo de sistemas legacy.

Curva de Aprendizaje / Uso: Tiene una curva de aprendizaje más empinada y su configuración inicial puede consumir más tiempo.

GitLab CI

Tipo: Basada en la Nube / Auto-gestionada.

Características Clave: Ofrece una integración nativa y fluida dentro del ecosistema GitLab, incluyendo SCM (Source Code Management) y funciones de seguridad incorporadas. Simplifica la configuración y gestión.

Curva de Aprendizaje / Uso: Tiene una curva de aprendizaje moderada y facilita la gestión de runners.

GitHub Actions

Tipo: Basada en la Nube.

Características Clave: Integración profunda y nativa con repositorios GitHub. Utiliza archivos YAML y ofrece un marketplace de acciones preconstruidas para automatizar flujos de trabajo (incluyendo pull requests).

Curva de Aprendizaje / Uso: Se considera fácil de usar y tiene una curva de aprendizaje más sencilla gracias a su configuración basada en YAML y su integración directa con GitHub.

CircleCI

Tipo: Basada en la Nube.

Características Clave: Herramienta enfocada en la velocidad, el alto rendimiento y el soporte multi-cloud.

Curva de Aprendizaje / Uso: Es una buena herramienta basada en la nube con fácil integración.


4.3. Ejemplos de Pipelines Típicos
Un pipeline de CI/CD es una secuencia de pasos automatizados divididos en etapas (stages). Un flujo estándar consta de las siguientes etapas :   

Source (Fuente): Activado por un commit o solicitud de extracción (PR) en el repositorio.   

Build (Compilación): Se crea el artefacto ejecutable (ej. binario, imagen Docker).   

Test (Prueba): Se ejecutan pruebas automatizadas (unitarias, de integración) para validar la estabilidad y el comportamiento.   

Deploy (Implementación): El artefacto probado es liberado a los entornos designados (staging o producción).   

4.4. Ejemplo de Configuración YAML de Pipeline Básico
La configuración de un pipeline como código se realiza típicamente en archivos YAML. Este ejemplo (basado en GitLab CI/CD) define un flujo básico de 3 etapas :

stages:
  - build
  - test
  - deploy

build_job:
  stage: build
  script:
    # 1. Ejecuta el script de compilación para generar el binario o paquete.
    - echo "Iniciando la fase de Construcción..."
    -./build_application.sh 
  artifacts:
    # 2. Guarda el resultado de la compilación para que esté disponible para el siguiente job.
    paths:
      -./dist/

test_unit:
  stage: test
  script:
    # 3. Ejecuta las pruebas automatizadas (solo corre si 'build' fue exitoso).
    - echo "Ejecutando Pruebas Unitarias..."
    -./run_unit_tests.sh
  
deploy_staging:
  stage: deploy
  script:
    # 4. Despliega el artefacto al entorno de prueba/staging.
    - echo "Desplegando a Entorno Staging..."
    -./deploy_script.sh staging
  rules:
    # 5. Regla de control: solo se despliega automáticamente si el cambio fue en la rama principal.
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH

Explicación del Flujo: El pipeline ejecutará secuencialmente build, luego test, y finalmente deploy. Si el trabajo de test falla, la etapa deploy no se ejecutará . El uso de artifacts es fundamental para pasar los archivos generados entre las etapas. La sección rules permite la automatización condicionada para asegurar que solo el código estable llegue a los entornos superiores.   

V. Selección y Estrategia de Aplicación de Patrones en el Módulo de Software
5.1. Selección Personal de 4 Patrones Clave
La selección se basa en la necesidad de flexibilidad, testabilidad y bajo acoplamiento, requisitos esenciales para un entorno de CI/CD robusto.   

Creacional: Factory Method

Estructural: Adapter

Comportamiento: Strategy

Emergente: DAO (Data Access Object)

5.2. Justificación Detallada y Estrategia de Integración
Patrón Creacional: Factory Method

Justificación: Se elige para gestionar la creación de objetos de negocio (ej., procesadores, generadores de reportes) de manera flexible, sin exponer la lógica de instanciación. Esto facilita la adición de nuevos tipos de objetos sin modificar el código cliente (el módulo que los usa).   

Integración (Semanas 3–4): Se definirá una interfaz central (Factory) para crear notificaciones o manejadores de datos. El módulo cliente solo invocará un método general (createHandler), y las subclases de la factoría manejarán la creación de las clases concretas (PDFHandler o CSVHandler).

Patrón Estructural: Adapter

Justificación: Vital para integrar cualquier servicio externo o librería que se requiera pero cuya interfaz sea incompatible con la arquitectura interna del módulo. Permite la reutilización sin refactorizar el código externo.   

Integración (Semanas 3–4): Se creará un LegacyAdapter para envolver una librería de autenticación o un servicio de logging antiguo. Este adaptador implementará la interfaz moderna esperada por nuestro módulo, traduciendo las llamadas al formato que el servicio legacy requiera.   

Patrón de Comportamiento: Strategy (Estrategia)

Justificación: Permite aplicar diferentes reglas de negocio o algoritmos (ej. diferentes tasas de comisión, métodos de cálculo) de forma intercambiable en tiempo de ejecución. Esto garantiza que cada algoritmo pueda ser probado de forma unitaria y aislada, requisito clave de la Integración Continua.   

Integración (Semanas 3–4): Se definirá la interfaz CalculationStrategy. Las clases concretas (StandardCalc, PremiumCalc) implementarán las políticas de negocio. La clase de contexto del módulo recibirá la estrategia a través de inyección de dependencias para cambiar dinámicamente el comportamiento.

Patrón Emergente: DAO (Data Access Object)

Justificación: Elegido específicamente por su impacto directo en la testabilidad y el CI/CD. El DAO aísla la lógica de negocio de la tecnología de persistencia de datos. Esto permite que las pruebas unitarias del módulo de negocio se ejecuten utilizando mocks del DAO, simulando la base de datos sin conectarse a infraestructura real. Esto acelera drásticamente la fase de Test del pipeline de CI.   

Integración (Semanas 3–4): La capa de servicios del módulo interactuará exclusivamente con la interfaz (UserRepositoryDAO). En el desarrollo y las pruebas (CI), se utilizará un MockDAO o un In-MemoryDAO, mientras que en producción se utilizará el DatabaseImplDAO.