const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const SECRET_KEY = 'abc123';


const app = express();
const port = 3000;

const corsOptions = {
    origin: 'http://localhost:4200',  // Solo permitir solicitudes desde http://localhost:4200
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'dwes',
    password: 'abc123',
    database: 'kucina'
});

connection.connect();

app.get('/api/productos', (req, res) => {
    connection.query('SELECT * FROM PRODUCTO', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al recaudar los productos' });
            return;
        }
        res.json(results);
    });
});



app.get('/api/productosFiltrados/:material', (req, res) => {
    const material = req.params.material;


    const sql = `SELECT * FROM PRODUCTO WHERE material = ?`;
    connection.query(sql, [material], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener productos filtrados por material' });
            return;
        }
        res.json(results);
    });
});

app.get('/api/categoria', (req, res) => {
    connection.query('SELECT * FROM CATEGORIA', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al recaudar la categoria' });
            return;
        }
        res.json(results);
    });
});

app.post('/api/register', (req, res) => {
    const { nomUsuario, contrasenia } = req.body;

    // Encriptar la contraseña
    bcrypt.hash(contrasenia, 10, (err, hash) => {
      if (err) {
        res.status(500).json({ error: 'Error hashing password' });
        return;
      }

      const sql = 'INSERT INTO USUARIO (nomUsuario, contrasenia) VALUES (?, ?)';
      connection.query(sql, [nomUsuario, hash], (error, results) => {
        if (error) {
          res.status(500).json({ error: 'Error registering user' });
          return;
        }

        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  });


app.post('/api/login', (req, res) => {
    const { nomUsuario, contrasenia } = req.body;
    console.log('Request body:', req.body);

    const sql = 'SELECT * FROM USUARIO WHERE nomUsuario = ?';
    connection.query(sql, [nomUsuario], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error fetching user' });
            return;
        }

        console.log('Query results:', results);

        if (results.length === 0) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const user = results[0];

        // Comparar la contraseña proporcionada con la contraseña encriptada en la base de datos
        bcrypt.compare(contrasenia, user.contrasenia, (err, isMatch) => {
            if (err) {
                res.status(500).json({ error: 'Error comparing passwords' });
                return;
            }

            if (!isMatch) {
                res.status(401).json({ error: 'Invalid credentials' });
                return;
            }

            // Si la contraseña coincide, genera un token JWT
            const token = jwt.sign({ idUsuario: user.idUsuario, nomUsuario: user.nomUsuario }, 'abc123', {
                expiresIn: '1h'
            });

            res.json({ token });
        });
    });
});
app.post('/api/finalizar-compra', (req, res) => {
    const { email, products } = req.body;

    console.log('Datos recibidos:', { email, products });

    // Configura el transportador de nodemailer
    const transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: 'tfcalegarrup@hotmail.com',
            pass: 'kucinaTFC123%'
        }
    });

    // Configura el contenido del correo
    const mailOptions = {
        from: 'tfcalegarrup@hotmail.com',
        to: email,
        subject: 'Confirmación de compra',
        text: `Gracias por tu compra. Aquí están los productos que compraste: \n\n${products.map(product => `- ${product.material}: ${product.ancho}x${product.largo} cm por ${product.precio}€`).join('\n')}`
    };

    // Envía el correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
            res.status(500).json({ error: 'Error al enviar el correo' });
        } else {
            console.log('Correo enviado:', info.response);
            res.status(200).json({ message: 'Correo enviado con éxito' });
        }
    });
});



app.listen(port, () => {
    console.log(`Servidor abierto en: http://localhost:${port}`);
});
