import React, {useEffect, useState, useCallback} from 'react';
import {useParams} from "react-router-dom";
import axios from "../utils/axios";
import {useTranslation} from "react-i18next";
import ItemSearch from "../components/ItemSearch";
import Loading from "../components/Loading";

const SearchPage = () => {
    const params = useParams()
    const [items, setItems] = useState([])
    const {t} = useTranslation()

    const fetchItems = useCallback(async() => {
        const {data} = await axios.get(`/search/${params.query}`)
        setItems(data)
    }, [params.query])

    useEffect(() => {
        fetchItems()
    }, [fetchItems])

    if(!items){
        console.log('asd')
        return(
            <Loading/>
        )
    }

    return (
        <div className='mx-auto px-3 py-3'>
            <h1 className='text-center dark:text-white text-2xl'>{t('search.found')} {items.length} {t('search.items')} {t('search.onRequest')} '{params.query}'</h1>

            {items?.map((item, index) => (
                <ItemSearch key={index} item={item}/>
            ))}
        </div>
    );
};

export default SearchPage;