import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Containers/Home/Home';
import SignUp from '../Containers/SignUp/SignUp';
import Login from '../Containers/Login/Login';
import Navbar from '../Components/Navbar/Navbar';
import HomeAdmin from '../Admin/Containers/HomeAdmin/HomeAdmin';
import Users from '../Admin/Containers/Users/Users';
import CreateEvent from '../Admin/Containers/CreateEvent/CreateEvent';
import ManageEvent from '../Admin/Containers/ManageEvent/ManageEvent';

const Router = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={< Home />} />
                <Route path='/signUp' element={< SignUp />} />
                <Route path='/login' element={< Login />} />
                <Route path='/home' element={< Home />} />
                <Route path='/home' element={< Home />} />
                <Route path='/admin' element={< HomeAdmin />} />
                <Route path='/admin/users' element={< Users />} />
                <Route path='/admin/createEvent' element={< CreateEvent />} />
                <Route path='/admin/manageEvent' element={< ManageEvent />} />
            </Routes>
        </div>
    );
};

export default Router;