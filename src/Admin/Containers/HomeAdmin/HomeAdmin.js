import React, { useEffect } from 'react';
import './_HomeAdmin.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HomeAdmin = () => {
    const role = useSelector((state) => state.role);
    const navigate = useNavigate();

    useEffect(() => {
        if (role !== 'admin') {
            navigate('/');
        }
    }, [navigate, role])

    return (
        <div className='HomeAdmin mt-5'>
            <Link to='/admin/users'><button type="button" className="btn btn-primary mt-3 btn-admin radius50">Gérer les utilisateurs</button></Link>
            <Link to='/admin/createEvent'><button type="button" className="btn btn-primary mt-3 btn-admin radius50">Créer un évènement</button></Link>
            <Link to='/admin/Event'><button type="button" className="btn btn-primary mt-3 btn-admin radius50">Gérer les évènements</button></Link>
            <Link to='/admin/createArticle'><button type="button" className="btn btn-primary mt-3 btn-admin radius50">Créer un Article</button></Link>
            <Link to='/admin/articles'><button type="button" className="btn btn-primary mt-3 btn-admin radius50">Gérer les Articles</button></Link>
        </div>

    );
};

export default HomeAdmin;