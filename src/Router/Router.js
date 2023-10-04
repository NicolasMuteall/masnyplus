import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Containers/Home/Home';
import SignUp from '../Containers/SignUp/SignUp';
import Login from '../Containers/Login/Login';

const Router = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={< Login />} />
                <Route path='/signUp' element={< SignUp />} />
                <Route path='/login' element={< Login />} />
                <Route path='/home' element={< Home />} />
            </Routes>
        </div>
    );
};

export default Router;