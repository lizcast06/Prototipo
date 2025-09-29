import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.GATEWAY_PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// URLs de los microservicios
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://auth-service:4001';
const PAGOS_SERVICE_URL = process.env.PAGOS_SERVICE_URL || 'http://pagos-service:4002';

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// 🔁 Proxy para Auth Service
app.use('/auth', async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${AUTH_SERVICE_URL}${req.path}`,
      data: req.body,
      headers: {
        'Authorization': req.headers.authorization,
        'Content-Type': 'application/json'
      }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error en Auth Service:', error.message);
    res.status(error.response?.status || 500).json(
      error.response?.data || { error: 'Error conectando con Auth Service' }
    );
  }
});

// 🔁 Servicio de Pagos (simulado)
app.use('/pagos', async (req, res) => {
  try {
    // Validar token primero
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Token requerido' });
    }

    // Verificar token con auth service
    try {
      await axios.get(`${AUTH_SERVICE_URL}/verify`, {
        headers: { Authorization: authHeader }
      });
    } catch (authError) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    if (req.method === 'POST' && req.path === '/inscribir') {
      const { descripcion, monto } = req.body;
      
      if (!descripcion || !monto) {
        return res.status(400).json({ error: 'Descripción y monto son requeridos' });
      }

      const nuevaInscripcion = {
        id: Date.now().toString(),
        descripcion,
        monto: Number(monto),
        fecha: new Date().toISOString(),
        status: 'pendiente'
      };

      console.log('✅ Nueva inscripción creada:', nuevaInscripcion);
      return res.status(201).json(nuevaInscripcion);
    }

    if (req.method === 'GET' && req.path === '/listar') {
      // Simular lista de inscripciones
      const inscripciones = [
        {
          id: '1',
          descripcion: 'Inscripción Curso React Avanzado',
          monto: 1500,
          fecha: new Date().toISOString(),
          status: 'completado'
        },
        {
          id: '2',
          descripcion: 'Seminario TypeScript',
          monto: 800,
          fecha: new Date().toISOString(),
          status: 'pendiente'
        }
      ];

      return res.json(inscripciones);
    }

    res.status(404).json({ error: 'Endpoint no encontrado' });

  } catch (error) {
    console.error('Error en Pagos Service:', error);
    res.status(500).json({ error: 'Error interno del gateway' });
  }
});

// Health Check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'API Gateway',
    timestamp: new Date().toISOString(),
    services: {
      auth: AUTH_SERVICE_URL,
      pagos: PAGOS_SERVICE_URL
    }
  });
});

// Ruta principal
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 API Gateway - Sistema de Pagos de Inscripciones',
    version: '1.0.0',
    endpoints: {
      auth: '/auth',
      pagos: '/pagos',
      health: '/health'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🌐 API Gateway running on port ${PORT}`);
});