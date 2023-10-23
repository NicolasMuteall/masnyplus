import axios from 'axios';
import './_Articles.scss';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Articles = () => {

    const role = useSelector((state) => state.role);
    const navigate = useNavigate();
    const [dataArticle, setDataArticle] = useState([]);
    const [expandedEvents, setExpandedEvents] = useState({});

    useEffect(() => {
        if (role !== 'admin') {
            navigate('/');
        }
    }, [navigate, role])

    const fetchData = async () => {
        try {
            const response = await axios.get('/getArticles');
            console.log(response.data);
            setDataArticle(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des données: ", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const toggleArticle = (event) => {
        setExpandedEvents({
            ...expandedEvents,
            [event.ID_EVENT]: !expandedEvents[event.ID_EVENT]
        });
    };

    const handleDelete = (idArticle) => {
        axios.delete(`/deleteArticle/${idArticle}`)
            .then((response) => {
                if (response.data === true) {
                    fetchData();
                };
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression de l'utilisateur :", error);
            });
    }

    return (
        <div className='Articles-Admin'>
            <h1 className='mt-5'>Gérer les articles</h1>
            <div className='container'>
                {dataArticle.map(article => (
                    <div className='div-article mt-3' onClick={() => { toggleArticle(article) }} key={article.ID_ARTICLE} >
                        <h4 className='text-center'>{article.TITLE_ARTICLE}</h4>
                        {expandedEvents[article.ID_EVENT] && (
                            <div className='body-article'>
                                <img className='img-article' src={`/images/articles/${article.ID_ARTICLE}/${article.IMG_ARTICLE}`} alt={article.IMG_ARTICLE} />
                                <p className='ms-2 text-justify content-article'>{article.CONTENT_ARTICLE}</p>
                                <div className='btn-modif'>
                                    <Link to={`/admin/editArticle/${article.ID_ARTICLE}`}><button className='btn btn-primary'>Modifier</button></Link>
                                    <button className='btn btn-danger ms-1' onClick={() => { handleDelete(article.ID_ARTICLE) }}>Supprimer</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Articles;