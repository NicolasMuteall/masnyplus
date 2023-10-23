const deleteArticle = (app, connection) => {

    app.delete('/deleteArticle/:id', (req, res) => {
        const idArticle = req.params.id;
        const sql = "DELETE FROM articles WHERE ID_ARTICLE = ?";
        connection.query(sql, [idArticle], (err, result) => {
            if (err) {
                console.error("Erreur lors de la suppression de l'article: ", err);
                res.status(500).send("Erreur lors de la suppression");
            } else {
                connection.query('ALTER TABLE articles auto_increment = 0;', (err, result) => {
                    if (err) {
                        console.error("Erreur lors de la suppression de l'article : ", err);
                        res.status(500).send("Erreur lors de la requête ALTER TABLE");
                    } else {
                        res.status(200).send(true);
                    }
                });
            }
        });
    });

};

module.exports = deleteArticle;