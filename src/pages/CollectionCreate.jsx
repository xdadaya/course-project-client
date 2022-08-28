import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {createCollection} from "../redux/features/collection/collectionSlice";
import {useNavigate} from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import {ThemeContext} from "../components/ThemeContext";
import axios from "../utils/axios";
import Select from 'react-select';
import {useTranslation} from "react-i18next";

const CollectionCreate = () => {
    const { theme } = React.useContext(ThemeContext);
    const [title, setTitle] = useState('')
    const [textTheme, setTextTheme] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
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


    const submitHandler = () => {
        try {
            const data = new FormData()
            data.append('title', title)
            data.append('theme', textTheme.value)
            data.append('description', description)
            data.append('image', image)
            dispatch(createCollection(data))
            navigate('/')
        } catch (e) {
            console.log(e)
        }
    }

    function dragOverHandler(ev) {
        ev.preventDefault();
    }

    function dropHandler(ev) {
        console.log('File(s) dropped');
        ev.preventDefault();
        if (ev.dataTransfer.items) {
            [...ev.dataTransfer.items].forEach((item, i) => {
                if (item.kind === 'file') {
                    const file = item.getAsFile();
                    console.log(`… file[${i}].name = ${file.name}`);
                    setImage(file)
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
                                        className="font-semibold">{t("collectionCreatePage.picUpload1")}</span> {t("collectionCreatePage.picUpload2")}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{t("collectionCreatePage.picUpload3")}</p>
                                </div>
                                <input id="dropzone-file" type="file" onChange={(e) => setImage(e.target.files[0])}
                                       className="hidden"/>
                            </label>
                        </div>
                    </div>
                    {image &&
                        <div className='w-full flex object-cover py-2 items-center justify-center'>
                            <img src={URL.createObjectURL(image)} alt={image.name}/>
                        </div>
                    }
                </div>

                <label className='text-s text-gray-400'>
                    {t("collectionCreatePage.collectionName")}
                    <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}
                           className='mt-1 text-black w-full rounded-lg dark:bg-gray-800 dark:text-white border-1  px-2 outline-none'/>
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

                <div className="flex gap-8 items-center justify-center mt-4">

                    <button type="button" onClick={submitHandler}
                            className="w-full   text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {t("collectionCreatePage.collectionCreate")}
                        <svg aria-hidden="true" className="-mr-1 w-5 h-5 al ml-auto" fill="currentColor"
                             viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CollectionCreate;