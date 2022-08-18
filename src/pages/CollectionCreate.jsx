import React, { useState } from 'react';
import {useDispatch} from "react-redux";
import {createCollection} from "../redux/features/collection/collectionSlice";
import {useNavigate} from "react-router-dom";

const CollectionCreate = () => {
    const [title, setTitle] = useState('')
    const [theme, setTheme] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const sumbitHandle = () => {
        try{
            const data = new FormData()
            data.append('title', title)
            data.append('theme', theme)
            data.append('description', description)
            data.append('image', image)
            dispatch(createCollection(data))
            navigate('/')
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <form className="w-1/3 mx-auto py-10" onSubmit={(e) => e.preventDefault()}>
            <label className='text-gray-300 py-2 bg-gray-600 text-s mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
                Прикрепить изображение
                <input type='file' className='hidden' onChange={(e)=> setImage(e.target.files[0])}/>
            </label>
            <div className='flex object-cover py-2 items-center justify-center'>
                {image &&
                    <img src={URL.createObjectURL(image)} alt={image.name} />
                }
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
                <button onClick={sumbitHandle}
                    className="flex justify-center items-center bg-gray-600 text-s text-white rounded-md py-2 px-4">
                    Добавить пост
                </button>
                <button onClick={() => {navigate('/')}}
                    className="flex justify-center items-center bg-red-400 text-s text-white rounded-md py-2 px-4">Отменить</button>
            </div>
        </form>
    );
};

export default CollectionCreate;