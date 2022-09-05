import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import axios from "../utils/axios";
import {updateItem} from "../redux/features/item/itemSlice";
import CreatableSelect from 'react-select/creatable';
import AdditionalFieldInput from "../components/AdditionalFieldInput";

const ItemEditPage = () => {
    const [item, setItem] = useState('')
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState([])
    const [usedTags, setUsedTags] = useState('')
    const [addFields, setAddFields] = useState([])
    const {user} = useSelector(state => state.auth)
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {t} = useTranslation()

    const fetchItem = useCallback(async () => {
        const {data} = await axios.get(`/item/page/${params.id}`)
        setItem(data.item)
        setTitle(data.item.title)
        setUsedTags(data.tags)
    }, [params.id])

    const fetchTags = async () => {
        const {data} = await axios.get('/tag/')
        setTags(data)
    }

    const fetchAdditionalFields = async () => {
        const {data} = await axios.get(`/addfields/item/${params.id}`)
        setAddFields(data)
    }

    useEffect(() => {
        fetchItem()
        fetchTags()
        fetchAdditionalFields()
    }, [fetchItem])

    const submitHandler = () => {
        try {
            let addValues = []
            for(let i = 0; i<addFields.length; i++){
                const element = document.getElementById(addFields[i]._id)
                if(element.type === 'checkbox') addValues.push({inputValue: document.getElementById(addFields[i]._id).checked, additionalFieldId: addFields[i]._id, itemId: params.id})
                else addValues.push({inputValue: document.getElementById(addFields[i]._id).value, additionalFieldId: addFields[i]._id, itemId: params.id})
            }
            const addValues2 = JSON.stringify({customValues: addValues})
            const data = new FormData()
            data.append('title', title)
            const temp = (usedTags.length!== 0) ? usedTags.map(({label}) => (label)) : []
            data.append('tags', temp)
            data.append('id', params.id)
            data.append('additionalValues', addValues2)
            dispatch(updateItem(data))
            navigate(`/collection/${item?.collectionId}`)
        } catch (e) {
            console.log(e)
        }
    }

    if(!((user?._id === item.author || user?.isAdmin) && user)){
        return(
            <div className='text-xl text-center text-black dark:text-white py-10'>
                {t("item.notOwner")}
            </div>
        )
    }



    return (
        <div className='max-w-lg mx-auto py-4 px-2'>
            <form className='' onSubmit={(e) => e.preventDefault()}>
                <div className="mb-6">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t("addItemPage.title")}</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength='32'
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder={t("addItemPage.titlePlace")} required/>
                </div>
                <div className="mb-6">
                    <label htmlFor="tags" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t("addItemPage.tags")}</label>
                    <CreatableSelect id="tags"
                        isMulti
                        value={usedTags}
                        onChange={setUsedTags}
                        options={tags}
                    />
                </div>

                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t("collectionCreatePage.additionalFields")}</p>
                {addFields?.map((addField, index) => (
                    <AdditionalFieldInput key={index} addField={addField}/>
                ))}
                <button type="submit" onClick={submitHandler} disabled={!(title.length > 0 && usedTags.length > 0)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {t("addItemPage.edit")}
                </button>
            </form>
        </div>
    );
};

export default ItemEditPage;