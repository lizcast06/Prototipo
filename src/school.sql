-- Crear tabla de estudiantes
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  materias INT,
  horarios VARCHAR(10)
  iscripciones VARCHAR(50)
  calificaciones VARCHAR(50)
);

-- Insertar un estudiante de ejemplo
INSERT INTO students (name,materias,horarios,iscripciones,calificaciones) 
VALUES ('Pacheco',' 2matematicas', '4pm a 5pm ','agosto','');


