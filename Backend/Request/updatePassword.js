const updatePassword = (app, connection) => {

    app.put('/updatePassword', (req, res) => {
        const { userId, password } = req.body;
        //console.log(req.body);

        const query = "UPDATE users SET PASSWORD_USER = ? WHERE ID_USER = ?";
        connection.query(query, [password, userId], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
            } else {
                res.status(200).send(true);
            }
        });
    });
};

module.exports = updatePassword;