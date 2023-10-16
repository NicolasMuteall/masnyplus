import React, { useState } from 'react';
import './_SignUp.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import bcrypt from "bcryptjs-react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [customErrors, setCustomErrors] = useState({});
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: "",
            mail: "",
            password: "",
            firstname: "",
            city: ""
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .min(5, 'Votre nom doit avoir plus de 5 caractères')
                .required("Le nom est obligatoire !"),
            firstname: Yup.string()
                .min(5, 'Votre prénom doit avoir plus de 5 caractères')
                .required("Le prénom est obligatoire !"),
            city: Yup.string()
                .min(3, 'Le nom de la ville doit comporter au moins 3 caractères')
                .max(50, 'Le nom de la ville ne doit pas dépasser 50 caractères')
                .required('La ville est obligatoire'),
            mail: Yup.string()
                .email("Veuillez entrer une adresse mail valide !")
                .required("Le mail est obligatoire"),
            password: Yup.string()
                .min(8, 'Le mot de passe doit avoir au moins 8 caractères')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.'
                )
                .required('Le mot de passe est obligatoire'),
        }),
        onSubmit: async (values) => {
            const { name, mail, password, firstname, city } = values;
            const hashedPassword = await bcrypt.hash(password, 10);

            axios.post("/signUp", {
                mail: mail,
                name: name,
                firstname: firstname,
                city: city,
                password: hashedPassword,
            })
                .then((response) => {
                    console.log(response.data);
                    if (response.data === true) {
                        // Mettez à jour les erreurs personnalisées
                        setCustomErrors({ mail: 'Cette adresse email est déjà utilisée' });
                    } else {
                        navigate('/login')
                    }
                })
                .catch((error) => {
                    console.error("Erreur lors de l'insertion", error);
                });
        }
    });

    return (
        <div className='Inscription'>
            <h1>Inscription</h1>
            <div className='w-25 mx-auto mt-5'>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nom:</label>
                        <input type="text" className="form-control" id="name" name='name' onChange={formik.handleChange} value={formik.values.name} />
                        {formik.errors.name &&
                            <span style={{ color: 'red' }}>
                                {formik.errors.name}
                            </span>
                        }
                    </div>
                    <div className="mb-3">
                        <label htmlFor="firstname" className="form-label">Prénom:</label>
                        <input type="text" className="form-control" id="firstname" name='firstname' onChange={formik.handleChange} value={formik.values.firstname} />
                        {formik.errors.firstname &&
                            <span style={{ color: 'red' }}>
                                {formik.errors.firstname}
                            </span>
                        }
                    </div>
                    <div className="mb-3">
                        <label htmlFor="city" className="form-label">Ville:</label>
                        <input type="text" className="form-control" id="city" name='city' onChange={formik.handleChange} value={formik.values.city} />
                        {formik.errors.city &&
                            <span style={{ color: 'red' }}>
                                {formik.errors.city}
                            </span>
                        }
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mail" className="form-label">Adresse mail:</label>
                        <input type="mail" className="form-control" id="mail" name='mail' onChange={formik.handleChange} value={formik.values.mail} />
                        {formik.errors.mail &&
                            <span style={{ color: 'red' }}>
                                {formik.errors.mail}
                            </span>
                        }
                        {customErrors.mail &&
                            <span style={{ color: 'red' }}>
                                {customErrors.mail}
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
                    <div className='text-center mt-3'>
                        <button type="submit" className="btn btn-primary" onClick={formik.handleSubmit}>Valider</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;