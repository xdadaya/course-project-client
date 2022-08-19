import React, {useEffect} from 'react';
import Collection from "../components/Collection";
import {useDispatch, useSelector} from "react-redux";
import {getAllCollections} from "../redux/features/collection/collectionSlice";
import CollectionInTop from "../components/CollectionInTop";
import {TagCloud} from 'react-tagcloud'
import {toast} from "react-toastify";

const MainPage = () => {
    const dispatch = useDispatch()
    const {collections, fiveBiggestCollection} = useSelector(state => state.collection)

    useEffect(() => {
        dispatch(getAllCollections())
    }, [dispatch])

    if (collections.length === 0) {
        return (
            <div className='text-xl text-center text-black py-10'>
                Loading...
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
        <div className='mx-auto max-w-xl px-3'>
            {collections?.map((collection, index) => (
                <Collection key={index} collection={collection}/>
            ))}
        </div>
    );
};

export default MainPage;