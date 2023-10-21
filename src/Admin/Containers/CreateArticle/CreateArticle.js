import React, { useEffect, useState } from 'react';
import './_CreateArticle.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CreateArticle = () => {

    const role = useSelector((state) => state.role);
    const navigate = useNavigate();
    const [image, setImage] = useState('');
    const [errorImage, setErrorImage] = useState('');

    useEffect(() => {
        if (role !== 'admin') {
            navigate('/');
        }
    }, [navigate, role])

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };

    const formik = useFormik({
        initialValues: {
            title: "",
            content: "",
        },
        validationSchema: Yup.object().shape({
            title: Yup.string()
                .required("L'article doit avoir un titre"),
            content: Yup.string()
                .required("L'article doit avoir un contenu"),
        }),
        onSubmit: async (values) => {
            //console.log(values, image);
            const { title, content } = values;
            let nameImage

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
            } else {
                setErrorImage('Aucune image selectionnée.')
                return;
            }

            try {
                const formData = new FormData();
                formData.append('image', image);

                const response = await axios.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response.data);

                const response2 = await axios.post('/addArticle', { title, content, nameImage });
                console.log(response2.data);

                if (response2.data) {
                    navigate('/admin');
                }

            } catch (error) {
                console.error(error);
            }
        }
    });

    return (
        <div className='CreateArticle'>
            <h1 className='mt-5'>Créer un nouvel article</h1>
            <form onSubmit={formik.handleSubmit} className='w-50 mx-auto mt-5'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Titre de l'article:</label>
                    <input type="text" className="form-control" id="title" name='title' onChange={formik.handleChange} value={formik.values.title} />
                    {formik.errors.title &&
                        <span style={{ color: 'red' }}>
                            {formik.errors.title}
                        </span>
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Contenu de l'article:</label>
                    <textarea className="form-control" id="content" name="content" onChange={formik.handleChange} value={formik.values.content}
                    ></textarea>
                    {formik.errors.content &&
                        <span style={{ color: 'red' }}>
                            {formik.errors.content}
                        </span>
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Ajouter une image:</label>
                    <input type="file" className="form-control" id="image" name='image' onChange={handleFileChange} />
                    <span style={{ color: 'red' }}>
                        {errorImage}
                    </span>
                </div>
                <div className='text-center mt-3'>
                    <button type="submit" className="btn btn-primary" onClick={formik.handleSubmit}>Créer</button>
                </div>
            </form>
        </div>
    );
};

export default CreateArticle;