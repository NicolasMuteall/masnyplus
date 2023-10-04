const signUp = (app, connection) => {

    // CREER UN COMPTE POUR ADMIN
    app.post('/signUp', (req, res) => {
        console.log(req.body);
        const mail = req.body.mail;
        const name = req.body.name;
        const firstname = req.body.firstname;
        const city = req.body.city
        const password = req.body.password;

        connection.query(
            "SELECT ID_USER FROM users WHERE MAIL_USER = ?",
            [mail],
            (error, result) => {
                if (error) {
                    console.error('Erreur lors de l\'insertion', error);
                    res.status(500).send('Erreur lors de la requête');
                } else {
                    console.log(result);
                    if (result.length > 0) {
                        res.status(200).send(true);
                    } else {
                        connection.query(
                            "INSERT INTO users (MAIL_USER, NAME_USER, FIRSTNAME_USER, CITY_USER, PASSWORD_USER, ROLE_USER) VALUES (?,?,?,?,?,?)",
                            [mail, name, firstname, city, password, 'user'],
                            (error, result) => {
                                if (error) {
                                    console.error('Erreur lors de l\'insertion', error);
                                    res.status(500).send('Erreur lors de la requête');
                                } else {
                                    console.log('Requête réussie');
                                    res.status(200).send('insertion réussie.');
                                }
                            }
                        );
                    }
                }
            }
        );

    });

}

module.exports = signUp;