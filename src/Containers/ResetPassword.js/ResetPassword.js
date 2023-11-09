import React, { useEffect, useState } from 'react';
import './_ResetPassword.scss';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import bcrypt from "bcryptjs-react";

const ResetPassword = () => {

    const param = useParams();
    const token = param.token;
    const [idUser, setIdUser] = useState('');
    const [error, setError] = useState(false);
    const [customErrors, setCustomErrors] = useState({});
    const connected = useSelector((state) => state.login);
    const navigate = useNavigate();

    useEffect(() => {
        if (connected) {
            navigate('/');
        }
    }, [connected, navigate]);

    useEffect(() => {
        axios.get('http://localhost:3001/verify-token', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                //console.log(response.data);
                if (!response.data) {
                    setError(true);
                }
                //console.log(response.data.userId);
                setIdUser(response.data.userId)
            })
            .catch(error => {
                // Token invalide ou expiré, l'utilisateur n'est pas authentifié
                console.log('TOKEN INVALIDE', error);
                setError(true);
            });
    }, [token]);

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object().shape({
            password: Yup.string()
                .min(8, 'Le mot de passe doit avoir au moins 8 caractères')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.'
                )
                .required('Le champ est obligatoire'),
            confirmPassword: Yup.string()
                .required('Le champ est obligatoire'),
        }),
        onSubmit: async (values) => {
            const { password, confirmPassword } = values;
            //console.log(values);

            if (password !== confirmPassword) {
                setCustomErrors({ ...customErrors, password: "Les 2 champs saisis ne correspondent pas" });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            axios.put('/updatePassword', { password: hashedPassword, idUser: idUser })
                .then((response) => {
                    console.log(response.data);
                    if (response.data === true) {
                        navigate('/login');
                    }
                })
                .catch((error) => {
                    console.error("Erreur lors de la mise à jour", error);
                });
        }
    });

    return (
        <div className='ResetPassword container'>
            {error ? (
                <h1 className='text-center'>Lien Invalide ou expire</h1>
            ) : (
                <div>
                    <h1 className='mb-3'>Reinitialisation du mot de passe</h1>
                    <form className='form-reset mx-auto' onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="Input" className="form-label">
                                Nouveau mot de passe:
                            </label>
                            <input type="password" className="form-control inputReset" id="mdp" name="password" autoComplete="off" onChange={formik.handleChange} value={formik.values.password} />
                            {(formik.touched.password && formik.errors.password) &&
                                <span style={{ color: 'red' }}>
                                    {formik.errors.password}
                                </span>
                            }
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Input" className="form-label">
                                Confirmer nouveau mot de passe:
                            </label>
                            <input type="password" className="form-control inputReset" id="confirmMdp" name="confirmPassword" autoComplete="off" onChange={formik.handleChange} value={formik.values.confirmPassword} />
                            {(formik.touched.confirmPassword && formik.errors.confirmPassword) &&
                                <span style={{ color: 'red' }}>
                                    {formik.errors.confirmPassword}
                                </span>
                            }
                        </div>

                        <div className='text-center'>
                            {customErrors.password &&
                                <span className='d-block' style={{ color: 'red' }}>
                                    {customErrors.password}
                                </span>
                            }
                            <button className="btn btn-primary mt-1" type="submit">
                                Réinitialiser
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ResetPassword;