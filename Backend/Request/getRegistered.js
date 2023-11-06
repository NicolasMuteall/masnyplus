const getRegistered = (app, connection) => {

    app.get('/getRegistered/:id', (req, res) => {
        const eventId = req.params.id;

        const sql = "SELECT r.ID_REGISTER, r.ID_USER, r.NAMES_REGISTER, r.PAYED, r.NB_PLACES, r.CREATED_AT, u.NAME_USER, u.FIRSTNAME_USER FROM register AS r JOIN users AS u ON r.ID_USER = u.ID_USER WHERE r.ID_EVENT = ?";

        connection.query(sql, [eventId], (err, results) => {
            if (err) {
                console.error('Erreur lors de la requête :', err);
                return res.status(500).send('Erreur lors de la requête à la base de données.');
            }
            //console.log(results);
            res.status(200).json(results);
        });
    });

    app.get('/getRegistered-user/:id', (req, res) => {
        const registerId = req.params.id;

        const sql = "SELECT ID_REGISTER, ID_USER, NAMES_REGISTER, NB_PLACES FROM register WHERE ID_REGISTER = ?";

        connection.query(sql, [registerId], (err, results) => {
            if (err) {
                console.error('Erreur lors de la requête :', err);
                return res.status(500).send('Erreur lors de la requête à la base de données.');
            }
            //console.log(results);
            res.status(200).json(results);
        });
    });

}

module.exports = getRegistered;