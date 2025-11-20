# Imagen base
FROM node:20-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto de los archivos
COPY . .

RUN npx prisma generate

# Crear archivo .env.local si es necesario para la compilación
RUN touch .env.local

# Construir la aplicación (con manejo de errores)
RUN npm run build || (echo "Build failed. Check the logs above for details." && exit 1)

# Exponer el puerto
EXPOSE 3000

# Usar formato JSON para CMD como recomienda Docker
CMD ["npm", "start"]
