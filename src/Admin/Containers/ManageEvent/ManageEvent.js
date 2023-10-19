import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import './_ManageEvent.scss';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const ManageEvent = () => {

    const [dataEvent, setDataEvent] = useState([]);
    const role = useSelector((state) => state.role);
    const navigate = useNavigate();
    const [modalData, setModalData] = useState({});
    const [modal, setModal] = useState(false);
    const [expandedEvents, setExpandedEvents] = useState({});

    useEffect(() => {
        if (role !== 'admin') {
            navigate('/');
        }
    }, [navigate, role])

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        try {
            const response = await axios.get("/getEvents");
            console.log(response.data);
            setDataEvent(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des données: ", error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(modalData);
        const datetimeISO = modalData.DATE_EVENT;
        const formattedDatetime = moment(datetimeISO).format("YYYY-MM-DD HH:mm:ss");
        const updatedData = {
            ...modalData,
            DATE_EVENT: formattedDatetime
        };
        axios.put(`/updateEvent/${modalData.ID_EVENT}`, updatedData)
            .then((response) => {
                //console.log(response.data);
                if (response.data) {
                    fetchData();
                    setModal(false);
                }
            })
            .catch((error) => {
                console.error("Erreur lors de la mise à jour des données:", error);
            });
    }

    const handleDelete = (eventId) => {
        axios.delete(`/deleteEvent/${eventId}`)
            .then((response) => {
                if (response.data === true) {
                    fetchData();
                    setModal(false);
                };
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression de l'utilisateur :", error);
            });
    }

    const toggleEvent = (event) => {
        setExpandedEvents({
            ...expandedEvents,
            [event.ID_EVENT]: !expandedEvents[event.ID_EVENT]
        });
    };

    return (
        <div className='ManageEvent container'>
            <h1 className='mt-5'>Gérer les évènements</h1>
            <div>
                {dataEvent.map(event => (
                    <div className='events mt-3' key={event.ID_EVENT}>
                        <div className='div-event' onClick={() => { setModalData(event); toggleEvent(event); setModal(true) }}>
                            <span>
                                {event.NAME_EVENT} {moment(event.DATE_EVENT).format('DD/MM/YYYY')} à {moment(event.DATE_EVENT).format('HH:mm')}
                            </span>
                            <span>Places restantes: {event.PLACES}</span>
                        </div>
                        {expandedEvents[event.ID_EVENT] && (
                            <div>Contenu supplémentaire</div>
                        )}
                    </div>
                ))}
            </div>

            {modal && (
                <div className="page-shadow">
                    <div className='modal-event border text-center rounded'>
                        <span onClick={() => { setModal(false) }} className="material-symbols-outlined close">
                            close
                        </span>
                        <div className='header-modal fw-bold mt-1'>Informations de l'évènement</div>
                        <div className='mt-3 body-modal'>

                            <form onSubmit={handleSubmit}>

                                <label htmlFor="nameEvent" className="form-label">Nom de l'évènement:</label>
                                <input type="text" className="form-control" id="nameEvent" name='nameEvent' onChange={(e) => { setModalData({ ...modalData, NAME_EVENT: e.target.value }) }} value={modalData.NAME_EVENT} />

                                <label htmlFor="dateEvent" className="form-label">Date de l'évènement:</label>
                                <input type="datetime-local" className="form-control" id="dateEvent" name='dateEvent' onChange={(e) => { setModalData({ ...modalData, DATE_EVENT: e.target.value }) }} value={moment(modalData.DATE_EVENT).format('YYYY-MM-DDTHH:mm')} />

                                <label htmlFor="places" className="form-label">Places restantes:</label>
                                <input type="number" className="form-control" id="places" name='places' onChange={(e) => { setModalData({ ...modalData, PLACES: e.target.value }) }} value={modalData.PLACES} />

                                <button className='btn btn-success mt-3 d-block mx-auto' onClick={() => { navigate(`/admin/manageRegistered/${modalData.ID_EVENT}`) }} >Voir les inscrits</button>

                                <button type="submit" className="btn btn-primary mt-3">Modifier</button>
                                <button className='btn btn-danger mt-3 ms-1' onClick={() => { handleDelete(modalData.ID_EVENT) }}>Supprimer</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageEvent;