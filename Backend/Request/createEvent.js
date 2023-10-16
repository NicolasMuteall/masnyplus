const createEvent = (app, connection) => {

    // CREER UN COMPTE POUR ADMIN
    app.post('/createEvent', (req, res) => {
        //console.log(req.body);
        const { nameEvent, dateEvent, places } = req.body;

        connection.query("INSERT INTO events (NAME_EVENT, DATE_EVENT, PLACES) VALUES (?,?,?)",
            [nameEvent, dateEvent, places],
            (error, result) => {
                if (error) {
                    console.error('Erreur lors de l\'insertion', error);
                    res.status(500).send('Erreur lors de la requête');
                } else {
                    console.log('Requête réussie');
                    res.status(200).send(true);
                }
            }
        );
    })
}

module.exports = createEvent;