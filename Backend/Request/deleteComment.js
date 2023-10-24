const deleteComment = (app, connection) => {

    app.delete('/deleteComment/:id', (req, res) => {
        const commentId = req.params.id;
        const sql = "DELETE FROM comments WHERE ID_COMMENT = ?";
        connection.query(sql, [commentId], (err, result) => {
            if (err) {
                console.error("Erreur lors de la suppression du commentaire: ", err);
                res.status(500).send("Erreur lors de la suppression");
            } else {
                connection.query('ALTER TABLE comments auto_increment = 0;', (err, result) => {
                    if (err) {
                        console.error("Erreur lors de la suppression du commentaire : ", err);
                        res.status(500).send("Erreur lors de la requête ALTER TABLE");
                    } else {
                        res.status(200).send(true);
                    }
                });
            }
        });
    });

};

module.exports = deleteComment;