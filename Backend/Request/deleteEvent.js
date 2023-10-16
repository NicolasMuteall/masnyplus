const deleteEvent = (app, connection) => {

    // Route pour supprimer un utilisateur par ID
    app.delete('/deleteEvent/:eventId', (req, res) => {
        const eventId = req.params.eventId;
        const sql = "DELETE FROM events WHERE ID_EVENT = ?";
        connection.query(sql, [eventId], (err, result) => {
            if (err) {
                console.error("Erreur lors de la suppression de l'évènement: ", err);
                res.status(500).send("Erreur lors de la suppression");
            } else {
                connection.query('ALTER TABLE events auto_increment = 0;', (err, result) => {
                    if (err) {
                        console.error("Erreur lors de la suppression de l'évènement : ", err);
                        res.status(500).send("Erreur lors de la requête ALTER TABLE");
                    } else {
                        res.status(200).send(true);
                    }
                });
            }
        });
    });

};

module.exports = deleteEvent;