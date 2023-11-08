import React, { useEffect, useState } from 'react';
import './_Blog.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';
import poubelle from '../../assets/poubelle.png';

const Blog = () => {

    const role = useSelector((state) => state.role);
    const connected = useSelector((state) => state.login);
    const userId = useSelector((state) => state.idUser);
    const [dataArticle, setDataArticle] = useState([]);
    const [expandedArticle, setExpandedArticle] = useState({});
    const [comments, setComments] = useState(Array(dataArticle.length).fill(''));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [articlesResponse, commentsResponse, likesResponse] = await Promise.all([
                    axios.get('/getArticles'),
                    axios.get('/getcomments'),
                    axios.get('/getLikes'),
                ]);

                const articles = articlesResponse.data;
                const comments = commentsResponse.data;
                const likes = likesResponse.data;

                const combinedData = articles.map((article) => ({
                    ...article,
                    comments: comments.filter((comment) => comment.ID_ARTICLE === article.ID_ARTICLE),
                    likes: likes.filter((like) => like.ID_ARTICLE === article.ID_ARTICLE),
                }));

                const combinedDataWithCount = combinedData.map((item) => ({
                    ...item,
                    numberOfComments: item.comments.length,
                    numberOfLikes: item.likes.length,
                    liked: item.likes.some((like) => like.ID_USER === userId)
                }));

                setDataArticle(combinedDataWithCount);
                console.log(combinedDataWithCount);

            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };
        fetchData();
    }, [userId]);

    const fetchData = async () => {
        try {
            const [articlesResponse, commentsResponse, likesResponse] = await Promise.all([
                axios.get('/getArticles'),
                axios.get('/getcomments'),
                axios.get('/getLikes'),
            ]);

            const articles = articlesResponse.data;
            const comments = commentsResponse.data;
            const likes = likesResponse.data;

            const combinedData = articles.map((article) => ({
                ...article,
                comments: comments.filter((comment) => comment.ID_ARTICLE === article.ID_ARTICLE),
                likes: likes.filter((like) => like.ID_ARTICLE === article.ID_ARTICLE),
            }));

            const combinedDataWithCount = combinedData.map((item) => ({
                ...item,
                numberOfComments: item.comments.length,
                numberOfLikes: item.likes.length,
                liked: item.likes.some((like) => like.ID_USER === userId)
            }));

            setDataArticle(combinedDataWithCount);
            console.log(combinedDataWithCount);

        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
    };

    const toggleComments = (event) => {
        setExpandedArticle({
            ...expandedArticle,
            [event.ID_ARTICLE]: !expandedArticle[event.ID_ARTICLE]
        });
    };

    const handleCommentChange = (e, index) => {
        const updatedComments = [...comments];
        updatedComments[index] = e.target.value;
        setComments(updatedComments);
    };

    const handleSubmit = (e, articleId) => {
        e.preventDefault();

        const data = {
            userId: userId,
            comment: comments[dataArticle.findIndex((article) => article.ID_ARTICLE === articleId)],
            articleId: articleId
        };
        console.log(data);

        axios.post('/addComment', data)
            .then(response => {
                console.log(response.data);
                const newComments = [...comments];
                newComments[dataArticle.findIndex((article) => article.ID_ARTICLE === articleId)] = '';
                setComments(newComments);
                fetchData();
            })
            .catch(error => {
                console.error('Erreur lors de l\'insertion', error);
            })
    }

    const deleteComment = (commentId) => {
        axios.delete(`/deleteComment/${commentId}`)
            .then(response => {
                console.log(response.data);
                fetchData();
            })
            .catch(error => {
                console.error('Erreur lors de la suppression du commentaire', error);
            })
    }

    const addLike = (articleId) => {
        if (connected) {
            const data = {
                userId: userId,
                articleId: articleId
            };
            axios.post('/addLike', data)
                .then(response => {
                    console.log(response.data);
                    fetchData();
                })
                .catch(error => {
                    console.error('Echec Like', error);
                })
        }
    }

    return (
        <div className='Blog container'>
            <h1 className='mt-5 text-start mb-5'>Actualités Masny Plus</h1>
            <div>
                {dataArticle.map((article, index) => (
                    <div className='div-article mt-3 mb-5' key={article.ID_ARTICLE} >
                        <h4 className='text-center'>{article.TITLE_ARTICLE}</h4>
                        <div className='body-article'>
                            <img className='img-article' src={`/images/articles/${article.ID_ARTICLE}/${article.IMG_ARTICLE}`} alt={article.IMG_ARTICLE} />
                            <p className='ms-2 text-justify content-article'>{article.CONTENT_ARTICLE}</p>
                        </div>
                        <hr />
                        <div className='footer-article'>
                            <div>
                                <svg onClick={() => { addLike(article.ID_ARTICLE) }} className="bouton pointer" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.67344 9.43701L8.02617 15.6017C8.28984 15.8575 8.63789 16 9 16C9.36211 16 9.71016 15.8575 9.97383 15.6017L16.3266 9.43701C17.3953 8.40286 18 6.95213 18 5.43563V5.22368C18 2.66938 16.2246 0.491461 13.8023 0.0712247C12.1992 -0.206497 10.568 0.337983 9.42188 1.52926L9 1.96777L8.57812 1.52926C7.43203 0.337983 5.80078 -0.206497 4.19766 0.0712247C1.77539 0.491461 0 2.66938 0 5.22368V5.43563C0 6.95213 0.604687 8.40286 1.67344 9.43701Z" fill={article.liked ? 'red' : 'white'} />
                                </svg>
                                <span className='ms-1'>{article.numberOfLikes !== 0 && article.numberOfLikes}</span>
                            </div>

                            <div>
                                <svg onClick={() => { toggleComments(article) }} className="bouton pointer" width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                    <path d="M18.3335 7.42857C18.3335 11.5321 14.3048 14.8571 9.33402 14.8571C8.0298 14.8571 6.79237 14.6286 5.67446 14.2179C5.25613 14.5286 4.57414 14.9536 3.76559 15.3107C2.92189 15.6821 1.90593 16 0.897006 16C0.668504 16 0.464609 15.8607 0.376724 15.6464C0.288838 15.4321 0.338054 15.1893 0.496248 15.025L0.506794 15.0143C0.51734 15.0036 0.531402 14.9893 0.552495 14.9643C0.591164 14.9214 0.650927 14.8536 0.72475 14.7607C0.868883 14.5821 1.06223 14.3179 1.25909 13.9893C1.61064 13.3964 1.9446 12.6179 2.01139 11.7429C0.956768 10.5286 0.334539 9.03929 0.334539 7.42857C0.334539 3.325 4.36321 0 9.33402 0C14.3048 0 18.3335 3.325 18.3335 7.42857Z" fill="white" />
                                </svg>
                                <span className='ms-1'>{article.numberOfComments !== 0 && article.numberOfComments}</span>
                            </div>
                        </div>
                        <div>
                            {expandedArticle[article.ID_ARTICLE] && (
                                <div>
                                    <hr />
                                    {connected && (
                                        <div>
                                            <form onSubmit={(e) => handleSubmit(e, article.ID_ARTICLE)}>
                                                <input type="text" placeholder='Ecrire un commentaire...' className="form-control" value={comments[index]}
                                                    onChange={(e) => handleCommentChange(e, index)} />
                                                <button type="submit" className="btn btn-primary radius50">Commenter</button>
                                            </form>
                                            <hr />
                                        </div>
                                    )}
                                    {article.comments && article.comments.map((comment) => (
                                        <div className='comment-div mb-2' key={comment.ID_COMMENT}>
                                            <div className='content-comment'>
                                                <span className='fw-bold'>{comment.FIRSTNAME_USER} {comment.NAME_USER}</span>
                                                <span>{comment.CONTENT_COMMENT}</span>
                                            </div>
                                            {(userId === comment.ID_USER || role === "admin") && (
                                                <img className='img-delete' src={poubelle} alt="poubelle" onClick={() => { deleteComment(comment.ID_COMMENT) }} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;