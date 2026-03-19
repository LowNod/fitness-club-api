const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'fitness_club'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Підключено до бази даних fitness_club!');
});

app.get('/clients', (req, res) => {
    db.query('SELECT * FROM clients', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/clients', (req, res) => {
    const { first_name, last_name, phone, email, subscription_id } = req.body;
    const sql = 'INSERT INTO clients (first_name, last_name, phone, email, subscription_id) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [first_name, last_name, phone, email, subscription_id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Клієнта успішно додано', id: results.insertId });
    });
});

app.put('/clients/:id', (req, res) => {
    const { first_name, last_name, phone, email } = req.body;
    const clientId = req.params.id;
    const sql = 'UPDATE clients SET first_name=?, last_name=?, phone=?, email=? WHERE client_id=?';
    db.query(sql, [first_name, last_name, phone, email, clientId], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Дані клієнта оновлено' });
    });
});

app.delete('/clients/:id', (req, res) => {
    const clientId = req.params.id;
    db.query('DELETE FROM clients WHERE client_id=?', [clientId], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Клієнта видалено' });
    });
});

app.listen(3000, () => {
    console.log('Сервер запущено на порту 3000. Перевір http://localhost:3000/clients');
});