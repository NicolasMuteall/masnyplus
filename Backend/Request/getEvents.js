const getEvents = (app, connection) => {

    app.get('/getEvents', (req, res) => {
        // Utilisation d'une requête préparée pour sécuriser la requête
        const sql = "SELECT ID_EVENT, NAME_EVENT, DATE_EVENT, PLACES, CREATED_AT FROM events ORDER BY DATE_EVENT DESC";

        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Erreur lors de la requête :', err);
                return res.status(500).send('Erreur lors de la requête à la base de données.');
            }
            // Traitez les résultats ici et renvoyez-les au client
            res.status(200).json(results);
        });
    });

    app.get('/getEvent/:id', (req, res) => {
        const eventId = req.params.id
        // Utilisation d'une requête préparée pour sécuriser la requête
        const sql = "SELECT ID_EVENT, NAME_EVENT, DATE_EVENT, PLACES, CREATED_AT FROM events WHERE ID_EVENT = ?";

        connection.query(sql, [eventId], (err, results) => {
            if (err) {
                console.error('Erreur lors de la requête :', err);
                return res.status(500).send('Erreur lors de la requête à la base de données.');
            }
            // Traitez les résultats ici et renvoyez-les au client
            //console.log(results);
            res.status(200).json(results);
        });
    });

}

module.exports = getEvents;