import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Containers/Home/Home';

const Router = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={< Home />} />
            </Routes>
        </div>
    );
};

export default Router;