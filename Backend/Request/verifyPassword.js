const verifyPassword = (app, connection, bcrypt) => {

    app.post('/verifyPassword', (req, res) => {
        const { userId, password } = req.body;

        connection.query("SELECT PASSWORD_USER FROM users WHERE ID_USER = ?", [userId], async (error, results) => {
            if (error) {
                console.error("Erreur lors de l'insertion", error);
                res.status(500).json({ message: "Erreur lors de la requête" });
            } else {
                try {
                    const passwordMatch = await bcrypt.compare(password, results[0].PASSWORD_USER);
                    if (!passwordMatch) {
                        res.status(200).send(false);
                    } else {
                        res.status(200).send(true);
                    }
                } catch (error) {
                    console.error("Erreur lors de la comparaison des mots de passe:", error);
                    return res.status(500).json({ message: "Erreur lors de la comparaison des mots de passe" });
                }
            }
        });
    })
}

module.exports = verifyPassword;