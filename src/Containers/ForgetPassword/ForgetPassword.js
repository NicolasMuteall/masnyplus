import React, { useEffect } from 'react';
import './_ForgetPassword.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ForgetPassword = () => {

    const navigate = useNavigate();
    const connected = useSelector((state) => state.login);

    useEffect(() => {
        if (connected) {
            navigate('/');
        }
    }, [connected, navigate])

    const formik = useFormik({
        initialValues: {
            mail: "",
        },
        validationSchema: Yup.object().shape({
            mail: Yup.string()
                .required("Le mail est obligatoire")
                .email("Veuillez entrer une adresse mail valide"),
        }),
        onSubmit: (values) => {
            //console.log(values);
            const { mail } = values;

            axios.post('/sendMail', { mail })
                .then((response) => {
                    console.log(response.data);
                    alert('Email envoyé');
                    navigate('/login');
                })
                .catch((error) => {
                    console.error("Erreur lors de l'envoi", error);
                });
        }
    });

    return (
        <div className='ForgetPassword'>
            <div className='w-50 mx-auto mt-5'>
                <p>Renseigner votre adresse email pour recevoir un lien de réinitialisation :</p>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <input type="mail" className="form-control" id="mail" name='mail' onChange={formik.handleChange} value={formik.values.mail} />
                        {(formik.touched.mail && formik.errors.mail) &&
                            <span style={{ color: 'red' }}>
                                {formik.errors.mail}
                            </span>
                        }
                    </div>
                    <div className='text-center mt-3'>
                        <button type="submit" className="btn btn-primary" onClick={formik.handleSubmit}>Envoyer</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;