const addLike = (app, connection) => {

    app.post("/addLike", (req, res) => {
        const { userId, articleId } = req.body;

        connection.query("SELECT ID_LIKE FROM likes WHERE ID_USER = ? AND ID_ARTICLE = ?", [userId, articleId], function (err, result) {
            if (err) throw err;

            if (result.length === 0) {
                connection.query("INSERT INTO likes (ID_USER, ID_ARTICLE) VALUES (?, ?)", [userId, articleId], function (err, result) {
                    if (err) {
                        console.error('Erreur lors du like', err);
                        res.status(500).json({ message: 'Erreur lors du like' });
                    } else {
                        res.status(200).send('Like Ajouté');
                    }
                });
            } else {
                connection.query("DELETE FROM likes WHERE ID_USER = ? AND ID_ARTICLE = ?", [userId, articleId], function (err, result) {
                    if (err) {
                        console.error('Erreur lors de la suppression', err);
                        res.status(500).json({ message: 'Erreur lors de la suppression du like' });
                    } else {
                        res.status(200).send('like supprimé');
                    }
                });

            }

        });
    });
};

module.exports = addLike