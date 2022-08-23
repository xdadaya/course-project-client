import React, {useCallback, useEffect, useState} from 'react';
import Moment from "react-moment";
import axios from "../utils/axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {deleteCollection} from "../redux/features/collection/collectionSlice";
import {toast} from "react-toastify";
import {ThemeContext} from "../components/ThemeContext";
import MDEditor from '@uiw/react-md-editor';
import {useTranslation} from "react-i18next";

const CollectionPage = () => {
    const { theme, setTheme } = React.useContext(ThemeContext);
    const [collection, setCollection] = useState([])
    const {user} = useSelector(state => state.auth)
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {t} = useTranslation()

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

    if (!collection._id) {
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
        <div className="py-3 px-2 text-black dark:text-white" data-color-mode={theme}>
            <Link to={'/'}>
                <button type="button"
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Back
                </button>
            </Link>

            <div className="flex justify-center items-center py-3 max-w-[400px]">
                <div className="flex items-center justify-center max-w-[360px] mx-2">
                    <div
                        className="flex flex-col dark:bg-gray-600 p-1 rounded-md hover:scale-105 border dark:border-gray-700">
                        <div className={collection.imgUrl ? 'flex rouded-sm h-80' : 'flex rounded-sm'}>
                            {collection.imgUrl && (
                                <img src={`http://192.168.31.20:5000/${collection.imgUrl}`}
                                     alt='img' className='object-cover w-full'/>
                            )}
                            {!collection.imgUrl && (
                                <img src={`http://192.168.31.20:5000/default.jfif`}
                                     alt='img' className='object-cover w-full'/>
                            )}
                        </div>
                        <div className="flex justify-center gap-8 items-center pt-2">
                            <div className="text-s opacity-50">{collection.username}</div>
                            <div className="text-s opacity-50">
                                <Moment date={collection.createdAt} format='D MMM YYYY'/>
                            </div>
                            <div className="text-s opacity-50">{collection.theme}</div>
                        </div>
                        <div className="text-xl">{collection.title}</div>
                        <div className="text-s opacity-60 pt-4">
                            <MDEditor.Markdown source={collection.description}/>
                        </div>
                        {(user?._id === collection.author || user?.isAdmin) && (
                            <div className='flex gap-5 ml-auto mt-2'>
                                <button type="button" onClick={updateCollectionHandler}
                                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                    {t("edit")}
                                </button>
                                <button type="button" onClick={removeCollectionHandler}
                                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                    {t("delete")}
                                </button>
                            </div>
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollectionPage;