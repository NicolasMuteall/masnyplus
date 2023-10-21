const uploadImg = (app, multer, path, connection) => {
    app.post('/upload', (req, res) => {
        const sql = "SELECT ID_ARTICLE FROM articles ORDER BY ID_ARTICLE DESC LIMIT 1";
        let idArticle

        connection.query(sql, (err, result) => {
            if (err) {
                console.error('Erreur lors de la requête :', err);
                res.status(500).send('Erreur lors de la requête');
            } else {
                if (result.length > 0) {
                    idArticle = result[0].ID_ARTICLE + 1;
                } else {
                    idArticle = 1
                }

                const storage = multer.diskStorage({
                    destination: `assets/articles/${idArticle}`,
                    filename: (req, file, cb) => {
                        cb(null, file.originalname);
                    },
                });

                const upload = multer({ storage });

                // Ensuite, configurez le middleware de téléchargement pour le chargement du fichier
                upload.single('image')(req, res, (uploadErr) => {
                    if (uploadErr) {
                        console.error('Erreur lors du téléchargement du fichier :', uploadErr);
                        res.status(500).send('Erreur lors du téléchargement du fichier');
                    } else {
                        // Traitez le fichier ici et renvoyez une réponse appropriée
                        res.status(200).send(true);
                    }
                });
            }
        });
    });
};

module.exports = uploadImg;