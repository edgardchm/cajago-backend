import express from 'express';
import { pool } from '../db.js';
const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos ORDER BY nombre');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agregar producto con SKU y stock
router.post('/', async (req, res) => {
  try {
    const { sku, nombre, precio, stock } = req.body;
    const result = await pool.query(
      'INSERT INTO productos (sku, nombre, precio, stock) VALUES ($1, $2, $3, $4) RETURNING *',
      [sku, nombre, precio, stock]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
