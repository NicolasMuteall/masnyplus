import React, { useEffect } from 'react';
import './_ManageRegistered.scss';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const ManageRegistered = () => {

    const role = useSelector((state) => state.role);
    const navigate = useNavigate();
    const param = useParams();
    const eventId = param.eventId;

    useEffect(() => {
        if (role !== 'admin') {
            navigate('/');
        }
    }, [navigate, role])

    return (
        <div className='ManageRegistered'>
            <h1>Liste des inscrits pour :</h1>
        </div>
    );
};

export default ManageRegistered;