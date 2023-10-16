const updateEvent = (app, connection) => {
    app.put('/updateEvent/:id', (req, res) => {
        const eventId = req.params.id;
        //console.log(req.body);
        const { NAME_EVENT, DATE_EVENT, PLACES } = req.body;
        const query = "UPDATE events SET NAME_EVENT = ?, DATE_EVENT = ?, PLACES = ? WHERE ID_EVENT = ?";
        connection.query(query, [NAME_EVENT, DATE_EVENT, PLACES, eventId], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur", });
            } else {
                res.status(200).send(true);
            }
        }
        );
    });
};

module.exports = updateEvent;