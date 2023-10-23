const updateImg = (app, multer, path) => {
    app.post('/updateImg/:id', (req, res) => {
        const idArticle = req.params.id

        const storage = multer.diskStorage({
            destination: `assets/articles/${idArticle}`,
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            },
        });

        const upload = multer({ storage });

        upload.single('image')(req, res, (uploadErr) => {
            if (uploadErr) {
                console.error('Erreur lors du téléchargement du fichier :', uploadErr);
                res.status(500).send('Erreur lors du téléchargement du fichier');
            } else {
                res.status(200).send(true);
            }
        });
    })
};

module.exports = updateImg;