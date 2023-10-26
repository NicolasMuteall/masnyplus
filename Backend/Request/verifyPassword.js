const verifyPassword = (app, connection, bcrypt) => {

    app.post('/verifyPassword', (req, res) => {
        const { userId, password } = req.body;
        //console.log(req.body);

        connection.query("SELECT PASSWORD_USER FROM users WHERE ID_USER = ?", [userId], async (error, results) => {
            if (error) {
                console.error("Erreur lors de l'insertion", error);
                res.status(500).json({ message: "Erreur lors de la requête" });
            } else {
                //console.log(results[0].PASSWORD_USER);
                try {
                    const passwordMatch = await bcrypt.compare(password, results[0].PASSWORD_USER);
                    //console.log(passwordMatch);

                    if (!passwordMatch) {
                        //console.log('MDP INCORRECT');
                        res.status(200).send(false);
                    } else {
                        //console.log('MDP CORRECT');
                        res.status(200).send(true);
                        // Le mot de passe correspond, vous pouvez continuer ici pour mettre à jour le mot de passe
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