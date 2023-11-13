import React, { useState } from 'react';
import './_Home.scss';
import Carousel from '../../Components/Carousel/Carousel';
import mosaique from '../../assets/mosaique.jpg';

const Home = () => {

    const [faq1, setFaq1] = useState(false);
    const [faq2, setFaq2] = useState(false);
    const [faq3, setFaq3] = useState(false);

    return (
        <div className='Home container mt-5 mb-3'>
            <main className='mb-5'>
                <div className='div-img'>
                    <div className='replace-img'>
                        <img src={mosaique} alt="mosaique" />
                    </div>
                </div>
                <div className='p-2 ms-2'>
                    <h1>Masny Plus</h1>
                    <p className='presentation'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, cum voluptatibus magnam, veritatis harum pariatur dolorem reiciendis praesentium molestias velit rerum sit sequi exercitationem possimus assumenda! Voluptas expedita eaque voluptates.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium perspiciatis, iure nulla ad sint doloribus eum eligendi maxime in? Doloribus odio ab tempore vitae veniam nesciunt molestiae similique possimus repudiandae.
                    </p>
                </div>
            </main>

            <h3>FAQ</h3>
            <aside className='faq border rounded p-3'>
                <div className='text-center'>
                    <div className='faq-headers'>
                        <h6 className='fw-bold'>Qui sommes-nous ?</h6>
                        {faq1 === false ? (
                            <button className='btn btn-primary btn-rounded btn-moins' onClick={() => { setFaq1(true) }}>+</button>
                        ) : (
                            <button className='btn btn-secondary btn-rounded btn-moins' onClick={() => { setFaq1(false) }}>-</button>
                        )}
                    </div>
                    {faq1 &&
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur odio similique, velit inventore explicabo reprehenderit quia iusto qui quaerat esse alias corrupti iure perspiciatis unde ut consequatur repellendus. Minus, illo.</p>
                    }
                    <hr />
                </div>

                <div className='text-center'>
                    <div className='faq-headers'>
                        <h6 className='fw-bold'>Quels évènements organisons-nous ?</h6>
                        {faq2 === false ? (
                            <button className='btn btn-primary btn-rounded btn-moins' onClick={() => { setFaq2(true) }}>+</button>
                        ) : (
                            <button className='btn btn-secondary btn-rounded btn-moins' onClick={() => { setFaq2(false) }}>-</button>
                        )}
                    </div>
                    {faq2 &&
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur odio similique, velit inventore explicabo reprehenderit quia iusto qui quaerat esse alias corrupti iure perspiciatis unde ut consequatur repellendus. Minus, illo.</p>
                    }
                    <hr />
                </div>

                <div className='text-center'>
                    <div className='faq-headers'>
                        <h6 className='fw-bold'>Nos tarifs ?</h6>
                        {faq3 === false ? (
                            <button className='btn btn-primary btn-rounded btn-moins' onClick={() => { setFaq3(true) }}>+</button>
                        ) : (
                            <button className='btn btn-secondary btn-rounded btn-moins' onClick={() => { setFaq3(false) }}>-</button>
                        )}
                    </div>
                    {faq3 &&
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur odio similique, velit inventore explicabo reprehenderit quia iusto qui quaerat esse alias corrupti iure perspiciatis unde ut consequatur repellendus. Minus, illo.</p>
                    }
                </div>
            </aside>

            <Carousel />
        </div>
    );
};

export default Home;