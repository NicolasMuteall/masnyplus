const getArticles = (app, connection) => {

    app.get('/getArticles', (req, res) => {

        const sql = "SELECT ID_ARTICLE, TITLE_ARTICLE, CONTENT_ARTICLE, IMG_ARTICLE, CREATED_AT FROM articles ORDER BY CREATED_AT DESC";

        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Erreur lors de la requête :', err);
                return res.status(500).send('Erreur lors de la requête à la base de données.');
            }
            res.status(200).json(results);
        });
    });

    app.get('/getArticle/:id', (req, res) => {
        const idArticle = req.params.id;
        const sql = "SELECT ID_ARTICLE, TITLE_ARTICLE, CONTENT_ARTICLE, IMG_ARTICLE, CREATED_AT FROM articles WHERE ID_ARTICLE = ?";

        connection.query(sql, [idArticle], (err, results) => {
            if (err) {
                console.error('Erreur lors de la requête :', err);
                return res.status(500).send('Erreur lors de la requête à la base de données.');
            }
            res.status(200).json(results);
        });
    });

}

module.exports = getArticles;