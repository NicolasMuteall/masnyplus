const updateUser = (app, connection) => {

    app.put('/updateUserConnected/:id', (req, res) => {
        const userId = req.params.id;
        //console.log(req.body);
        const { name, firstname, mail, city } = req.body;

        connection.query("SELECT ID_USER FROM users WHERE MAIL_USER = ? and ID_USER != ?", [mail, userId], (error, result) => {
            if (error) {
                console.error('Erreur lors de l\'insertion', error);
                res.status(500).send('Erreur lors de la requête');
            } else {
                //console.log(result);
                if (result.length > 0) {
                    res.status(200).send(false);
                } else {
                    const query = "UPDATE users SET NAME_USER = ?, FIRSTNAME_USER = ?, MAIL_USER = ?, CITY_USER = ? WHERE ID_USER = ?";
                    connection.query(query, [name, firstname, mail, city, userId], (err, result) => {
                        if (err) {
                            console.error(err);
                            res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur", });
                        } else {
                            res.status(200).send(true);
                        }
                    });
                }
            }
        });
    });
};

module.exports = updateUser;