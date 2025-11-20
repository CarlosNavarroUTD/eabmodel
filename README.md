## Descargar
npm install

## Iniciar en desarrollo
npm run dev


## --Docker comands--

## Construir una nueva imagen Docker
docker build -t eabmodel .

## Eliminar el contenedor anterior (si existe)
do docker stop eabmodel && docker rm eabmodel

## Ejecutar el contenedor con reinicio automático
sudo docker run -d --name eabmodel --restart=always -p 3000:3000 eabmodel
 
## --Getting Started--
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
