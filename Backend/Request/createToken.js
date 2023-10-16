const createToken = (app, jwt) => {

    app.put('/createToken/:id', (req, res) => {

        const id = req.params.id;

        const token = jwt.sign({ userID: id }, 'secretKey', { expiresIn: '7d' });

        res.status(200).json({ token });
    })
};

module.exports = createToken;