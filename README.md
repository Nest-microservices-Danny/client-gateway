<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">Client Gateway para los microservicios de productos y ordenes usando NestJS.</p>

# Client Gateway - Products & Orders

## Descripcion

API Gateway HTTP que enruta solicitudes a los microservicios de **productos** y **ordenes** a traves de NATS. Incluye validaciones globales (`ValidationPipe` whitelist + forbidNonWhitelisted) y filtro de excepciones RPC (`RpcCustomExceptionFilter`).

## Arquitectura

- HTTP -> Client Gateway -> NATS -> Products MS / Orders MS
- Transporte: NATS (`@nestjs/microservices`)
- Validaciones y filtrado de excepciones configurados en [src/main.ts](src/main.ts#L4-L18)

## Requisitos

- Node.js + npm
- Broker NATS en ejecucion (puedes levantar uno local con `docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats`)
- Microservicios `products-ms` y `orders-ms` conectados al mismo cluster NATS

## Configuracion

Crea un archivo `.env` basado en `.envTemplate` y define:

```bash
PORT=3000
NATS_SERVERS=nats://localhost:4222
```

- `NATS_SERVERS` acepta lista separada por comas si usas multiples nodos.

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

### Productos

- `POST /products` crea un producto.
- `GET /products` lista productos (`page`, `limit` opcionales).
- `GET /products/:id` obtiene un producto.
- `PATCH /products/:id` actualiza un producto.
- `DELETE /products/:id` elimina un producto.

### Ordenes

- `POST /orders` crea una orden con items `{ productId, quantity, price }[]`.
- `GET /orders` lista ordenes con paginacion (`page`, `limit`) y filtro opcional `status` (`PENDING | DELIVERED | CANCELLED`).
- `GET /orders/id/:id` obtiene una orden por UUID.
- `GET /orders/:status` lista por estado con paginacion.
- `PATCH /orders/:id` cambia el estado de la orden (`status` en el cuerpo).

## Scripts utiles

```bash
npm run build
npm run lint
npm run test
```

## Problemas comunes

- `Config validation error`: revisa que el `.env` tenga `PORT` y `NATS_SERVERS` (separados por coma si son varios).
- Errores RPC: confirma que el broker NATS este arriba y que ambos microservicios esten suscritos a los patrones usados (`createOrder`, `findAllOrders`, `create_product`, etc.).

## Licencia

UNLICENSED (proyecto de aprendizaje).