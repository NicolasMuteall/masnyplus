import React, { useEffect, useState } from 'react';
import './_SignUp.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import bcrypt from "bcryptjs-react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [customErrors, setCustomErrors] = useState({});
    const navigate = useNavigate();
    const [communes, setCommunes] = useState([]);
    const [selectedVille, setSelectedVille] = useState('');

    const handleSelectChange = (e) => {
        setSelectedVille(e.target.value);
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            mail: "",
            password: "",
            firstname: "",
            codePostal: ""
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .min(5, 'Votre nom doit avoir plus de 5 caractères')
                .required("Le nom est obligatoire !"),
            firstname: Yup.string()
                .min(5, 'Votre prénom doit avoir plus de 5 caractères')
                .required("Le prénom est obligatoire !"),
            codePostal: Yup.string()
                .matches(/^[0-9]{5}$/, 'Le code postal doit comporter exactement 5 chiffres')
                .test('is-code-postal-length', 'La longueur du code postal doit être de 5 caractères', function (value) {
                    if (value && value.length === 5) {
                        axios.get(`https://geo.api.gouv.fr/communes?codePostal=${value}`)
                            .then((response) => {
                                //console.log(response.data);
                                setCommunes(response.data);
                                if (response.data.length === 0) {
                                    setSelectedVille('');
                                    setCustomErrors({ ...customErrors, ville: 'Code postal inconnu' });
                                } else {
                                    setCustomErrors({ ...customErrors, ville: '' });
                                }
                            })
                            .catch((error) => {
                                console.error("Erreur lors de l'insertion", error);
                            });
                    }
                    return true;
                })
                .required('Le code postal est obligatoire'),
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
            const { name, mail, password, firstname, codePostal } = values;
            const hashedPassword = await bcrypt.hash(password, 10);

            console.log(selectedVille);
            if (selectedVille === '') {
                return;
            }

            axios.post("/signUp", {
                mail: mail,
                name: name,
                firstname: firstname,
                city: selectedVille,
                password: hashedPassword,
            })
                .then((response) => {
                    console.log(response.data);
                    if (response.data === true) {
                        // Mettez à jour les erreurs personnalisées
                        setCustomErrors({ ...customErrors, mail: 'Cette adresse email est déjà utilisée' });
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
            <h1 className='mt-5'>Inscription</h1>
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

                    <div className="mb-3 city">

                        <div>
                            <label htmlFor="codePostal" className="form-label">Code postal:</label>
                            <input type="number" max='99999' className="form-control" id="codePostal" name='codePostal' onChange={formik.handleChange} value={formik.values.codePostal} />
                        </div>

                        <div className='ms-2'>
                            <label htmlFor="Ville" className="form-label">Ville:</label>
                            <select className="form-select" aria-label="Default select example" value={selectedVille} onChange={handleSelectChange}>
                                <option value=''>...</option>
                                {communes.map((commune, index) => (
                                    <React.Fragment key={index}>
                                        <option value={commune.nom}>{commune.nom}</option>
                                    </React.Fragment>
                                ))}
                            </select>
                        </div>
                    </div>

                    {formik.errors.codePostal &&
                        <span style={{ color: 'red' }}>
                            {formik.errors.codePostal}
                        </span>
                    }

                    {customErrors.ville &&
                        <span style={{ color: 'red' }}>
                            {customErrors.ville}
                        </span>
                    }

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