const login = (app, connection, bcrypt) => {

    app.post("/login", (req, res) => {
        const { mail, password } = req.body;
        console.log(mail);
        console.log(password);

        const sql = "SELECT ID_USER FROM users WHERE MAIL_USER = ?";

        connection.query(sql, [mail], (error, rows) => {
            if (error) {
                console.error("Erreur lors de la recherche", error);
                res.status(500).json({ message: "Erreur lors de la requête" });
            } else {
                console.log("Requête réussie");
                if (rows.length === 0) {
                    res.status(200).send(false);
                } else {
                    connection.query("SELECT ID_USER, NAME_USER, FIRSTNAME_USER, PASSWORD_USER, ROLE_USER FROM users WHERE ID_USER = ?",
                        [rows[0].ID_USER], async (error, results) => {
                            if (error) {
                                console.error("Erreur lors de l'insertion", error);
                                res.status(500).json({ message: "Erreur lors de la requête" });
                            } else {
                                try {
                                    const passwordMatch = await bcrypt.compare(password, results[0].PASSWORD_USER);
                                    if (!passwordMatch) {
                                        res.status(200).send(false);
                                    } else {
                                        res.status(200).json(results[0]);
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