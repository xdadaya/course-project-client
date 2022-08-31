import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllCollections} from "../redux/features/collection/collectionSlice";
import CollectionInTop from "../components/CollectionInTop";
import {TagCloud} from 'react-tagcloud'
import {toast} from "react-toastify";
import BCollection from "../components/BCollection";
import {useTranslation} from "react-i18next";
import axios from "../utils/axios";
import LastItem from "../components/LastItem";
import {useNavigate} from "react-router-dom";
import Loading from "../components/Loading";

const MainPage = () => {
    const dispatch = useDispatch()
    const {collections, fiveBiggestCollection} = useSelector(state => state.collection)
    const [data, setData] = useState([])
    const [lastItems, setLastItems] = useState([])
    const {t} = useTranslation()
    const navigate = useNavigate()

    const fetchTags = async () => {
        const {data} = await axios.get('/tag/main/')
        setData(data)
    }

    const fetchLastItems = async () => {
        const {data} = await axios.get('/item/')
        setLastItems(data)
    }

    useEffect(() => {
        dispatch(getAllCollections())
        fetchTags()
        fetchLastItems()
    }, [dispatch])

    if (collections.length === 0) {
        return (
            <Loading />
        )
    }


    return (
        <div className='flex-nowrap md:flex-wrap md:flex px-2 py-5'>
            <div className='max-w-sm md:w-full mx-auto text-black dark:text-white text-lg text-center'>
                <div className='mb-5'>
                    {fiveBiggestCollection.length} {t("mainPage.biggest")}
                    {fiveBiggestCollection?.map((collection, index) => (
                        <CollectionInTop key={index} collection={collection} isVertical={true}/>
                    ))}
                </div>
                <div className='mb-5'>
                    {t("mainPage.tagCloud")}
                <TagCloud
                    minSize={20}
                    maxSize={30}
                    tags={data}
                    onClick={tag => navigate(`/search/${tag.value}`)}
                />
                </div>
                <div className='mb-5'>
                    {lastItems.length} {t("mainPage.lastItems")}
                    {lastItems?.map((item, index) => (
                        <LastItem key={index} item={item}/>
                    ))}
                </div>
            </div>
            <div className='sm:w-full'>
                <div className="bcontainer bcontainer_width_1400">
                    <div className="stories-block  stories-block__4x">
                        {collections?.map((collection, index) => (
                            <BCollection key={index} collection={collection} isVertical={true}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;