const addComment = (app, connection) => {

    app.post("/addComment", (req, res) => {
        const { userId, comment, articleId } = req.body;

        //console.log(req.body);

        connection.query("INSERT INTO comments (ID_ARTICLE, ID_USER, CONTENT_COMMENT) VALUES (?, ?, ?)", [articleId, userId, comment], function (err, result) {
            if (err) {
                console.error('Erreur lors de l\'insertion', err);
                res.status(500).json({ message: 'Erreur lors de l\'insertion' });
            } else {
                res.status(200).send(true);
            }
        });
    });

};

module.exports = addComment;