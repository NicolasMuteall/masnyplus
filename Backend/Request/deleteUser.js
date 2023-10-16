const deleteUser = (app, connection) => {

    // Route pour supprimer un utilisateur par ID
    app.delete("/deleteUser/:userId", (req, res) => {
        const userId = req.params.userId;
        const sql = "DELETE FROM users WHERE ID_USER = ?";
        connection.query(sql, [userId], (err, result) => {
            if (err) {
                console.error("Erreur lors de la suppression de l'utilisateur : ", err);
                res.status(500).send("Erreur lors de la suppression");
            } else {
                connection.query('ALTER TABLE users auto_increment = 0;', (err, result) => {
                    if (err) {
                        console.error("Erreur lors de la suppression de l'utilisateur : ", err);
                        res.status(500).send("Erreur lors de la requête ALTER TABLE");
                    } else {
                        res.status(200).send(true);
                    }
                });
            }
        });
    });

};

module.exports = deleteUser;