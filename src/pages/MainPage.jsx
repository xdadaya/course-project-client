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

    if (!collections.length) {
        return (
            <div className='text-xl text-center text-black py-10'>
                There are no collections.
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
        <div className="max-w-[900px] mx-auto py-10">
            <div className="flex justify-between gap-8">
                <div className="flex flex-col gap-10 bases-4/5">
                    {collections?.map((collection, index) => (
                        <Collection key={index} collection={collection}/>
                    ))}
                </div>
                <div className="max-w-[280px] bases-1/5">
                    <div className='text-lg text-black'>
                        Top {fiveBiggestCollection.length} collections based on items count:
                    </div>
                    {fiveBiggestCollection?.map((collection, index) => (
                        <CollectionInTop key={index} collection={collection}/>
                    ))}
                    <div className='text-lg text-black'>
                        Tag cloud
                        <TagCloud
                            minSize={10}
                            maxSize={30}
                            tags={data}
                            onClick={tag => toast(`'${tag.value}' was selected!`)}
                        />
                    </div>
                    <div className='text-lg text-black'>
                        Last n items:
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MainPage;