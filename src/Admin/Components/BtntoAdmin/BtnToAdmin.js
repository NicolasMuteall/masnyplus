import React from 'react';
import './_BtnToAdmin.scss';
import { useNavigate } from 'react-router-dom';

const BtnToAdmin = () => {

    const navigate = useNavigate();

    return (
        <div className='mb-3'>
            <img onClick={() => { navigate('/admin') }} className='pointer' width="48" height="48" src="https://img.icons8.com/color/48/000000/circled-left--v1.png" alt="circled-left--v1" />
        </div>
    );
};

export default BtnToAdmin;