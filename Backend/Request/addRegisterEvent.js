const addRegisterEvent = (app, connection) => {

    app.post('/addRegisterEvent', (req, res) => {
        console.log(req.body);
        const { userId, eventId, nbPlaces } = req.body;
        const fullNames = req.body.data.map(person => `${person.name} ${person.firstname}`).join(', ');

        console.log(fullNames);

        connection.query("INSERT INTO register (ID_USER, ID_EVENT, NB_PLACES, NAMES_REGISTER) VALUES (?,?,?,?)",
            [userId, eventId, nbPlaces, fullNames],
            (error, result) => {
                if (error) {
                    console.error('Erreur lors de l\'insertion', error);
                    res.status(500).send('Erreur lors de la requête');
                } else {

                    connection.query("UPDATE events SET PLACES = PLACES - ? WHERE ID_EVENT = ?",
                        [nbPlaces, eventId],
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
                }
            }
        );
    })
}

module.exports = addRegisterEvent;