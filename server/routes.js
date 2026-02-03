import express from 'express';
import { connectToDatabase, getConnection } from './db.js';

const router = express.Router();

router.post('/connect', async (req, res) => {
    const config = req.body;
    const result = await connectToDatabase(config);
    if (result.success) {
        res.json(result);
    } else {
        res.status(400).json(result);
    }
});

router.post('/query', async (req, res) => {
    const { sql } = req.body;
    try {
        const conn = getConnection();
        const [rows, fields] = await conn.execute(sql);
        res.json({ rows, fields });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/tables', async (req, res) => {
    try {
        const conn = getConnection();
        const [rows] = await conn.query('SHOW TABLES');
        res.json(rows.map(row => Object.values(row)[0]));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/tables/:tableName', async (req, res) => {
    const { tableName } = req.params;
    try {
        const conn = getConnection();
        // Validate table name to prevent SQL injection (basic check)
        const [tables] = await conn.query('SHOW TABLES');
        const validTables = tables.map(t => Object.values(t)[0]);
        if (!validTables.includes(tableName)) {
            return res.status(404).json({ error: 'Table not found' });
        }

        const [rows, fields] = await conn.query(`SELECT * FROM ${tableName} LIMIT 1000`);
        res.json({ rows, fields });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
