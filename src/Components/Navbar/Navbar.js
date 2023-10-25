import React, { useEffect, useState } from 'react';
import './_Navbar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logout from '../../assets/logout.png';
import axios from 'axios';
import { setLogin } from '../../store';

const Navbar = () => {

    const role = useSelector((state) => state.role);
    const token = useSelector((state) => state.token);
    const [connected, setConnected] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [menuUser, setMenuUser] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/verify-token', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                //console.log(response.data);
                if (!response.data) {
                    setConnected(false);
                    dispatch(setLogin(false));
                } else {
                    setConnected(true);
                    dispatch(setLogin(true));
                }
            })
            .catch(error => {
                // Token invalide ou expiré, l'utilisateur n'est pas authentifié
                console.log('TOKEN INVALIDE', error)
            });
    }, [token, navigate, dispatch])

    const handleClickLogout = () => {
        localStorage.clear();
        window.location.reload();
    }

    const handleSvgClick = () => {
        setMenuUser(true);
    }

    const handleMouseLeave = () => {
        if (menuUser) {
            setMenuUser(false);
        }
    }

    return (
        <div className='Navbar'>
            <Link to='/'><div className='logo pointer'>Masny Plus</div></Link>
            <ul className='menu'>
                <Link to='/events'><li className='pointer'>Evènements</li></Link>
                <Link to='/blog'><li className='pointer'>Blog</li></Link>
                {role === 'admin' && (
                    <Link to='/admin'><li className='pointer'>Administration</li></Link>
                )}
            </ul>
            <div className='div-svg'>
                <div onMouseLeave={handleMouseLeave} className='svg-user'>
                    <svg onMouseEnter={handleSvgClick} width="24" className='pointer' height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 11.6813C9.05076 11.6813 6.65946 9.29001 6.65946 6.34073C6.65946 3.39146 9.05076 1.00015 12 1.00015C14.9493 1.00015 17.3406 3.39146 17.3406 6.34073C17.3406 9.29001 14.9493 11.6813 12 11.6813ZM12 2.36661C9.8137 2.36661 8.02591 4.1544 8.02591 6.34073C8.02591 8.52707 9.8137 10.3149 12 10.3149C14.1864 10.3149 15.9742 8.52707 15.9742 6.34073C15.9742 4.1544 14.1864 2.36661 12 2.36661Z" fill="#1C1C1C"></path><path d="M19.9597 23.0002C19.5839 23.0002 19.2764 22.6927 19.2764 22.3169C19.2764 17.8418 16.0083 14.2093 12 14.2093C7.99175 14.2093 4.72364 17.8418 4.72364 22.3169C4.72364 22.6927 4.41618 23.0002 4.04041 23.0002C3.66463 23.0002 3.35718 22.6927 3.35718 22.3169C3.35718 17.0902 7.22881 12.8428 12 12.8428C16.7713 12.8428 20.6429 17.0902 20.6429 22.3169C20.6429 22.6927 20.3354 23.0002 19.9597 23.0002Z" fill="#1C1C1C"></path></svg>
                    {menuUser && (
                        <div className='menu-user border text-center p-1'>
                            {!connected ? (
                                <div>
                                    <Link to='/login'><div className='link-user'>Connexion</div></Link>
                                    <hr />
                                    <Link to='/signUp'><div className='link-user'>Inscription</div></Link>
                                </div>
                            ) : (
                                <div>
                                    <Link to='/updateUser'><div className='link-user'>Modifier infos</div></Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {connected && (
                    <div className='pointer' onClick={handleClickLogout}>
                        <img className='logout' src={logout} alt="logout" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;