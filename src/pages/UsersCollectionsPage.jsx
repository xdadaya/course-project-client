import React, {useEffect, useState} from 'react';
import axios from "../utils/axios";
import Collection from "../components/Collection";
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
            <h1 className='text-center dark:text-white py-5'> You haven't created collection yet.</h1>
        )
    }

    return (
        <div className='mx-auto max-w-xl px-3'>
            {collections?.map((collection, index) => (
                <Collection key={index} collection={collection}/>
            ))}
        </div>
    );
};

export default UsersCollectionsPage;