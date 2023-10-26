const sendMail = (app, connection, jwt, transporter) => {
    app.post("/sendMail", (req, res) => {
        const mail = req.body.mail;

        const query = "SELECT `ID_USER` FROM `users` WHERE MAIL_USER = ?";

        connection.query(query, [mail], (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: "Erreur lors de la récupération du profil" });
            } else {
                //console.log(result);
                if (result.length === 0) {
                    res.status(200).send(false);
                } else {
                    const userId = result[0].ID_USER;
                    const token = jwt.sign({ userId: userId }, 'secretKey', { expiresIn: '1h' });

                    const mailOptions = {
                        from: "nicolas.dupont59176@gmail.com",
                        to: mail,
                        subject: "Réinitialisation de votre mot de passe",
                        text: `Bonjour, suivez le lien suivant pour réinitialiser votre mot de passe : http://localhost:3000/resetPassword/${token}`,
                    };

                    // Envoyez l'e-mail
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log("ERREUR");
                            console.error(error);
                            res.status(500).send(`Erreur lors de l'envoi de l'e-mail : ${error.message}`);
                        } else {
                            console.log("E-mail envoyé : " + info.response);
                            res.status(200).send("E-mail envoyé avec succès");
                        }
                    });
                }
            }
        });

    });
};

module.exports = sendMail;