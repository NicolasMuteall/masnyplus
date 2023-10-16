import React, { useState } from 'react';
import './_Login.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import he from 'he';
import { useDispatch } from 'react-redux';
import { setIdUser, setNom, setPrenom, setRole, setToken } from '../../store';

const Login = () => {

    const [customErrors, setCustomErrors] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            //console.log(sanitizedMail);
            //console.log(sanitizedPassword);

            try {
                const login = await axios.post("/login", { mail: sanitizedMail, password: sanitizedPassword })
                //console.log(login.data);
                if (login.data === false) {
                    // Mettez à jour les erreurs personnalisées
                    setCustomErrors({ error: 'Identifiants incorrects' });
                } else {
                    const token = await axios.put(`/createToken/${login.data.ID_USER}`)
                    //console.log(token.data.token);
                    dispatch(setToken(token.data.token));
                    dispatch(setIdUser(login.data.ID_USER));
                    dispatch(setNom(login.data.NAME_USER));
                    dispatch(setPrenom(login.data.FIRSTNAME_USER));
                    dispatch(setRole(login.data.ROLE_USER));
                    navigate('/');
                }

            } catch (error) {
                console.error("Erreur lors de la connexion", error);
            }
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