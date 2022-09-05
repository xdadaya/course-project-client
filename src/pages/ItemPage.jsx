import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import axios from "../utils/axios";
import {createComment, getCommentByItemId} from "../redux/features/comments/commentSlice";
import Comment from "../components/Comment";
import Tag from "../components/Tag";
import Loading from "../components/Loading";

const ItemPage = () => {
    const [item, setItem] = useState([])
    const [text, setText] = useState('')
    const [tags, setTags] = useState([])
    const [additionalValues, setAdditionalValuess] = useState([])
    const {comments} = useSelector(state => state.comment)
    const {user} = useSelector(state => state.auth)
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {t} = useTranslation()
    const [itemExists, setItemExists] = useState(true)

    const fetchItem = useCallback(async()=>{
        const {data} = await axios.get(`/item/page/${params.id}`)
        setItemExists(!(Boolean(data.message)))
        setItem(data.item)
    }, [params.id])

    const fetchTags = useCallback(async()=>{
        const {data} = await axios.get(`/tag/${params.id}`)
        setTags(data)
    }, [params.id])

    const fetchAdditionalValues = useCallback(async()=>{
        const {data} = await axios.get(`/addvalue/${params.id}`)
        setAdditionalValuess(data)
    }, [params.id])

    useEffect( () => {
        fetchItem()
        fetchTags()
        fetchAdditionalValues()
        dispatch(getCommentByItemId(params.id))
    }, [fetchItem, fetchTags, fetchAdditionalValues])

    useEffect(()=>{
        const interval = setInterval(() => {
            dispatch(getCommentByItemId(params.id))
        }, 2000)
        return () => clearInterval(interval)
    }, [params.id])

    const createCommentHandler = () => {
        try{
            const data = new FormData()
            data.append('text', text)
            data.append('id', params.id)
            dispatch(createComment(data))
            setText('')
        } catch (e) {
            console.log(e)
        }
    }

    if (!item) {
        if (!itemExists) {
            return (
                <h1 className='text-xl text-center dark:text-white py-10 mx-auto'> No item with that id</h1>
            )
        }
        return (
            <Loading/>
        )
    }

    return (
        <div className="text-black dark:text-white flex-nowrap mx-auto sm:flex-wrap sm:flex px-2 py-5">
            <div className="md:w-full text-lg mx-auto my-2">
                <Link to={`/collection/${item.collectionId}`}>
                    <button type="button"
                            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        {t("toCollection")}
                    </button>
                </Link>
                <div>
                    {t("addItemPage.title")}: {item.title} <br/>
                </div>

                <div className='mt-2 flex flex-wrap align-start'>
                    {t("addItemPage.tags")}:
                    {tags?.map((tag, index) => (
                        <Tag key={index} tag={tag}/>
                    ))}
                </div>

                {additionalValues?.map((addValue, index) => (
                    <p key={index}> {addValue.inputName}: {addValue.inputValue} </p>
                ))}
            </div>
            <div className=" md:w-full text-lg mx-auto mt-2">
                <div className='w-full flex gap-4 justify-between items-center'>
                    <textarea rows="3" value={text} onChange={e => setText(e.target.value)} maxLength={256}
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder={t("addItemPage.createComment")}/>
                    <button type="button" onClick={createCommentHandler} disabled={text.length===0}
                            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        {t("addItemPage.btnComment")}
                    </button>
                </div>
                <div className='w-full gap-4 justify-between items-center mt-2'>
                    {comments?.map((comment, index) => (
                        <Comment key={index} comment={comment} />
                    ))}
                </div>
            </div>
        </div>

    );
};

export default ItemPage;