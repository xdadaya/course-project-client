import React, {useEffect} from 'react';
import Collection from "../components/Collection";
import {useDispatch, useSelector} from "react-redux";
import {getAllCollections} from "../redux/features/collection/collectionSlice";
import CollectionInTop from "../components/CollectionInTop";
import {TagCloud} from 'react-tagcloud'
import {toast} from "react-toastify";
import BCollection from "../components/BCollection";

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
        <div className="bcontainer bcontainer_width_1400 mt-5">
            <div className="stories-block  stories-block__4x">
                {collections?.map((collection, index) => (
                    <BCollection key={index} collection={collection} isVertical={true}/>
                ))}
            </div>
        </div>
    );
};

export default MainPage;

/*
<div className={"mt-10"}>
            <div className="stories-block w-1/2 m-auto">
                <BCollection collection={{title: "123", theme:"123", description: "dsadasdfasdf afsd fas dfasd aasdf af ad fadfsdf ads asdfas fadsfasdas"}} isVertical={false}/>
            </div>
            <div className="stories-block  stories-block__4x">
                <BCollection collection={{title: "123", theme:"123", description: "dsadas"}} isVertical={false}/>
                <BCollection collection={{title: "123", theme:"123", description: "dsadas"}} isVertical={false}/>
                <BCollection collection={{title: "123", theme:"123", description: "dsadas"}} isVertical={false}/>
            </div>


            <div className="stories-block stories-block__4x">
                <div className="stories-block__header">
                    <h1><a href="/notes/">📚Книги</a></h1>
                    <h2>О книгах и не только</h2>
                </div>
                <div className="bcontainer bcontainer_width_1400 mt-5">
                    <div className="stories-block  stories-block__4x">
                        {collections?.map((collection, index) => (
                            <BCollection key={index} collection={collection} isVertical={true}/>

                        ))}
                    </div>
                </div>
            </div>
        </div>
 */