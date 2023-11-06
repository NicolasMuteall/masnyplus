const login = (app, connection, bcrypt) => {

    app.post("/login", (req, res) => {
        const { mail, password } = req.body;
        console.log(mail);
        console.log(password);

        // Requête SQL d'insertion
        const sql = "SELECT ID_USER FROM users WHERE MAIL_USER = ?";

        // Exécutez la requête
        connection.query(sql, [mail], (error, rows) => {
            if (error) {
                console.error("Erreur lors de la recherche", error);
                res.status(500).json({ message: "Erreur lors de la requête" });
            } else {
                console.log("Requête réussie");
                //console.log(rows);
                if (rows.length === 0) {
                    //console.log("Aucun résultat");
                    res.status(200).send(false);
                } else {
                    //console.log("Un resultat a été trouvé");

                    connection.query("SELECT ID_USER, NAME_USER, FIRSTNAME_USER, PASSWORD_USER, ROLE_USER FROM users WHERE ID_USER = ?",
                        [rows[0].ID_USER], async (error, results) => {
                            if (error) {
                                console.error("Erreur lors de l'insertion", error);
                                res.status(500).json({ message: "Erreur lors de la requête" });
                            } else {
                                //console.log(results[0].PASSWORD_USER);

                                try {
                                    // Attendre que la comparaison du mot de passe soit résolue
                                    const passwordMatch = await bcrypt.compare(password, results[0].PASSWORD_USER);
                                    //console.log(passwordMatch);

                                    // Vérifiez si l'ancien mot de passe correspond
                                    if (!passwordMatch) {
                                        //console.log('MDP INCORRECT');
                                        res.status(200).send(false);
                                    } else {
                                        //console.log('MDP CORRECT');
                                        res.status(200).json(results[0]);
                                        // Le mot de passe correspond, vous pouvez continuer ici pour mettre à jour le mot de passe
                                    }
                                } catch (error) {
                                    console.error("Erreur lors de la comparaison des mots de passe:", error);
                                    return res.status(500).json({ message: "Erreur lors de la comparaison des mots de passe" });
                                }
                            }
                        });
                }
            }
        });
    });
};

module.exports = login;