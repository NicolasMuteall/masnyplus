import React from 'react';
import './_Footer.scss';

const Footer = () => {
    return (
        <div className='Footer mt-3'>
            <div>
                <div className='mb-2'>
                    <img className='location' src="https://img.icons8.com/ios-filled/50/000000/marker.png" alt="marker" />
                    <span>50, Rue Mousseron</span>
                    <div className='ms-3'>59176 Masny</div>
                </div>
            </div>
            <div>
                <div className='mb-2'>
                    <img className='email' src="https://img.icons8.com/ios-filled/50/000000/mail.png" alt="mail" />
                    <span className='ms-2'>masny-plus@gmail.com</span>
                </div>
                <div className='mb-2'>
                    <img className='telephone' src="https://img.icons8.com/ios-filled/50/phone.png" alt="phone" />
                    <span className='ms-2'>06 80 63 25 19</span>
                </div>
            </div>
        </div>
    );
};

export default Footer;