import React, { useEffect, useState } from 'react';
import './_ResetPassword.scss';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ResetPassword = () => {

    const param = useParams();
    const token = param.token;
    const [idUser, setIdUser] = useState('');
    const [error, setError] = useState(false);
    const connected = useSelector((state) => state.login);
    const navigate = useNavigate();

    useEffect(() => {
        if (connected) {
            navigate('/');
        }
    }, [connected, navigate]);

    useEffect(() => {
        axios.get('http://localhost:3001/verify-token', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                //console.log(response.data);
                if (!response.data) {
                    setError(true);
                }
                //console.log(response.data.userId);
                setIdUser(response.data.userId)
            })
            .catch(error => {
                // Token invalide ou expiré, l'utilisateur n'est pas authentifié
                console.log('TOKEN INVALIDE', error)
            });
    }, [token]);

    return (
        <div className='ResetPassword'>
            {error ? (
                <h1>Lien Invalide ou expiré</h1>
            ) : (
                <div>
                    <h1 className='text-center'>Réinitialisation du mot de passe</h1>
                    <form className='w-25 mx-auto'>
                        <div className="mb-3">
                            <label htmlFor="Input" className="form-label">
                                Nouveau mot de passe:
                            </label>
                            <input type="password" className="form-control inputReset" id="mdp" name="mdp" autoComplete="off" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Input" className="form-label">
                                Confirmer nouveau mot de passe:
                            </label>
                            <input type="password" className="form-control inputReset" id="confirmMdp" name="ConfirmMdp" autoComplete="off" />
                        </div>

                        <div className='text-center'>
                            <button className="btn btn-primary mt-1" type="submit">
                                Réinitialiser
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ResetPassword;