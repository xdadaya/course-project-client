import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import axios from "../utils/axios";
import {createItemInCollection} from "../redux/features/item/itemSlice";
import CreatableSelect from 'react-select/creatable';

const ItemEditPage = () => {
    const [item, setItem] = useState('')
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState([])
    const [usedTags, setUsedTags] = useState('')
    const {user} = useSelector(state => state.auth)
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {t} = useTranslation()

    const fetchItem = useCallback(async () => {
        const {data} = await axios.get(`/item/page/${params.id}`)
        setItem(data)
        setTitle(data.title)
    }, [params.id])

    const fetchTags = async () => {
        const {data} = await axios.get('/tag/')
        setTags(data)
    }

    useEffect(() => {
        fetchItem()
        fetchTags()
    }, [fetchItem])

    const submitHandler = () => {
        try {
            const data = new FormData()
            data.append('title', title)
            const temp = (usedTags.length!== 0) ? usedTags.map(({label}) => (label)) : []
            data.append('tags', temp)
            data.append('collectionId', params.id)
            dispatch(createItemInCollection(data))
            navigate(`/collection/${item?.collectionId}`)
        } catch (e) {
            console.log(e)
        }
    }

    if(!(user?._id === item.author || user?.isAdmin)){
        return(
            <div>
                Only for collection owner
            </div>
        )
    }

    return (
        <div className='max-w-lg mx-auto py-4 px-2'>
            <form className='' onSubmit={(e) => e.preventDefault()}>
                <div className="mb-6">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Some title" required/>
                </div>
                <div className="mb-6">
                    <CreatableSelect
                        isMulti
                        value={usedTags}
                        onChange={setUsedTags}
                        options={tags}
                    />
                </div>
                <button type="submit" onClick={submitHandler} disabled={!(title.length > 0 && usedTags.length > 0)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                </button>
            </form>
        </div>
    );
};

export default ItemEditPage;