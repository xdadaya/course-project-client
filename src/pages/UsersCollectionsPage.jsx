import React, {useEffect, useState} from 'react';
import axios from "../utils/axios";
import BCollection from "../components/BCollection";

const UsersCollectionsPage = () => {
    const [collections, setCollections] = useState([])
    const fetchUsersCollections = async () => {
        try{
            const { data } = await axios.get('/collection/user-posts')
            setCollections(data.list)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(()=>{
        fetchUsersCollections()
    }, [])

    if(collections.length === 0){
        return (
            <h1 className='text-center dark:text-white py-5'> You haven't created collection yet. <br/>
                Wanna <a href='/create-collection'> create </a> it?
            </h1>
        )
    }

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

export default UsersCollectionsPage;