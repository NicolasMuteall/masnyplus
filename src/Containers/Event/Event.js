import React, { useEffect, useState } from 'react';
import './_Event.scss';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Event = () => {

    const userId = useSelector((state) => state.idUser);
    const [dataEvent, setDataEvent] = useState([]);
    const connected = useSelector((state) => state.login);
    const [expandedEvents, setExpandedEvents] = useState({});
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [eventId, setEventId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (connected) {
                try {
                    const [eventsResponse, registersResponse] = await Promise.all([
                        axios.get("/getEvents"),
                        axios.get(`/verifRegister-user/${userId}`),
                    ]);

                    const events = eventsResponse.data;
                    const registers = registersResponse.data;

                    const combinedData = events.map((event) => ({
                        ...event,
                        register: registers.filter((register) => register.ID_EVENT === event.ID_EVENT),
                        isRegistered: registers.some((register) => register.ID_EVENT === event.ID_EVENT),
                    }));

                    console.log(combinedData);

                    setDataEvent(combinedData);
                } catch (error) {
                    console.error("Erreur lors de la récupération des données: ", error);
                }
            } else {
                try {
                    const events = await axios.get("/getEvents");
                    console.log(events.data);
                    setDataEvent(events.data);
                } catch (error) {
                    console.error("Erreur lors de la récupération des données: ", error);
                }
            }
        }
        fetchData();
    }, [userId, connected]);


    const fetchData = async () => {
        if (connected) {
            try {
                const [eventsResponse, registersResponse] = await Promise.all([
                    axios.get("/getEvents"),
                    axios.get(`/verifRegister-user/${userId}`),
                ]);
                //console.log(eventsResponse.data);
                //console.log(registersResponse.data);

                const events = eventsResponse.data;
                const registers = registersResponse.data;

                const combinedData = events.map((event) => ({
                    ...event,
                    register: registers.filter((register) => register.ID_EVENT === event.ID_EVENT),
                    isRegistered: registers.some((register) => register.ID_EVENT === event.ID_EVENT),
                }));

                console.log(combinedData);

                setDataEvent(combinedData);
            } catch (error) {
                console.error("Erreur lors de la récupération des données: ", error);
            }
        } else {
            try {
                const events = await axios.get("/getEvents");
                console.log(events.data);
                setDataEvent(events.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données: ", error);
            }
        }
    }

    const toggleEvent = (event) => {
        setExpandedEvents({
            ...expandedEvents,
            [event.ID_EVENT]: !expandedEvents[event.ID_EVENT]
        });
    };

    const deleteRegister = (eventId) => {
        axios.delete(`/deleteRegister/${userId}/${eventId}`)
            .then(response => {
                console.log(response.data);
                fetchData();
                setModal(false);
            })
            .catch(error => {
                console.log('Erreur: ', error)
            });
    }

    return (
        <div className='Events container mt-3'>
            <h1 className='text-start'>Evenements a venir :</h1>
            <div>
                {dataEvent.map(event => (
                    <div className='events mt-3' key={event.ID_EVENT} onClick={() => { toggleEvent(event) }}>
                        <div className='div-event'>
                            <span>
                                <span className='fw-bold'>{event.NAME_EVENT}</span> le {moment(event.DATE_EVENT).format('DD/MM/YYYY')} à {moment(event.DATE_EVENT).format('HH:mm')}
                            </span>
                            <div className='nb-places'>
                                <span className='remain-places'>Places restantes:<span className='fw-bold'> {event.PLACES}</span></span>
                                {(connected && event.PLACES > 0 && event.isRegistered === false) && (
                                    <button className='btn btn-primary ms-2 radius50' onClick={() => { navigate(`/event/${event.ID_EVENT}`) }}>S'inscrire</button>
                                )}
                                {connected && event.isRegistered === true && (
                                    <button className='btn btn-secondary ms-2 btn-register radius50' onClick={() => { setModal(true); setEventId(event.ID_EVENT) }}>Annuler</button>
                                )}
                            </div>
                        </div>
                        {expandedEvents[event.ID_EVENT] && (
                            <div>Informations supplémentaire</div>
                        )}
                    </div>
                ))}
            </div>
            {modal && (
                <div className="page-shadow">
                    <div className='modal-register border text-center rounded'>
                        <span onClick={() => { setModal(false) }} className="material-symbols-outlined close">
                            close
                        </span>
                        <p className='mt-3'>Voulez-vous vraiment annuler l'inscription ?</p>
                        <div>
                            <button className='btn btn-primary' onClick={() => setModal(false)}>Non</button>
                            <button className='btn btn-danger ms-1' onClick={() => { deleteRegister(eventId) }}>Oui</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Event;