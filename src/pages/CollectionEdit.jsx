import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import axios from "../utils/axios";
import {updateCollection} from "../redux/features/collection/collectionSlice";
import MDEditor from '@uiw/react-md-editor';
import {ThemeContext} from "../components/ThemeContext";
import Select from "react-select";
import {useTranslation} from "react-i18next";

const CollectionEdit = () => {
    const { theme, setTheme } = React.useContext(ThemeContext);
    const [title, setTitle] = useState('')
    const [textTheme, setTextTheme] = useState('')
    const [description, setDescription] = useState('')
    const [oldImage, setOldImage] = useState('')
    const [newImage, setNewImage] = useState('')
    const bg = (theme === 'light') ? 'white' : 'rgb(31 41 55)'
    const fontColor = (theme === 'light') ? 'black' : 'white'
    const [themes, setThemes] = useState([])
    const {t} = useTranslation()

    const fetchThemes = async () => {
        const {data} = await axios.get('/themes')
        setThemes(data.Themes)
    }

    useEffect(() => {
        fetchThemes()
    }, [])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const fetchCollection = useCallback(async () => {
        const {data} = await axios.get(`/collection/${params.id}`)
        setTitle(data.title)
        setDescription(data.description)
        setTextTheme({value: data.theme, label: data.theme})
        setOldImage(data.imgUrl)
    }, [params.id])

    useEffect(() => {
        fetchCollection()
    }, [fetchCollection])

    const submitHandler = () => {
        try {
            const data = new FormData()
            data.append('title', title)
            data.append('theme', textTheme.value)
            data.append('description', description)
            data.append('image', newImage)
            data.append('id', params.id)
            dispatch(updateCollection(data))
            navigate('/')
        } catch (e) {
            console.log(e)
        }
    }

    function dragOverHandler(ev) {
        ev.preventDefault();
    }

    function dropHandler(ev) {
        ev.preventDefault()
        if (ev.dataTransfer.items) {
            [...ev.dataTransfer.items].forEach((item, i) => {
                if (item.kind === 'file') {
                    const file = item.getAsFile();
                    console.log(`… file[${i}].name = ${file.name}`);
                    setNewImage(file)
                }
            });
        } else {
            [...ev.dataTransfer.files].forEach((file, i) => {
                console.log(`… file[${i}].name = ${file.name}`);
            });
        }
    }

    return (
        <div className="flex items-center justify-center" data-color-mode={theme}>
            <form className="mx-auto py-10 px-2" onSubmit={(e) => e.preventDefault()}>
                <div className="align-center mb-5">
                    <div className="w-full">
                        <div className="flex justify-center items-center w-full" onDragOver={dragOverHandler}
                             onDrop={dropHandler}>
                            <label htmlFor="dropzone-file"
                                   className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                    <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none"
                                         stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                        className="font-semibold">{t("collectionCreatePage.picUpload1")}</span>{t("collectionCreatePage.picUpload2")}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{t("collectionCreatePage.picUpload3")}</p>
                                </div>
                                <input id="dropzone-file" type="file" onChange={(e) => {
                                    setNewImage(e.target.files[0])
                                    setOldImage('')
                                }} className="hidden"/>
                            </label>
                        </div>
                    </div>
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
                </div>


                <label className='text-s text-gray-400 '>
                    {t("collectionCreatePage.collectionName")}
                    <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}
                           className='mt-1 text-s text-black w-full rounded-lg bg-gray-300 dark:bg-gray-800 dark:text-white border-1 py-1 px-2 outline-none'/>
                </label>

                <label className='text-s text-gray-400'>
                    {t("collectionCreatePage.collectionTheme")}
                    <Select
                        className='mt-1 text-s w-full py-1'
                        value={textTheme}
                        onChange={setTextTheme}
                        options={themes}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                neutral0: bg,
                                neutral50: bg,
                                neutral80: fontColor
                            }
                        })}
                    />
                </label>

                <label className='text-s text-gray-400'>
                    {t("collectionCreatePage.collectionDescription")}
                    <MDEditor
                        value={description}
                        onChange={setDescription}
                    />

                </label>

                <div className="flex gap-8 items-center justify-center mt-4 py-2">
                    <button onClick={submitHandler}
                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        {t("save")}
                    </button>
                    <button onClick={() => {navigate(`/collection/${params.id}`)}}
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        {t("return")}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CollectionEdit;