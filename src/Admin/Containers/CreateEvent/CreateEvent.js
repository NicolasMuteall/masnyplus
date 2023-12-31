import React, { useEffect } from 'react';
import './_CreateEvent.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BtnToAdmin from '../../Components/BtntoAdmin/BtnToAdmin';
import { useSelector } from 'react-redux';

const CreateEvent = () => {

    const navigate = useNavigate();
    const role = useSelector((state) => state.role);

    useEffect(() => {
        if (role !== 'admin') {
            navigate('/');
        }
    }, [navigate, role])

    const formik = useFormik({
        initialValues: {
            nameEvent: "",
            dateEvent: "",
            places: 50,
        },
        validationSchema: Yup.object().shape({
            nameEvent: Yup.string()
                .required("Le nom de l'évènement doit être renseigné"),
            dateEvent: Yup.string()
                .required("La date de l'évènement doit être renseignée"),
            places: Yup.number()
                .integer("Le nombre de places doit être un nombre entier")
                .positive("Le nombre de places ne peut pas être négatif")
                .required("Le nombre de places doit être renseigné"),
        }),
        onSubmit: async (values) => {
            const { nameEvent, dateEvent, places } = values;

            axios.post("/createEvent", {
                nameEvent: nameEvent,
                dateEvent: dateEvent,
                places: places,
            })
                .then((response) => {
                    //console.log(response.data);
                    if (response.data) {
                        navigate('/admin/Event');
                    }
                })
                .catch((error) => {
                    console.error("Erreur lors de l'insertion", error);
                });
        }
    });

    return (
        <div className='CreateEvent container'>
            <BtnToAdmin />
            <h1>Creer un evenement</h1>
            <form onSubmit={formik.handleSubmit} className='form-createEvent mx-auto mt-3'>
                <div className="mb-3">
                    <label htmlFor="nameEvent" className="form-label">Nom de l'évènement:</label>
                    <input type="text" className="form-control" id="nameEvent" name='nameEvent' onChange={formik.handleChange} value={formik.values.nameEvent} />
                    {formik.errors.nameEvent &&
                        <span style={{ color: 'red' }}>
                            {formik.errors.nameEvent}
                        </span>
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="dateEvent" className="form-label">Date de l'évènement:</label>
                    <input type="datetime-local" className="form-control" id="dateEvent" name='dateEvent' onChange={formik.handleChange} value={formik.values.dateEvent} />
                    {formik.errors.dateEvent &&
                        <span style={{ color: 'red' }}>
                            {formik.errors.dateEvent}
                        </span>
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="places" className="form-label">Nombre de places:</label>
                    <input type="number" className="form-control" id="places" name='places' onChange={formik.handleChange} value={formik.values.places} />
                    {formik.errors.places &&
                        <span style={{ color: 'red' }}>
                            {formik.errors.places}
                        </span>
                    }
                </div>
                <div className='text-center mt-3'>
                    <button type="submit" className="btn btn-primary radius50" onClick={formik.handleSubmit}>Créer</button>
                </div>
            </form>
        </div>
    );
};

export default CreateEvent;