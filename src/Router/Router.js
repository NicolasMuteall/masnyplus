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
import Event from '../Containers/Event/Event';
import RegisterEvent from '../Containers/RegisterEvent/RegisterEvent';
import ManageRegistered from '../Admin/Containers/ManageRegistered/ManageRegistered';
import CreateArticle from '../Admin/Containers/CreateArticle/CreateArticle';
import Articles from '../Admin/Containers/Articles/Articles';

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
                <Route path='/events' element={< Event />} />
                <Route path='/event/:id' element={< RegisterEvent />} />
                <Route path='/admin' element={< HomeAdmin />} />
                <Route path='/admin/users' element={< Users />} />
                <Route path='/admin/createEvent' element={< CreateEvent />} />
                <Route path='/admin/Event' element={< ManageEvent />} />
                <Route path='/admin/manageRegistered/:eventId' element={< ManageRegistered />} />
                <Route path='/admin/createArticle' element={< CreateArticle />} />
                <Route path='/admin/articles' element={< Articles />} />
            </Routes>
        </div>
    );
};

export default Router;