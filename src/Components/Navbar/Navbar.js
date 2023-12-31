import React, { useEffect, useState } from 'react';
import './_Navbar.scss';
import logo from '../../assets/logo-MasnyPlus.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setLogin } from '../../store';

const Navbar = () => {

    const role = useSelector((state) => state.role);
    const token = useSelector((state) => state.token);
    const [connected, setConnected] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [menuUser, setMenuUser] = useState(false);
    const [nav, setNav] = useState(false);

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
        <>
            <div className='Navbar mb-3'>
                <div className='p-1 menu-burger' onClick={() => { setNav(!nav) }}>
                    <svg width="42" height="42" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="48" fill="white" fillOpacity="0.01" />
                        <path d="M7.94977 11.9498H39.9498" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7.94977 23.9498H39.9498" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7.94977 35.9498H39.9498" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className='logo' onClick={() => { setNav(false) }}>
                    <Link to='/'>
                        <img className='pointer' src={logo} alt="logo Masny Plus" />
                        <span className='niconne fs-3 menu-name pointer'>Masny Plus</span>
                    </Link>
                </div>
                <ul className='menu hindenburg'>
                    <Link to='/events'><li className='pointer'>Evenements</li></Link>
                    <Link to='/blog'><li className='pointer'>Blog</li></Link>
                    {role === 'admin' && (
                        <Link to='/admin'><li className='pointer'>Administration</li></Link>
                    )}
                </ul>
                <div className='div-svg'>
                    <div onMouseLeave={handleMouseLeave} className='svg-user'>
                        <svg onMouseEnter={handleSvgClick} width="24" className='pointer' height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 11.6813C9.05076 11.6813 6.65946 9.29001 6.65946 6.34073C6.65946 3.39146 9.05076 1.00015 12 1.00015C14.9493 1.00015 17.3406 3.39146 17.3406 6.34073C17.3406 9.29001 14.9493 11.6813 12 11.6813ZM12 2.36661C9.8137 2.36661 8.02591 4.1544 8.02591 6.34073C8.02591 8.52707 9.8137 10.3149 12 10.3149C14.1864 10.3149 15.9742 8.52707 15.9742 6.34073C15.9742 4.1544 14.1864 2.36661 12 2.36661Z" fill="white"></path><path d="M19.9597 23.0002C19.5839 23.0002 19.2764 22.6927 19.2764 22.3169C19.2764 17.8418 16.0083 14.2093 12 14.2093C7.99175 14.2093 4.72364 17.8418 4.72364 22.3169C4.72364 22.6927 4.41618 23.0002 4.04041 23.0002C3.66463 23.0002 3.35718 22.6927 3.35718 22.3169C3.35718 17.0902 7.22881 12.8428 12 12.8428C16.7713 12.8428 20.6429 17.0902 20.6429 22.3169C20.6429 22.6927 20.3354 23.0002 19.9597 23.0002Z" fill="white"></path></svg>
                        {menuUser && (
                            <div className='menu-user border text-center p-1'>
                                {!connected ? (
                                    <div>
                                        <Link to='/login'><div onClick={() => { setNav(false) }} className='link-user'>Connexion</div></Link>
                                        <hr />
                                        <Link to='/signUp'><div onClick={() => { setNav(false) }} className='link-user'>Inscription</div></Link>
                                    </div>
                                ) : (
                                    <div>
                                        <Link to='/updateUser'><div onClick={() => { setNav(false) }} className='link-user'>Modifier infos</div></Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    {connected && (
                        <div className='pointer' onClick={handleClickLogout}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" className='logout'>
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2a9.985 9.985 0 0 1 8 4h-2.71a8 8 0 1 0 .001 12h2.71A9.985 9.985 0 0 1 12 22zm7-6v-3h-8v-2h8V8l5 4-5 4z" fill='white' />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
            {nav &&
                <nav className='nav-responsive'>
                    <Link to='/events'><div onClick={() => { setNav(false) }} className='pointer link-navResponsive'>Evènements</div></Link>
                    <hr />
                    <Link to='/blog'><div onClick={() => { setNav(false) }} className='pointer link-navResponsive'>Blog</div></Link>
                    {role === 'admin' && (
                        <>
                            <hr />
                            <Link to='/admin'><div onClick={() => { setNav(false) }} className='pointer link-navResponsive'>Administration</div></Link>
                        </>
                    )}
                </nav>
            }
        </>
    );
};

export default Navbar;