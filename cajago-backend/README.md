# CajaGo Backend

Backend para el sistema de caja CajaGo con API REST para gestión de productos y ventas.

## Características

- ✅ Gestión de productos (CRUD completo)
- ✅ Sistema de ventas con items
- ✅ Base de datos SQLite
- ✅ API REST con Express
- ✅ CORS habilitado
- ✅ Manejo de errores
- ✅ Reportes de ventas

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp env.example .env
# Editar .env con tus configuraciones
```

3. Ejecutar el servidor:
```bash
# Desarrollo (con nodemon)
npm run dev

# Producción
npm start
```

## Endpoints

### Productos

- `GET /api/productos` - Listar todos los productos
- `GET /api/productos/:id` - Obtener producto por ID
- `POST /api/productos` - Crear nuevo producto
- `PUT /api/productos/:id` - Actualizar producto
- `DELETE /api/productos/:id` - Eliminar producto

### Ventas

- `GET /api/ventas` - Listar todas las ventas
- `GET /api/ventas/:id` - Obtener venta por ID
- `POST /api/ventas` - Crear nueva venta
- `GET /api/ventas/reporte/fechas` - Reporte de ventas por fecha

## Estructura de la Base de Datos

- **productos**: id, nombre, precio, stock, categoria, created_at
- **ventas**: id, total, fecha, metodo_pago
- **items_venta**: id, venta_id, producto_id, cantidad, precio_unitario, subtotal

## Ejemplo de Uso

### Crear un producto
```bash
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Coca Cola","precio":2.50,"stock":100,"categoria":"Bebidas"}'
```

### Crear una venta
```bash
curl -X POST http://localhost:3000/api/ventas \
  -H "Content-Type: application/json" \
  -d '{"items":[{"producto_id":1,"cantidad":2,"precio_unitario":2.50}],"metodo_pago":"efectivo"}'
```

## Variables de Entorno

- `PORT`: Puerto del servidor (default: 3000)
- `DB_PATH`: Ruta de la base de datos SQLite (default: ./database.sqlite)
- `NODE_ENV`: Entorno de ejecución (default: development)
