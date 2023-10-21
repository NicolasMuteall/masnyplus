const addArticle = (app, connection) => {

    app.post('/addArticle', (req, res) => {
        //console.log(req.body);
        const { title, content, nameImage } = req.body;

        connection.query("INSERT INTO articles (TITLE_ARTICLE, CONTENT_ARTICLE, IMG_ARTICLE) VALUES (?,?,?)",
            [title, content, nameImage],
            (error, result) => {
                if (error) {
                    console.error('Erreur lors de l\'insertion', error);
                    res.status(500).send('Erreur lors de la requête');
                } else {
                    //console.log('Requête réussie');
                    res.status(200).send(true);
                }
            }
        );
    })
}

module.exports = addArticle;