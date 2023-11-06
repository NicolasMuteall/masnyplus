const express = require("express");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs-react");
const transporter = require("./transporter");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require('path');
const multer = require('multer');

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/images', express.static(path.join(__dirname, 'assets')));

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

//REQUEST
const signUp = require("./Request/signUp");
const login = require("./Request/login");
const createToken = require("./Request/createToken");
const users = require("./Request/users");
const deleteUser = require("./Request/deleteUser");
const verifyToken = require("./Request/verifyToken");
const createEvent = require("./Request/createEvent");
const getEvents = require("./Request/getEvents");
const updateEvent = require("./Request/updateEvent");
const deleteEvent = require("./Request/deleteEvent");
const addRegisterEvent = require("./Request/addRegisterEvent");
const verifRegister = require("./Request/VerifRegister");
const getRegistered = require("./Request/getRegistered");
const uploadImg = require("./Request/uploadImgArticle");
const addArticle = require("./Request/addArticle");
const getArticles = require("./Request/getArticles");
const updateArticle = require("./Request/updateArticle");
const updateImg = require("./Request/updateImgArticle");
const deleteArticle = require("./Request/deleteArticle");
const addComment = require("./Request/addComment");
const deleteComment = require("./Request/deleteComment");
const addLike = require("./Request/addLike");
const updateUser = require("./Request/updateUser");
const verifyPassword = require("./Request/verifyPassword");
const updatePassword = require("./Request/updatePassword");
const sendMail = require("./Request/sendMail");
const deleteRegister = require("./Request/deleteRegister");

signUp(app, connection);
login(app, connection, bcrypt);
createToken(app, jwt);
users(app, connection);
deleteUser(app, connection);
verifyToken(app, jwt);
createEvent(app, connection);
getEvents(app, connection);
updateEvent(app, connection);
deleteEvent(app, connection);
addRegisterEvent(app, connection);
verifRegister(app, connection);
getRegistered(app, connection);
uploadImg(app, multer, path, connection);
addArticle(app, connection);
getArticles(app, connection);
updateArticle(app, connection);
updateImg(app, multer, path);
deleteArticle(app, connection);
addComment(app, connection);
deleteComment(app, connection);
addLike(app, connection);
updateUser(app, connection);
verifyPassword(app, connection, bcrypt);
updatePassword(app, connection);
sendMail(app, connection, jwt, transporter);
deleteRegister(app, connection);