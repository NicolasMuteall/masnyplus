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



    useEffect(() => {
        if (!connected) {
            navigate('/');
        }
    }, [navigate, connected])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/getEvent/${eventId}`);
                console.log(response.data);
                setDataEvent(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données: ", error);
            }
        }
        fetchData();
    }, [eventId]);

    const addField = () => {
        setFields([
            ...fields,
            {
                id: fields.length,
                name: "",
                firstname: "",
            },
        ]);
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
            return;
        }
    }

    return (
        <div className='RegisterEvent container'>
            <h1 className='text-start'>Inscription à l'évènement : {dataEvent[0] && dataEvent[0].NAME_EVENT}</h1>
            <div>
                <p>places restantes: {dataEvent[0] && dataEvent[0].PLACES}</p>
                <div className='add-div'>
                    <span>S'inscrire en tant que : {userFirstname} {userName}</span>
                    <button className='btn btn-secondary' onClick={addField}>ajouter une personne</button>
                </div>

                <form onSubmit={handleSubmit}>
                    {fields.map((field, index) => (
                        <div key={field.id} className='w-50 mx-auto'>
                            <label htmlFor={`name_${field.length}`} className="form-label">Nom:</label>
                            <input
                                type="text"
                                className="form-control"
                                id={`name_${field.length}`}
                                name={`name_${field.length}`}
                                value={field.name}
                                onChange={(e) => handleChange(e, index, "name")}
                            />
                            <label htmlFor={`firstname_${field.length}`} className="form-label">Prénom:</label>
                            <input
                                type="text"
                                className="form-control"
                                id={`firstname_${field.length}`}
                                name={`firstname_${field.length}`}

                                onChange={(e) => handleChange(e, index, "firstname")}
                            />
                        </div>
                    ))}
                    <button className='btn btn-primary mt-3'>S'inscrire</button>
                </form>

            </div>
        </div>
    );
};

export default RegisterEvent;