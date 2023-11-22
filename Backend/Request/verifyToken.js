const verifyToken = (app, jwt) => {

    function verifyToken(req, res, next) {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(200).send(false);
        }
        jwt.verify(token, 'secretKey', (err, decoded) => {
            if (err) {
                return res.status(200).send(false);
            }
            req.userId = decoded.userId;
            next();
        });
    }

    app.get('/verify-token', verifyToken, (req, res) => {
        res.json({ userId: req.userId, message: 'Token valide' });
    });

}

module.exports = verifyToken;