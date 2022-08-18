import React, {useEffect, useState} from 'react';
import axios from "../utils/axios";
import Collection from "../components/Collection";
const UsersCollectionsPage = () => {
    const [collections, setCollections] = useState([])

    const fetchUsersCollections = async () => {
        try{
            const { data } = await axios.get('/collection/user-posts')
            console.log(data.list)
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
            <h1 className='text-center'> No collections.</h1>
        )
    }

    return (
        <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
            {collections?.map((collection, index) => (
                <Collection key={index} collection={collection}/>
            ))}
        </div>
    );
};

export default UsersCollectionsPage;