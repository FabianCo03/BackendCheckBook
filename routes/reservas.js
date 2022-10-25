const { Router, query } = require('express');
const express = require('express');
const routes = express.Router();

// GET - - - - - - - - - - - - - - - - - - - - - - - - -
routes.get('/reservas', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.status(500);
            return res.send(err);
        }
        conn.query('SELECT * FROM reservas', (err, rows) => {
            if (err) {
                res.status(500);
                return res.send(err);
            }
            res.json(rows);
        });
    });
});

// POST - - - - - - - - - - - - - - - - - - - - - - - - -
routes.post('/reserva', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.status(500);
            return res.send(err);
        }
        conn.query('INSERT INTO reservas SET ?', [req.body], (err, rows) => {
            if (err) {
                res.status(500);
                return res.send(err);
            }
            res.json(rows);
        });
    });
});

//UPDATE - - - - - - - - - - - - - - - - - - - - - - - - -
routes.put('/reserva/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.status(500);
            return res.send(err);
        }
        conn.query('UPDATE reservas SET ? WHERE id = ?', [req.body, req.params.id], (err, rows) => {
            if (err) {
                res.status(500);
                return res.send(err);
            }
            res.json(rows);
        });
    });
});

// DELETE - - - - - - - - - - - - - - - - - - - - - - - - -
routes.delete('/reserva/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.status(500);
            return res.send(err);
        }
        conn.query('DELETE FROM reservas WHERE id = ?', [req.params.id], (err, rows) => {
            if (err) {
                res.status(500);
                return res.send(err);
            }
            res.json(rows);
        });
    });
});

// BUSCAR DISPONIBILIDAD - - - - - - - - - - - - - - - - - - - - - - - - -
routes.post('/reservas', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.status(500);
            return res.send(err);
        }
        const hora_inicial = req.body.hora;
        let fecha_temporal = new Date(`2000-01-01T${hora_inicial}`);
        fecha_temporal = fecha_temporal.setHours(fecha_temporal.getHours() + 1);
        fecha_temporal = new Date(fecha_temporal);
        const hora_final = `${new Date(fecha_temporal).getHours()}:${new Date(fecha_temporal).getMinutes()}:${new Date(fecha_temporal).getSeconds()}`;
        const sql = `SELECT reservas.* , clientes.* , mesas.* FROM reservas
        INNER JOIN clientes ON reservas.id_clientes = clientes.cedula
        INNER JOIN mesas ON reservas.id_mesas = mesas.id
        WHERE fecha = ? AND hora BETWEEN ? AND ?`

        conn.query(sql, [req.body.fecha, hora_inicial, hora_final], (err, rows) => {
            if (err) {
                res.status(500);
                return res.send(err);
            }
            res.json(rows);
        });
    });
});



module.exports = routes;