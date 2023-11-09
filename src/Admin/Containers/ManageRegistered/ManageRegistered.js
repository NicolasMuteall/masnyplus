import React, { useEffect, useState } from 'react';
import './_ManageRegistered.scss';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ManageRegistered = () => {

    const role = useSelector((state) => state.role);
    const navigate = useNavigate();
    const param = useParams();
    const eventId = param.eventId;
    const [dataRegister, setDataRegister] = useState([]);
    const [dataEvent, setDataEvent] = useState([]);
    const [nbPlaces, setNbPlaces] = useState(0);
    const [nameEvent, setNameEvent] = useState('');

    useEffect(() => {
        if (role !== 'admin') {
            navigate('/');
        }
    }, [navigate, role])

    useEffect(() => {
        axios.get(`/getRegistered/${eventId}`)
            .then((response) => {
                //console.log(response.data);
                const dataWithIndividualNames = response.data.map(data => ({
                    ...data,
                    individualNames: data.NAMES_REGISTER.split(', '),
                }));
                console.log(dataWithIndividualNames);
                setDataRegister(dataWithIndividualNames);
                setNbPlaces(response.data.reduce((accumulator, record) => accumulator + record.NB_PLACES, 0));
            })
            .catch((error) => {
                console.error("Erreur lors de la mise à jour des données:", error);
            });
    }, [eventId])

    useEffect(() => {
        axios.get('/getEvents')
            .then((response) => {
                //console.log(response.data);
                const events = response.data;
                const filteredEvents = events.filter((event) => event.ID_EVENT === parseInt(eventId));
                setNameEvent(filteredEvents[0].NAME_EVENT);
            })
            .catch((error) => {
                console.error("Erreur lors de la mise à jour des données:", error);
            });
    }, [eventId]);

    return (
        <div className='ManageRegistered'>
            <div className='container'><h1 className='mt-5'>Liste des inscrits pour {nameEvent} :</h1></div>


            <div className='container container-nb mt-3 mb-3'>
                <div className='nb-register'>
                    <div>Nombre de personnes inscrites : </div>
                    <div>{nbPlaces}</div>
                </div>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <td className='fw-bold'>Nom Prénom</td>
                    </tr>
                </thead>
                <tbody>
                    {dataRegister.map(register => (
                        <React.Fragment key={register.ID_REGISTER}>
                            <tr>
                                <td className='user-table'>{register.NAME_USER} {register.FIRSTNAME_USER}</td>
                            </tr>
                            {register.individualNames.map((name, index) => (
                                <tr key={index}>
                                    <td className=''>{name}</td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageRegistered;