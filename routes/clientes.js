const express = require('express');
const routes = express.Router();

// GET - - - - - - - - - - - - - - - - - - - - - - - - -
routes.get('/clientes', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.status(500);
            return res.send(err);
        }
        conn.query('SELECT * FROM clientes', (err, rows) => {
            if (err) {
                res.status(500);
                return res.send(err);
            }
            res.json(rows);
        });
    });
});

// POST - - - - - - - - - - - - - - - - - - - - - - - - -
routes.post('/cliente', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.status(500);
            return res.send(err);
        }
        conn.query('INSERT INTO clientes SET ?', [req.body], (err, rows) => {
            if (err) {
                res.status(500);
                return res.send(err);
            }
            res.json(rows);
        });
    });
});

// DELETE - - - - - - - - - - - - - - - - - - - - - - - - -
routes.delete('/cliente/:cedula', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.status(500);
            return res.send(err);
        }

        conn.query('DELETE FROM clientes WHERE cedula = ?', [req.params.cedula], (err, rows) => {
            if (err) {
                res.status(500);
                return res.send(err);
            }
            res.json(rows);
        });
    });
});

//UPDATE - - - - - - - - - - - - - - - - - - - - - - - - -
routes.put('/cliente/:cedula', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.status(500);
            return res.send(err);
        }
        conn.query('UPDATE clientes SET ? WHERE cedula = ?', [req.body, req.params.cedula], (err, rows) => {
            if (err) {
                res.status(500);
                return res.send(err);
            }
            res.json(rows);
        });
    });
});

module.exports = routes;