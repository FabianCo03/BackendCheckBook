const { Router, query } = require('express');
const express = require('express');
const routes = express.Router();

// GET - - - - - - - - - - - - - - - - - - - - - - - - -
routes.get('/mesas', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.status(500);
            return res.send(err);
        }
        conn.query('SELECT * FROM mesas', (err, rows) => {
            if (err) {
                res.status(500);
                return res.send(err);
            }
            res.json(rows);
        });
    });
});

// POST - - - - - - - - - - - - - - - - - - - - - - - - -
routes.post('/mesa', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.status(500);
            return res.send(err);
        }
        conn.query('INSERT INTO mesas SET ?', [req.body], (err, rows) => {
            if (err) {
                res.status(500);
                return res.send(err);
            }
            res.json(rows);
        });
    });
});

// DELETE - - - - - - - - - - - - - - - - - - - - - - - - -
routes.delete('/mesa/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.status(500);
            return res.send(err);
        }
        conn.query('DELETE FROM mesas WHERE id = ?', [req.params.id], (err, rows) => {
            if (err) {
                res.status(500);
                return res.send(err);
            }
            res.json(rows);
        });
    });
});

//UPDATE - - - - - - - - - - - - - - - - - - - - - - - - -
routes.put('/mesa/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.status(500);
            return res.send(err);
        }
        conn.query('UPDATE mesas SET ? WHERE id = ?', [req.body, req.params.id], (err, rows) => {
            if (err) {
                res.status(500);
                return res.send(err);
            }
            res.json(rows);
        });
    });
});



module.exports = routes;