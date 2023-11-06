const deleteRegister = (app, connection) => {

    // Route pour supprimer un utilisateur par ID
    app.delete('/deleteRegister/:userId/:eventId', (req, res) => {
        const eventId = req.params.eventId;
        const userId = req.params.userId;

        connection.query("SELECT NB_PLACES FROM register WHERE ID_USER = ? AND ID_EVENT = ?", [userId, eventId], (err, result) => {
            if (err) {
                console.error("Erreur lors de la récupération de l'inscription : ", err);
                res.status(500).send("Erreur lors de la récupération");
            } else {
                const nbPlaces = result[0].NB_PLACES;
                console.log(result[0].NB_PLACES);

                const sql = "DELETE FROM register WHERE ID_EVENT = ? AND ID_USER = ?";
                connection.query(sql, [eventId, userId], (err, result) => {
                    if (err) {
                        console.error("Erreur lors de la suppression de l'inscription: ", err);
                        res.status(500).send("Erreur lors de la suppression");
                    } else {
                        connection.query('ALTER TABLE register auto_increment = 0;', (err, result) => {
                            if (err) {
                                console.error("Erreur lors de la suppression de l'inscription : ", err);
                                res.status(500).send("Erreur lors de la requête ALTER TABLE");
                            } else {
                                connection.query('UPDATE events SET PLACES = PLACES + ? WHERE ID_EVENT = ?', [nbPlaces, eventId], (err, result) => {
                                    if (err) {
                                        console.error("Erreur lors de la mise à jour des places : ", err);
                                        res.status(500).send("Erreur lors de la requête update");
                                    } else {
                                        res.status(200).send(true);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });

};

module.exports = deleteRegister;