const getEvents = (app, connection) => {

    app.get('/getEvents', (req, res) => {

        const sql = "SELECT ID_EVENT, NAME_EVENT, DATE_EVENT, PLACES, CREATED_AT FROM events WHERE DATE_EVENT > NOW() ORDER BY DATE_EVENT DESC";

        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Erreur lors de la requête :', err);
                return res.status(500).send('Erreur lors de la requête à la base de données.');
            }
            console.log(results);
            res.status(200).json(results);
        });
    });

    app.get('/getEventsAdmin', (req, res) => {

        const sql = "SELECT ID_EVENT, NAME_EVENT, DATE_EVENT, PLACES, CREATED_AT FROM events ORDER BY DATE_EVENT DESC";

        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Erreur lors de la requête :', err);
                return res.status(500).send('Erreur lors de la requête à la base de données.');
            }
            console.log(results);
            res.status(200).json(results);
        });
    });

    app.get('/getEvent/:id', (req, res) => {
        const eventId = req.params.id

        const sql = "SELECT ID_EVENT, NAME_EVENT, DATE_EVENT, PLACES, CREATED_AT FROM events WHERE ID_EVENT = ?";

        connection.query(sql, [eventId], (err, results) => {
            if (err) {
                console.error('Erreur lors de la requête :', err);
                return res.status(500).send('Erreur lors de la requête à la base de données.');
            }
            //console.log(results);
            res.status(200).json(results);
        });
    });

}

module.exports = getEvents;