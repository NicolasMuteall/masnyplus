import React, { useEffect, useState } from 'react';
import './_UpdateUser.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import bcrypt from "bcryptjs-react";
import axios from 'axios';
import he from 'he';
import { useDispatch, useSelector } from 'react-redux';
import { setNom, setPrenom } from '../../store';
import { useNavigate } from 'react-router-dom';

const UpdateUser = () => {

    const [customErrors, setCustomErrors] = useState({});
    const userId = useSelector((state) => state.idUser);
    const connected = useSelector((state) => state.login);
    const [dataUser, setDataUser] = useState([]);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);

    useEffect(() => {
        if (!connected) {
            navigate('/');
        }
    }, [connected, navigate])

    useEffect(() => {
        axios.get(`/user/${userId}`)
            .then((response) => {
                console.log(response.data);
                setDataUser(response.data);
            })
            .catch((error) => {
                console.error("Erreur lors de l'insertion", error);
            });
    }, [userId]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/user/${userId}`);
            console.log(response.data);
            setDataUser(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des données: ", error);
        }
    }

    useEffect(() => {
        if (dataUser.length > 0) {
            formik.setValues({
                name: dataUser[0].NAME_USER,
                mail: dataUser[0].MAIL_USER,
                password: '',
                firstname: dataUser[0].FIRSTNAME_USER,
                city: dataUser[0].CITY_USER,
            });
        }
    }, [dataUser]);

    const formik = useFormik({
        initialValues: {
            name: '',
            mail: '',
            firstname: '',
            city: '',
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
        }),
        onSubmit: async (values) => {
            const { name, mail, firstname, city } = values;
            console.log(values);
            //const hashedPassword = await bcrypt.hash(password, 10);

            axios.put(`/updateUserConnected/${userId}`, {
                mail: mail,
                name: name,
                firstname: firstname,
                city: city,
            })
                .then((response) => {
                    console.log(response.data);
                    if (response.data === false) {
                        setCustomErrors({ ...customErrors, mail: 'Cette adresse email est déjà utilisée' });
                    } else if (response.data === true) {
                        fetchData();
                        setCustomErrors({ ...customErrors, mail: '' });
                        dispatch(setNom(name));
                        dispatch(setPrenom(firstname));
                    }
                })
                .catch((error) => {
                    console.error("Erreur lors de l'insertion", error);
                });
        }
    });

    const submitPassword = async (e) => {
        e.preventDefault();
        const sanitizedOldPassword = he.encode(oldPassword);
        const sanitizedNewPassword = he.encode(newPassword);
        const hashedPassword = await bcrypt.hash(sanitizedNewPassword, 10);
        //console.log(sanitizedNewPassword);

        if (oldPassword.trim() === '' || newPassword.trim() === '') {
            setCustomErrors({ ...customErrors, password: 'Tous les champs sont obligatoires' })
            return;
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(newPassword)) {
            setCustomErrors({ ...customErrors, password: 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.' })
            return;
        }

        try {
            const verifPassword = await axios.post(`/verifyPassword`, { userId: userId, password: sanitizedOldPassword })
            //console.log(verifPassword.data);
            if (verifPassword.data === false) {
                setCustomErrors({ ...customErrors, password: 'Le mot de passe saisi est incorrect' });
                return;
            }

            if (verifPassword.data) {
                const updatePassword = await axios.put(`/updatePassword`, { userId: userId, password: hashedPassword })
                //console.log(updatePassword.data);
                if (updatePassword.data) {
                    setCustomErrors({ ...customErrors, password: '' });
                    setNewPassword('');
                    setOldPassword('');
                    alert('Votre mot de passe a été modifié avec succès');
                }
            }

        } catch (error) {
            console.error("Erreur lors de la connexion", error);
        }

    }

    const handleDelete = () => {
        axios.delete(`/deleteUser/${userId}`)
            .then((response) => {
                localStorage.clear();
                window.location.reload();
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression de l'utilisateur :", error);
            });
    }

    return (
        <div className='UpdateUser'>
            <h1>Modification des informations :</h1>
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
                    <div className='text-center mt-3'>
                        <button type="submit" className="btn btn-primary" onClick={formik.handleSubmit}>Enregister</button>
                    </div>
                </form>

                <h4 className='mt-3'>Modification du mot de passe :</h4>
                <form onSubmit={submitPassword}>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Ancien mot de passe:</label>
                        <input type="password" className="form-control" id="password" name='password' onChange={(e) => { setOldPassword(e.target.value) }} value={oldPassword} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">Nouveau Mot de passe:</label>
                        <input type="password" className="form-control" id="newPassword" name='newPassword' onChange={(e) => { setNewPassword(e.target.value) }} value={newPassword} />
                    </div>
                    {customErrors.password &&
                        <span style={{ color: 'red' }}>
                            {customErrors.password}
                        </span>
                    }
                    <div className='text-center mt-3'>
                        <button type="submit" className="btn btn-primary">Modifier</button>
                    </div>
                </form>

                <div className='text-center mt-3'>
                    <button className='btn btn-danger' onClick={() => { setModal(true) }}>Supprimer mon compte</button></div>
            </div>
            {modal && (
                <div className="page-shadow">
                    <div className='modal-delete border text-center rounded'>
                        <span onClick={() => { setModal(false) }} className="material-symbols-outlined close">
                            close
                        </span>
                        <p className='mt-3'>Voulez-vous vraiment supprimer le compte ?</p>
                        <div>
                            <button className='btn btn-primary' onClick={() => setModal(false)}>Non</button>
                            <button className='btn btn-danger ms-1' onClick={handleDelete}>Oui</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateUser;