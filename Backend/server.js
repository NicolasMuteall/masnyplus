const express = require("express");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require("cors");
// const bcrypt = require("bcryptjs-react");
// const transporter = require("./transporter");
// const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

dotenv.config();

app.listen(PORT, () => {
    console.log(`Le port de mon backend est le : ${PORT}`);
});

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
});

connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion : ' + err.stack)
        return;
    }
    console.log('Connexion à la base de données réussie.');
})