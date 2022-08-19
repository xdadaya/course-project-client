import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import axios from "../utils/axios";
import {updateCollection} from "../redux/features/collection/collectionSlice";
import MDEditor from '@uiw/react-md-editor';
import {ThemeContext} from "../components/ThemeContext";

const CollectionEdit = () => {
    const { theme, setTheme } = React.useContext(ThemeContext);
    const [title, setTitle] = useState('')
    const [textTheme, setTextTheme] = useState('')
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
        setTextTheme(data.theme)
        setOldImage(data.imgUrl)
    }, [params.id])

    useEffect(() => {
        fetchCollection()
    }, [fetchCollection])

    const submitHandler = () => {
        try {
            const data = new FormData()
            data.append('title', title)
            data.append('theme', textTheme)
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
        <div className="flex items-center justify-center max-w-[400px]" data-color-mode={theme}>
            <form className="mx-auto py-10" onSubmit={(e) => e.preventDefault()}>
                <label
                    className='dark:text-gray-300 py-2 bg-gray-300 dark:bg-gray-800  text-s mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
                    Прикрепить изображение
                    <input type='file' className='hidden' onChange={(e) => {
                        setNewImage(e.target.files[0])
                        setOldImage('')
                    }}/>
                </label>
                <div className='flex object-cover py-2 items-center justify-center'>
                    {oldImage &&
                        <img src={`http://localhost:5000/${oldImage}`} alt={oldImage.name}/>
                    }
                    {newImage && (
                        <img
                            src={URL.createObjectURL(newImage)}
                            alt={newImage.name}
                        />
                    )}
                </div>

                <label className='text-s text-gray-400 '>
                    Название коллекции:
                    <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}
                           className='mt-1 text-s text-black w-full rounded-lg bg-gray-300 dark:bg-gray-800 dark:text-white border-1 py-1 px-2 outline-none'/>
                </label>

                <label className='text-s text-gray-400'>
                    Тема коллекции:
                    <input type='text' value={textTheme} onChange={(e) => setTextTheme(e.target.value)}
                           className='mt-1 text-s text-black w-full rounded-lg bg-gray-300 dark:bg-gray-800 dark:text-white border-1 py-1 px-2 outline-none'/>
                </label>

                <label className='text-s text-gray-400'>
                    Описание коллекции:
                    <MDEditor
                        value={description}
                        onChange={setDescription}
                    />

                </label>

                <div className="flex gap-8 items-center justify-center mt-4 py-2">
                    <button onClick={submitHandler}
                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        Save changes
                    </button>
                    <button onClick={() => {navigate(`/collection/${params.id}`)}}
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        Return
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CollectionEdit;