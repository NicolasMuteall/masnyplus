import React, { useEffect } from 'react';
import './_Home.scss';

const Home = () => {
    useEffect(() => {
        localStorage.clear();
        console.log(localStorage);
    }, [])
    return (
        <div className='Home'>
            <h1>HOME</h1>
        </div>
    );
};

export default Home;