import React from 'react';
import './_Page404.scss';
import erreur404 from '../../assets/erreur404.png';
import { Link } from 'react-router-dom';

const Page404 = () => {
    return (
        <div className='Page404 text-center'>
            <img src={erreur404} alt="erreur404" />
            <h1>Page non trouvée</h1>
            <p>La page que vous tentez d'afficher n'existe pas ou une autre erreur s'est produite.</p>
            <p>Vous pouvez revenir à la <Link to='/'><span className='blue'>page d'accueil</span></Link></p>
        </div>
    );
};

export default Page404;