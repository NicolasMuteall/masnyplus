import React, { useEffect, useState } from 'react';
import './_Event.scss';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Event = () => {

    const [dataEvent, setDataEvent] = useState([]);
    const connected = useSelector((state) => state.login);
    const [expandedEvents, setExpandedEvents] = useState({});
    const navigate = useNavigate();

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

    const toggleEvent = (event) => {
        setExpandedEvents({
            ...expandedEvents,
            [event.ID_EVENT]: !expandedEvents[event.ID_EVENT]
        });
    };

    return (
        <div className='Events container mt-3'>
            <h1 className='text-start'>Evènements à venir:</h1>
            <div>
                {dataEvent.map(event => (
                    <div className='events mt-3' key={event.ID_EVENT} onClick={() => { toggleEvent(event) }}>
                        <div className='div-event'>
                            <span>
                                {event.NAME_EVENT} {moment(event.DATE_EVENT).format('DD/MM/YYYY')} à {moment(event.DATE_EVENT).format('HH:mm')}
                            </span>
                            <div>
                                <span>Places restantes: {event.PLACES}</span>
                                {connected && (
                                    <button className='btn btn-primary ms-2' onClick={() => { navigate(`/event/${event.ID_EVENT}`) }}>s'inscrire</button>
                                )}
                            </div>
                        </div>
                        {expandedEvents[event.ID_EVENT] && (
                            <div>Informations supplémentaire</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Event;