<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">Client Gateway para el proyecto Products App con NestJS.</p>

# Client Gateway - Products App

## Descripcion

API Gateway que expone endpoints HTTP y se comunica con el microservicio de productos por TCP usando NestJS Microservices.

## Arquitectura

- HTTP -> Client Gateway -> Products MS (TCP)
- Validaciones con `ValidationPipe` (whitelist + forbidNonWhitelisted)
- Manejo de errores RPC con `RpcCustomExceptionFilter`

## Requisitos

- Node.js + npm
- Microservicio `products-ms` ejecutandose y accesible por TCP

## Configuracion

Copia el archivo `.envTemplate` a `.env` y ajusta las variables:

```bash
PORT=3000
PRODUCTS_MICROSERVICE_HOST=localhost
PRODUCTS_MICROSERVICE_PORT=3001
```

## Instalacion

```bash
npm install
```

## Ejecutar

```bash
# desarrollo
npm run start:dev

# produccion
npm run start:prod
```

## Endpoints HTTP

Base URL: `http://localhost:<PORT>/api`

- `POST /products` crea un producto
- `GET /products` lista productos (query opcional `page` y `limit`)
- `GET /products/:id` obtiene un producto
- `PATCH /products/:id` actualiza un producto
- `DELETE /products/:id` responde un mensaje local (sin llamada al microservicio por ahora)

## Scripts utiles

```bash
npm run build
npm run lint
npm run test
```

## Problemas comunes

- Error `Config validation error`: revisa que el `.env` tenga `PORT`, `PRODUCTS_MICROSERVICE_HOST` y `PRODUCTS_MICROSERVICE_PORT`.
- Error `Internal server error` en `PATCH /products/:id`: valida que el `id` llegue como numero y que el microservicio este activo.

## Licencia

UNLICENSED (proyecto de aprendizaje).
