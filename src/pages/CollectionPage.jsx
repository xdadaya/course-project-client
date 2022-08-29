import React, {useCallback, useEffect, useState} from 'react';
import Moment from "react-moment";
import axios from "../utils/axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {deleteCollection} from "../redux/features/collection/collectionSlice";
import {ThemeContext} from "../components/ThemeContext";
import MDEditor from '@uiw/react-md-editor';
import {useTranslation} from "react-i18next";
import {API_URL} from "../config";
import {DataGrid} from "@mui/x-data-grid";
import moment from "moment";
import {deleteItemInCollection, dislikeItem, getItemsByCollectionId, likeItem} from "../redux/features/item/itemSlice";
import {AiOutlineLike, AiFillLike, AiFillEdit, AiFillDelete} from "react-icons/ai";

const CollectionPage = () => {
    const {theme} = React.useContext(ThemeContext);
    const [collection, setCollection] = useState([])
    const {user} = useSelector(state => state.auth)
    const {items} = useSelector(state => state.item)
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {t} = useTranslation()

    const fetchCollection = useCallback(async () => {
        const {data} = await axios.get(`/collection/${params.id}`)
        setCollection(data)
    }, [params.id])

    const columns = [
        {
            field: 'id', headerName: 'ID', type: 'string', width: 300,
            renderCell: (params) => (
                <Link to={`/item/${params.value}`}>{params.value}</Link>
            )
        },
        {
            field: 'title', headerName: 'Title', type: 'string', width: 150
        },
        {
            field: 'createdAt', headerName: 'createDate', type: 'string', width: 170,
            valueFormatter: params => moment(params?.value).format("DD/MM/YYYY hh:mm"),
        },
        {
            field: 'likes', headerName: 'Like', align: 'center', width: 100,
            renderCell: (params) => (
                <p className='flex items-center text-xl justify-between'>
                    {params.value.length}
                    <span hidden={!user}>{params.value.includes(user?._id) ?
                        <AiFillLike onClick={() => removeLikeHandler(params.id)}/> :
                        <AiOutlineLike onClick={() => likeHandler(params.id)}/>
                    }</span>
                </p>
            )
        },
        {
            field: 'editButton', headerName: 'Edit', hide: !(user?._id === collection.author || user?.isAdmin), width: 60,
            renderCell: (cellValues) => (
                <button type="button" onClick={() => navigate(`/item/${cellValues.id}/edit`)}
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    <AiFillEdit/>
                </button>
            )
        },
        {
            field: 'buttonDelete', headerName: 'Delete', hide: !(user?._id === collection.author || user?.isAdmin), width: 60,
            renderCell: (cellValues) => (
                <button type="button" onClick={() => deleteItemHandler(cellValues.id)}
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    <AiFillDelete/>
                </button>
            )
        }

    ];

    const likeHandler = (id) => {
        try {
            dispatch(likeItem({id}))
        } catch (e) {
            console.log(e)
        }
    }

    const removeLikeHandler = (id) => {
        try {
            dispatch(dislikeItem({id}))
        } catch (e) {
            console.log(e)
        }
    }

    const deleteItemHandler = (id) => {
        try {
            dispatch(deleteItemInCollection(id))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchCollection()
        dispatch(getItemsByCollectionId(params.id))
    }, [fetchCollection, dispatch])

    const removeCollectionHandler = () => {
        try {
            dispatch(deleteCollection(params.id))
            navigate('/')
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
        <div className="text-black dark:text-white mt-2" data-color-mode={theme}>
            <Link to={'/'}>
                <button type="button"
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Back
                </button>
            </Link>

            <div className='flex-nowrap mx-auto sm:flex-wrap sm:flex px-2 py-5'>
                <div className="max-w-lg sm:w-full text-lg text-center mx-auto">
                    <div
                        className="flex flex-col dark:bg-gray-600 p-1 rounded-md hover:scale-105 border dark:border-gray-700">
                        <div className={collection.imgUrl ? 'flex rouded-sm h-80' : 'flex rounded-sm'}>
                            {collection.imgUrl && (
                                <img src={`${API_URL}${collection.imgUrl}`}
                                     alt='img' className='object-cover w-full'/>
                            )}
                            {!collection.imgUrl && (
                                <img src={`${API_URL}default.jfif`}
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
                                <Link to={`/collection/${params.id}/add`}>
                                    <button type="button"
                                            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                        Add item
                                    </button>
                                </Link>
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
                <div className='w-full sm:w-full'>
                    <div style={{height: "90vh"}} className="px-3">
                        <DataGrid className="dark:text-white"
                                  rows={items}
                                  columns={columns}
                                  experimentalFeatures={{newEditingApi: true}}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollectionPage;