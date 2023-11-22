import React, { useEffect, useState } from 'react';
import './_Users.scss';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BtnToAdmin from '../../Components/BtntoAdmin/BtnToAdmin';

const Users = () => {

    const role = useSelector((state) => state.role);
    const navigate = useNavigate();
    const [usersData, setUsersData] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        if (role !== 'admin') {
            navigate('/login');
        }
    }, [navigate, role])

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("/users");
            console.log(response.data);
            setUsersData(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des données: ", error);
        }
    }

    const handleClickDelete = (userId) => {
        axios.delete(`http://localhost:3001/deleteUser/${userId}`)
            .then((response) => {
                if (response.data === true) {
                    fetchData();
                    setModal(false);
                };
            })
            .catch((error) => {
                console.error("Erreur lors de la suppression de l'utilisateur :", error);
            });
    }

    return (
        <>
            <div className='container-fluid mt-3'>
                <BtnToAdmin />
                <h1>Gerer les utilisateurs</h1>
            </div>

            <div className='Users text-center'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td className='fw-bold'>Nom</td>
                            <td className='fw-bold'>Prénom</td>
                            <td className='fw-bold'>Email</td>
                        </tr>
                    </thead>
                    <tbody>
                        {usersData.map(user => (
                            <tr onClick={() => { setModalData(user); setModal(true) }} className='pointer' key={user.ID_USER}>
                                <td className=''>{user.NAME_USER}</td>
                                <td className=''>{user.FIRSTNAME_USER}</td>
                                <td className=''>{user.MAIL_USER}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {modal && (
                    <div className="page-shadow">
                        <div className='modal-user border text-center rounded'>
                            <span onClick={() => { setModal(false) }} className="material-symbols-outlined close">
                                close
                            </span>
                            <div className='header-modal fw-bold mt-1'>Informations de l'utilisateur</div>
                            <div className='mt-3 body-modal'>
                                <span>{modalData.NAME_USER}</span>
                                <span>{modalData.FIRSTNAME_USER}</span>
                                <span>{modalData.MAIL_USER}</span>
                                <span>{modalData.CITY_USER}</span>
                                <span>{moment(modalData.CREATED_AT).format('DD/MM/YYYY')} à {moment(modalData.CREATED_AT).format('HH:mm')}</span>
                            </div>
                            <button className='btn btn-danger mt-3 radius50' onClick={() => { handleClickDelete(modalData.ID_USER) }}>Supprimer</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Users;