#!/bin/bash

echo "🚀 Instalando backend completo..."

echo "📦 Instalando Auth Service..."
cd auth-service
npm install
cd ..

echo "📦 Instalando API Gateway..."
cd api-gateway  
npm install
cd ..

echo "✅ Backend instalado correctamente"
echo "👉 Para ejecutar: docker-compose up -d"