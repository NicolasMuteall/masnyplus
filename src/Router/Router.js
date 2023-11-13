import React from 'react';
import './_Router.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
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
import EditArticle from '../Admin/Containers/EditArticle/EditArticle';
import Blog from '../Containers/Blog/Blog';
import UpdateUser from '../Containers/UpdateUser/UpdateUser';
import ForgetPassword from '../Containers/ForgetPassword/ForgetPassword';
import ResetPassword from '../Containers/ResetPassword.js/ResetPassword';
import Page404 from '../Containers/Page404/Page404';
import Footer from '../Components/Footer/Footer';

const Router = () => {
    return (
        <>
            <Navbar />
            <div className='main-container'>
                <Routes>
                    <Route path='/' element={< Home />} />
                    <Route path='/signUp' element={< SignUp />} />
                    <Route path='/login' element={< Login />} />
                    <Route path='/events' element={< Event />} />
                    <Route path='/event/:id' element={< RegisterEvent />} />
                    <Route path='/admin' element={< HomeAdmin />} />
                    <Route path='/admin/users' element={< Users />} />
                    <Route path='/admin/createEvent' element={< CreateEvent />} />
                    <Route path='/admin/Event' element={< ManageEvent />} />
                    <Route path='/admin/manageRegistered/:eventId' element={< ManageRegistered />} />
                    <Route path='/admin/createArticle' element={< CreateArticle />} />
                    <Route path='/admin/articles' element={< Articles />} />
                    <Route path='/admin/editArticle/:idArticle' element={< EditArticle />} />
                    <Route path='/blog' element={< Blog />} />
                    <Route path='/updateUser' element={< UpdateUser />} />
                    <Route path='/forgetPassword' element={< ForgetPassword />} />
                    <Route path='/resetPassword/:token' element={< ResetPassword />} />
                    <Route path='/404' element={< Page404 />} />
                    <Route path="*" element={<Navigate to='/404' />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
};

export default Router;