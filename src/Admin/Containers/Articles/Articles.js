import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Articles = () => {

    const role = useSelector((state) => state.role);
    const navigate = useNavigate();

    useEffect(() => {
        if (role !== 'admin') {
            navigate('/');
        }
    }, [navigate, role])

    useEffect(() => {
        axios.get('/getArticles')
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.error('Erreur lors de la récupération', err);
            })
    }, [])

    return (
        <div className='Articles-Admin'>

        </div>
    );
};

export default Articles;