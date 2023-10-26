const verifyToken = (app, jwt) => {

    function verifyToken(req, res, next) {
        // Récupérer le token de l'en-tête Authorization
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        if (!token) {
            // Le token n'est pas fourni
            return res.status(200).send(false);
        }

        // Vérifier le token
        jwt.verify(token, 'secretKey', (err, decoded) => {
            if (err) {
                // Le token est invalide ou expiré
                return res.status(200).send(false);
            }

            // Le token est valide
            // Ajouter les informations du token décodé à la requête pour une utilisation ultérieure si nécessaire
            req.userId = decoded.userId;

            // Passer au middleware suivant ou à la gestion de la route
            next();
        });
    }

    app.get('/verify-token', verifyToken, (req, res) => {
        // Le token est valide
        res.json({ userId: req.userId, message: 'Token valide' });
    });

}

module.exports = verifyToken;