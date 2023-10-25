const users = (app, connection) => {

    app.get('/users', (req, res) => {
        // Utilisation d'une requête préparée pour sécuriser la requête
        const sql = "SELECT ID_USER, MAIL_USER, NAME_USER, FIRSTNAME_USER, CITY_USER, CREATED_AT FROM users WHERE ROLE_USER != 'admin'";

        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Erreur lors de la requête :', err);
                return res.status(500).send('Erreur lors de la requête à la base de données.');
            }
            // Traitez les résultats ici et renvoyez-les au client
            res.status(200).json(results);
        });
    });

    app.get('/user/:id', (req, res) => {
        const userId = req.params.id;
        const sql = "SELECT ID_USER, MAIL_USER, NAME_USER, FIRSTNAME_USER, CITY_USER, CREATED_AT FROM users WHERE ID_USER = ?";

        connection.query(sql, [userId], (err, results) => {
            if (err) {
                console.error('Erreur lors de la requête :', err);
                return res.status(500).send('Erreur lors de la requête à la base de données.');
            }
            // Traitez les résultats ici et renvoyez-les au client
            res.status(200).json(results);
        });
    });

}

module.exports = users;