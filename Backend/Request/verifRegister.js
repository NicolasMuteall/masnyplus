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
                res.status(200).send(true);
            } else {
                res.status(200).send(false);
            }
        });
    });

}

module.exports = verifRegister;