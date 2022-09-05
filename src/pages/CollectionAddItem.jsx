import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import axios from "../utils/axios";
import {createItemInCollection} from "../redux/features/item/itemSlice";
import CreatableSelect from 'react-select/creatable';
import AdditionalFieldInput from "../components/AdditionalFieldInput";
import {ThemeContext} from "../components/ThemeContext";

const CollectionAddItem = () => {
    const {theme} = React.useContext(ThemeContext);
    const [collection, setCollection] = useState([])
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState('')
    const [usedTags, setUsedTags] = useState('')
    const [addFields, setAddFields] = useState([])
    const {user} = useSelector(state => state.auth)
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {t} = useTranslation()

    const bg = (theme === 'light') ? 'white' : 'rgb(31 41 55)'
    const fontColor = (theme === 'light') ? 'black' : 'white'

    const fetchCollection = useCallback(async () => {
        const {data} = await axios.get(`/collection/${params.id}`)
        setCollection(data)
    }, [params.id])

    const fetchTags = async () => {
        const {data} = await axios.get('/tag/')
        setTags(data)
    }

    const fetchAdditionalFields = async () => {
        const {data} = await axios.get(`/addfields/additem/${params.id}`)
        setAddFields(data)
    }

    useEffect(() => {
        fetchCollection()
        fetchTags()
        fetchAdditionalFields()
    }, [fetchCollection])

    if (!(user?._id === collection.author || user?.isAdmin)) {
        return (
            <div className='text-xl text-center text-black dark:text-white py-10'>
                {t("addItemPage.notOwner")}
            </div>
        )
    }

    const submitHandler = () => {
        try {
            let addValues = []
            for (let i = 0; i < addFields.length; i++) {
                const element = document.getElementById(addFields[i]._id)
                if (element.type === 'checkbox') addValues.push({
                    inputValue: document.getElementById(addFields[i]._id).checked,
                    additionalFieldId: addFields[i]._id
                })
                else addValues.push({
                    inputValue: document.getElementById(addFields[i]._id).value,
                    additionalFieldId: addFields[i]._id
                })
            }
            const addValues2 = JSON.stringify({customValues: addValues})
            const data = new FormData()
            data.append('title', title)
            const temp = (usedTags.length !== 0) ? usedTags.map(({label}) => (label)) : []
            data.append('tags', temp)
            data.append('collectionId', params.id)
            data.append('additionalValues', addValues2)
            dispatch(createItemInCollection(data))
            navigate(`/collection/${params.id}`)
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className='max-w-lg mx-auto py-4 px-2'>
            <form className='' onSubmit={(e) => e.preventDefault()}>
                <div className="mb-6">
                    <label htmlFor="title"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t("addItemPage.title")}</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}
                           maxLength='32'
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder={t("addItemPage.titlePlace")} required/>
                </div>
                <div className="mb-6">
                    <label htmlFor="tags"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t("addItemPage.tags")}</label>
                    <CreatableSelect id="tags"
                        isMulti
                        value={usedTags}
                        onChange={setUsedTags}
                        options={tags}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                neutral0: bg,
                                neutral50: bg
                                }
                        })}
                    />
                </div>

                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t("collectionCreatePage.additionalFields")}</p>
                {addFields?.map((addField, index) => (
                    <AdditionalFieldInput key={index} addField={addField}/>
                ))}

                <button type="submit" onClick={submitHandler} disabled={!(title.length > 0 && usedTags.length > 0)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {t("addItemPage.create")}
                </button>
            </form>
        </div>
    );
};

export default CollectionAddItem;