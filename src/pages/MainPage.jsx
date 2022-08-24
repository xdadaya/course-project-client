import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllCollections} from "../redux/features/collection/collectionSlice";
import CollectionInTop from "../components/CollectionInTop";
import {TagCloud} from 'react-tagcloud'
import {toast} from "react-toastify";
import BCollection from "../components/BCollection";
import {useTranslation} from "react-i18next";

const MainPage = () => {
    const dispatch = useDispatch()
    const {collections, fiveBiggestCollection} = useSelector(state => state.collection)
    const [msg, setMsg] = useState('Loading...')
    const {t} = useTranslation()

    useEffect(() => {
        dispatch(getAllCollections())
        if (collections.length === 0) setMsg('No collections')
    }, [dispatch, collections.length])

    if (collections.length === 0) {
        return (
            <div className='text-xl text-center text-black py-10'>
                {msg}
            </div>
        )
    }

    const data = [
        {value: 'JavaScript', count: 38},
        {value: 'React', count: 30},
        {value: 'Nodejs', count: 1},
        {value: 'Express.js', count: 25},
        {value: 'HTML5', count: 33},
        {value: 'MongoDB', count: 18},
        {value: 'CSS3', count: 20},
    ]

    return (
        <div className='flex-nowrap sm:flex-wrap sm:flex px-2 py-5'>
            <div className='max-w-sm sm:w-full mx-auto text-black dark:text-white text-lg text-center '>
                <div className='mb-5'>
                    {fiveBiggestCollection.length} {t("mainPage.biggest")}
                    {fiveBiggestCollection?.map((collection, index) => (
                        <CollectionInTop key={index} collection={collection} isVertical={true}/>
                    ))}
                </div>
                <div className='mb-5'>
                    {t("mainPage.tagCloud")}
                <TagCloud
                    minSize={10}
                    maxSize={30}
                    tags={data}
                    onClick={tag => toast(`'${tag.value}' was selected!`)}
                />
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