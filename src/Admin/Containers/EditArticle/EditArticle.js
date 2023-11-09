import React, { useEffect, useState } from 'react';
import './_EditArticle.scss';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BtnToAdmin from '../../Components/BtntoAdmin/BtnToAdmin';

const EditArticle = () => {

    const role = useSelector((state) => state.role);
    const param = useParams();
    const idArticle = param.idArticle;
    const navigate = useNavigate();
    const [image, setImage] = useState('');
    const [errorImage, setErrorImage] = useState('');
    const [error, setError] = useState({});
    const [dataArticle, setDataArticle] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (role !== 'admin') {
            navigate('/');
        }
    }, [navigate, role]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/getArticle/${idArticle}`);
                console.log(response.data);
                setDataArticle(response.data);
                setTitle(response.data[0].TITLE_ARTICLE)
                setContent(response.data[0].CONTENT_ARTICLE)
            } catch (error) {
                console.error("Erreur lors de la récupération des données: ", error);
            }
        }
        fetchData();
    }, [idArticle]);


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(image);

        let nameImage;

        if (title.trim() === '') {
            setError({ ...error, title: 'Le titre est obligatoire' });
        }

        if (content.trim() === '') {
            setError({ ...error, content: "Le contenu de l'article est obligatoire" });
        }

        if (title.trim() === '' || content.trim() === '') {
            return;
        }

        if (image !== '') {
            nameImage = image.name;
            if (image) {
                const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
                if (!allowedFormats.includes(image.type)) {
                    setErrorImage('Format de fichier non pris en charge.');
                    return; // Arrêtez le traitement
                }
            }

            if (image) {
                const maxSizeInBytes = 2 * 1024 * 1024; // 2 Mo en octets
                if (image.size > maxSizeInBytes) {
                    setErrorImage('La taille du fichier dépasse la limite maximale (2 Mo).');
                    return; // Arrêtez le traitement
                }
            }
            setErrorImage('');
        }

        try {
            let data = {};
            const formData = new FormData();
            formData.append('image', image);

            if (image !== '') {
                const response = await axios.post(`/updateImg/${idArticle}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response.data);
                data = { title, content, nameImage };
            } else {
                data = { title, content }
            }

            const response2 = await axios.put(`/updateArticle/${idArticle}`, data);
            console.log(response2.data);

            if (response2.data) {
                navigate('/admin/articles');
            }

        } catch (error) {
            console.error(error);
        }

    }


    return (
        <div className='EditArticle container'>
            <BtnToAdmin />
            <h1>Editer votre article :</h1>
            <form onSubmit={handleSubmit} className='form-editArticle mx-auto mt-5'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Titre de l'article:</label>
                    <input type="text" className="form-control" id="title" name='title' onChange={(e) => setTitle(e.target.value)} value={title} />
                    {error.title &&
                        <span style={{ color: 'red' }}>
                            {error.title}
                        </span>
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Contenu de l'article:</label>
                    <textarea className="form-control textarea-custom" id="content" name="content" onChange={(e) => setContent(e.target.value)} value={content}
                    ></textarea>
                    {error.content &&
                        <span style={{ color: 'red' }}>
                            {error.content}
                        </span>
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Modifier l'image:</label>
                    <input type="file" className="form-control" id="image" name='image' onChange={handleFileChange} />
                    <span style={{ color: 'red' }}>
                        {errorImage}
                    </span>
                </div>
                {dataArticle[0] && (
                    <div className='text-center'>
                        <img className='img-article' src={`/images/articles/${dataArticle[0].ID_ARTICLE}/${dataArticle[0].IMG_ARTICLE}`} alt={dataArticle[0].IMG_ARTICLE} />
                    </div>
                )}
                <div className='text-center mt-3'>
                    <button type="submit" className="btn btn-primary radius50">Modifier</button>
                </div>
            </form>
        </div>
    );
};

export default EditArticle;