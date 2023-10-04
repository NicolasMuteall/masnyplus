import React, { useState } from 'react';
import './_Login.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import bcrypt from "bcryptjs-react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import he from 'he';

const Login = () => {

    const [customErrors, setCustomErrors] = useState({});
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            mail: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            mail: Yup.string()
                .required("Le mail est obligatoire"),
            password: Yup.string()
                .required('Le mot de passe est obligatoire'),
        }),
        onSubmit: async (values) => {
            const { mail, password } = values;
            const sanitizedMail = he.encode(mail);
            const sanitizedPassword = he.encode(password);
            //const hashedPassword = await bcrypt.hash(sanitizedPassword, 10);
            console.log(sanitizedMail);
            console.log(sanitizedPassword);
            //console.log(hashedPassword);

            axios.post("/login", {
                mail: sanitizedMail,
                password: sanitizedPassword,
            })
                .then((response) => {
                    console.log(response.data);
                    if (response.data === false) {
                        // Mettez à jour les erreurs personnalisées
                        setCustomErrors({ error: 'Identifiants incorrects' });
                    }
                })
                .catch((error) => {
                    console.error("Erreur lors de l'insertion", error);
                });
        }
    });

    return (
        <div className='Login'>
            <h1>Connexion</h1>
            <div className='w-25 mx-auto mt-5'>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="mail" className="form-label">Adresse mail:</label>
                        <input type="mail" className="form-control" id="mail" name='mail' onChange={formik.handleChange} value={formik.values.mail} />
                        {formik.errors.mail &&
                            <span style={{ color: 'red' }}>
                                {formik.errors.mail}
                            </span>
                        }
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mot de passe:</label>
                        <input type="password" className="form-control" id="password" name='password' onChange={formik.handleChange} value={formik.values.password} />
                        {formik.errors.password &&
                            <span style={{ color: 'red' }}>
                                {formik.errors.password}
                            </span>
                        }
                    </div>
                    {customErrors.error &&
                        <div style={{ color: 'red', textAlign: 'center' }}>
                            {customErrors.error}
                        </div>
                    }
                    <div className='text-center mt-3'>
                        <button type="submit" className="btn btn-primary" onClick={formik.handleSubmit}>Valider</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;