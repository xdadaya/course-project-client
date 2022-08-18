import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import axios from "../utils/axios";
import {updateCollection} from "../redux/features/collection/collectionSlice";

const CollectionEdit = () => {
    const [title, setTitle] = useState('')
    const [theme, setTheme] = useState('')
    const [description, setDescription] = useState('')
    const [oldImage, setOldImage] = useState('')
    const [newImage, setNewImage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const fetchCollection = useCallback(async () => {
        const {data} = await axios.get(`/collection/${params.id}`)
        setTitle(data.title)
        setDescription(data.description)
        setTheme(data.theme)
        setOldImage(data.imgUrl)
    }, [params.id])

    useEffect(() => {
        fetchCollection()
    }, [fetchCollection])

    const submitHandler = () => {
        try{
            const data = new FormData()
            data.append('title', title)
            data.append('theme', theme)
            data.append('description', description)
            data.append('image', newImage)
            data.append('id', params.id)
            dispatch(updateCollection(data))
            navigate('/')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form className="w-1/3 mx-auto py-10" onSubmit={(e) => e.preventDefault()}>
            <label className='text-gray-300 py-2 bg-gray-600 text-s mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
                Прикрепить изображение
                <input type='file' className='hidden' onChange={(e)=> {
                    setNewImage(e.target.files[0])
                    setOldImage('')
                }}/>
            </label>
            <div className='flex object-cover py-2 items-center justify-center'>
                {oldImage &&
                    <img src={`http://localhost:5000/${oldImage}`} alt={oldImage.name} />
                }
                {newImage && (
                    <img
                        src={URL.createObjectURL(newImage)}
                        alt={newImage.name}
                    />
                )}
            </div>

            <label className='text-s text-gray-400'>
                Название коллекции:
                <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}
                       className='mt-1 text-s text-black w-full rounded-lg bg-gray-400 border-1 py-1 px-2 outline-none'/>
            </label>

            <label className='text-s text-gray-400'>
                Тема коллекции:
                <input type='text' value={theme} onChange={(e) => setTheme(e.target.value)}
                       className='mt-1 text-s text-black w-full rounded-lg bg-gray-400 border-1 py-1 px-2 outline-none'/>
            </label>

            <label className='text-s text-gray-400'>
                Описание коллекции:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                          className='mt-1 text-s text-black w-full rounded-lg bg-gray-400 border-1 py-1 px-2 outline-none resize-none h-40'/>
            </label>

            <div className="flex gap-8 items-center justify-center mt-4">
                <button onClick={submitHandler}
                        className="flex justify-center items-center bg-gray-600 text-s text-white rounded-md py-2 px-4">
                    Изменить пост
                </button>
                <button onClick={() => {navigate(`/collection/${params.id}`)}}
                        className="flex justify-center items-center bg-red-400 text-s text-white rounded-md py-2 px-4">Отменить</button>
            </div>
        </form>
    );
};

export default CollectionEdit;