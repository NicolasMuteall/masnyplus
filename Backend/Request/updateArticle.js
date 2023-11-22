const updateArticle = (app, connection) => {
    app.put('/updateArticle/:id', (req, res) => {
        const idArticle = req.params.id;
        const { title, content, nameImage } = req.body;
        let query

        if (nameImage) {
            query = "UPDATE articles SET TITLE_ARTICLE = ?, CONTENT_ARTICLE = ?, IMG_ARTICLE = ? WHERE ID_ARTICLE = ?";
            connection.query(query, [title, content, nameImage, idArticle], (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: "Erreur lors de la mise à jour de l'article" });
                } else {
                    res.status(200).send(true);
                }
            }
            );
        } else {
            query = "UPDATE articles SET TITLE_ARTICLE = ?, CONTENT_ARTICLE = ? WHERE ID_ARTICLE = ?";
            connection.query(query, [title, content, idArticle], (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: "Erreur lors de la mise à jour de l'article" });
                } else {
                    res.status(200).send(true);
                }
            }
            );
        }

    });
};

module.exports = updateArticle;