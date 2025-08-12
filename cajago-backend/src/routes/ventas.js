import express from 'express';
import { pool } from '../db.js';
const router = express.Router();

// Obtener todas las ventas
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ventas ORDER BY fecha DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Registrar venta usando SKU y actualizando stock
router.post('/', async (req, res) => {
  try {
    const { sku, cantidad } = req.body;

    // Buscar producto
    const producto = await pool.query('SELECT precio, stock FROM productos WHERE sku = $1', [sku]);
    if (producto.rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });

    const { precio, stock } = producto.rows[0];
    if (cantidad > stock) return res.status(400).json({ error: 'Stock insuficiente' });

    const total = precio * cantidad;

    // Insertar venta
    const venta = await pool.query(
      'INSERT INTO ventas (sku, cantidad, total) VALUES ($1, $2, $3) RETURNING *',
      [sku, cantidad, total]
    );

    // Descontar stock
    await pool.query('UPDATE productos SET stock = stock - $1 WHERE sku = $2', [cantidad, sku]);

    res.json(venta.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
