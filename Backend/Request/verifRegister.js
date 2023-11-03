const verifRegister = (app, connection) => {

    app.get('/verifRegister/:userId/:eventId', (req, res) => {
        const { userId, eventId } = req.params

        const sql = "SELECT ID_REGISTER FROM register WHERE ID_USER = ? AND ID_EVENT = ?";

        connection.query(sql, [userId, eventId], (err, results) => {
            if (err) {
                console.error('Erreur lors de la requête :', err);
                return res.status(500).send('Erreur lors de la requête à la base de données.');
            }
            if (results.length > 0) {
                res.status(200).send(results);
            } else {
                res.status(200).send(false);
            }
        });
    });

    app.get('/verifRegister-user/:userId', (req, res) => {
        const { userId } = req.params

        const sql = "SELECT ID_REGISTER, ID_EVENT FROM register WHERE ID_USER = ?";

        connection.query(sql, [userId], (err, results) => {
            if (err) {
                console.error('Erreur lors de la requête :', err);
                return res.status(500).send('Erreur lors de la requête à la base de données.');
            }
            res.status(200).json(results);
        });
    });

}

module.exports = verifRegister;