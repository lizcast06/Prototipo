# Proyecto Base de Datos con Docker

## 1. Requisitos
- Docker Desktop instalado
- Navegador web (para usar Adminer)

## 2. Levantar la base de datos MySQL
```bash
docker run --name db-docker -e MYSQL_ROOT_PASSWORD=rootsecret -e MYSQL_DATABASE=school -e MYSQL_USER=appuser -e MYSQL_PASSWORD=supersecret -p 3306:3306 -d mysql:8.4
```

## 3. Levantar Adminer
```bash
docker run --name adminer -p 8080:8080 --link db-docker:mysql -d adminer
```

## 4. Acceso a Adminer
- URL: http://localhost:8080  
- System: MySQL  
- Server: mysql  
- Username: appuser  
- Password: supersecret  
- Database: school  

## 5. Script de la base de datos
El script está en el archivo `school.sql` incluido en este paquete.

## 6. Verificación
En Adminer, ejecutar:
```sql
SELECT * FROM students;

```
