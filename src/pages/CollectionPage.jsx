import React, {useCallback, useEffect, useState} from 'react';
import Moment from "react-moment";
import axios from "../utils/axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {useSelector, useDispatch} from "react-redux";
import {deleteCollection} from "../redux/features/collection/collectionSlice";
import {toast} from "react-toastify";

const CollectionPage = () => {
    const [collection, setCollection] = useState([])
    const {user} = useSelector(state => state.auth)
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchCollection = useCallback(async () => {
        const {data} = await axios.get(`/collection/${params.id}`)
        setCollection(data)
    }, [params.id])

    useEffect(() => {
        fetchCollection()
    }, [fetchCollection])

    const removeCollectionHandler = () => {
        try {
            dispatch(deleteCollection(params.id))
            navigate('/')
            toast('Collection was deleted')
        } catch (e) {
            console.log(e)
        }
    }

    if(!collection._id) {
        return (
            <div className='text-xl text-center text-black py-10'>
                No collection with that id
            </div>
        )
    }

    const updateCollectionHandler = () => {
        navigate(`/collection/${params.id}/edit`)
    }

    return (
        <div>
            <button className="flex justify-center items-center bg-gray-600 rounded-sm text-white py-2 px-4">
                <Link to={'/'}>
                    Back
                </Link>
            </button>

            <div className="flex justify-center items-center">


                <div className="w-1/2 flex flex-col bg-gray-600 p-1 rounded-md hover:scale-105">
                    <div className={collection.imgUrl ? 'flex rouded-sm h-80' : 'flex rounded-sm'}>
                        {collection.imgUrl && (
                            <img src={`http://localhost:5000/${collection.imgUrl}`}
                                 alt='img' className='object-cover w-full'/>
                        )}
                        {!collection.imgUrl && (
                            <img src={`http://localhost:5000/default.jfif`}
                                 alt='img' className='object-cover w-full'/>
                        )}
                    </div>
                    <div className="flex justify-center gap-8 items-center pt-2">
                        <div className="text-s text-black opacity-50">{collection.username}</div>
                        <div className="text-s text-black opacity-50">
                            <Moment date={collection.createdAt} format='D MMM YYYY'/>
                        </div>
                        <div className="text-s text-black opacity-50">{collection.theme}</div>
                    </div>
                    <div className="text-white text-xl">{collection.title}</div>
                    <p className="text-white text-s opacity-60 pt-4"><ReactMarkdown children={collection.description}/>
                    </p>
                    {(user?._id === collection.author || user?.isAdmin) && (
                        <div className='flex gap-5 ml-auto'>
                            <button onClick={updateCollectionHandler}
                                    className='text-black text-right bg-green-300 px-1 py-1'>Update</button>
                            <button onClick={removeCollectionHandler}
                                    className='text-black text-right bg-red-500 px-1 py-1'>Delete</button>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    );
};

export default CollectionPage;