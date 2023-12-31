import React, { useEffect, useState } from 'react';
import './_Login.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import he from 'he';
import { useDispatch, useSelector } from 'react-redux';
import { setIdUser, setNom, setPrenom, setRole, setToken } from '../../store';

const Login = () => {

    const [customErrors, setCustomErrors] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const connected = useSelector((state) => state.login);

    useEffect(() => {
        if (connected) {
            navigate('/');
        }
    }, [connected, navigate])

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

            try {
                const login = await axios.post("/login", { mail: sanitizedMail, password: sanitizedPassword })
                if (login.data === false) {
                    setCustomErrors({ error: 'Identifiants incorrects' });
                } else {
                    const token = await axios.put(`/createToken/${login.data.ID_USER}`)
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
        <div className='Login container mt-3'>
            <h1>Connexion</h1>
            <div className='form-login w-25 mx-auto mt-5'>
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
                    <div className="">
                        <label htmlFor="password" className="form-label">Mot de passe:</label>
                        <input type="password" className="form-control" id="password" name='password' onChange={formik.handleChange} value={formik.values.password} />
                        {formik.errors.password &&
                            <span style={{ color: 'red' }}>
                                {formik.errors.password}
                            </span>
                        }
                    </div>
                    <div className='text-end'>
                        <Link to='/forgetPassword'><span className='forgot-password'>mot de passe oublié?</span></Link>
                    </div>
                    {customErrors.error &&
                        <div style={{ color: 'red', textAlign: 'center' }}>
                            {customErrors.error}
                        </div>
                    }
                    <div className='text-center mt-3'>
                        <button type="submit" className="btn btn-primary radius50" onClick={formik.handleSubmit}>Connexion</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;