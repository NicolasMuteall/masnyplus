import React, { useEffect, useState } from 'react';
import './_RegisterEvent.scss';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const RegisterEvent = () => {

    const connected = useSelector((state) => state.login);
    const userId = useSelector((state) => state.idUser);
    const userName = useSelector((state) => state.nom);
    const userFirstname = useSelector((state) => state.prenom);
    const navigate = useNavigate();
    const [dataEvent, setDataEvent] = useState([]);
    const param = useParams();
    const eventId = param.id;
    const [fields, setFields] = useState([]);
    const [registered, setRegistered] = useState(false);


    useEffect(() => {
        if (!connected) {
            navigate('/');
        }
    }, [navigate, connected]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/getEvent/${eventId}`);
                //console.log(response.data);
                setDataEvent(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données: ", error);
            }
        }
        fetchData();
    }, [eventId]);

    useEffect(() => {
        const fetchRegister = async () => {
            try {
                const register = await axios.get(`/verifRegister/${userId}/${eventId}`);
                console.log(register.data);
                if (register.data.length > 0) {
                    navigate('/events')
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données: ", error);
            }
        }
        fetchRegister();
    }, [eventId, userId, navigate])

    const addField = () => {
        if (fields.length < 5 && fields.length < (dataEvent[0].PLACES) - 1) {
            setFields([
                ...fields,
                {
                    id: fields.length,
                    name: "",
                    firstname: "",
                },
            ]);
        }
    };

    const removeField = (index) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);
    };

    const handleChange = (e, index, fieldName) => {
        const updatedFields = [...fields];
        updatedFields[index] = {
            ...updatedFields[index],
            [fieldName]: e.target.value,
        };
        setFields(updatedFields);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(fields);

        if (fields.some(field => field.name.trim() === "" || field.firstname.trim() === "")) {
            console.log("Tous les champs doivent être remplis.");
        } else {
            const isValid = fields.every(field => {

                const isNameValid = field.name.length >= 3 && /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/.test(field.name);

                const isFirstnameValid = field.firstname.length >= 3 && /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/.test(field.firstname);

                return isNameValid && isFirstnameValid;
            });

            if (!isValid) {
                console.log("Les données ne respectent pas les règles de validation.");
                return;
            } else {
                axios.post("/addRegisterEvent", {
                    userId: userId,
                    eventId: parseInt(eventId),
                    nbPlaces: (fields.length) + 1,
                    data: fields
                })
                    .then((response) => {
                        console.log(response.data);
                        if (response.data) {
                            navigate('/events');
                        }
                    })
                    .catch((error) => {
                        console.error("Erreur lors de l'insertion", error);
                    });
            }
        }
    }

    return (
        <div className='RegisterEvent container'>
            <h1 className='text-start'>Inscription a l'evenement : {dataEvent[0] && dataEvent[0].NAME_EVENT}</h1>
            <div>
                <p>places restantes: <span className='fw-bold'>{dataEvent[0] && dataEvent[0].PLACES}</span></p>

                {!registered ? (
                    <div>
                        <div className='add-div'>
                            <span className='register-user'>S'inscrire en tant que:<span className='ms-1 fw-bold'>{userFirstname} {userName}</span></span>
                            <button className='btn btn-secondary radius50 btn-addRegister' onClick={addField}>Ajouter une personne (5 max)</button>
                        </div>

                        <form className='mt-3' onSubmit={handleSubmit}>
                            {fields.map((field, index) => (
                                <div key={field.id} className='form-addRegister mx-auto mb-3'>
                                    <div className='header-registered'>
                                        <div className='fw-bold'>Personne {(field.id) + 2}</div>
                                        <button className='btn btn-danger radius50' onClick={() => removeField(index)}>Annuler</button>
                                    </div>
                                    <label htmlFor={`name_${field.id}`} className="form-label">Nom:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={`name_${field.id}`}
                                        name={`name_${field.id}`}
                                        value={field.name}
                                        onChange={(e) => handleChange(e, index, "name")}
                                    />
                                    <label htmlFor={`firstname_${field.id}`} className="form-label">Prénom:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={`firstname_${field.id}`}
                                        name={`firstname_${field.id}`}

                                        onChange={(e) => handleChange(e, index, "firstname")}
                                    />
                                </div>
                            ))}
                            <div className='text-center'><button className='btn btn-primary mt-3 radius50'>S'inscrire</button></div>
                        </form>

                    </div>
                ) : (
                    <div>Inscrit</div>
                )}

            </div>
        </div>
    );
};

export default RegisterEvent;