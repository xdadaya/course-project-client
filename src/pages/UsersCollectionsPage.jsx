import React, {useEffect, useState} from 'react';
import axios from "../utils/axios";
import BCollection from "../components/BCollection";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

const UsersCollectionsPage = () => {
    const [collections, setCollections] = useState([])
    const {user} = useSelector(state => state.auth)
    const {t} = useTranslation()
    const fetchUsersCollections = async () => {
        if (user) {
            try {
                const {data} = await axios.get('/collection/user-posts')
                setCollections(data.list)
            } catch (e) {
                console.log(e)
            }
        }
    }

    useEffect(() => {
        fetchUsersCollections()
    }, [])

    if (!user) {
        return (
            <div className='text-xl text-center text-black dark:text-white py-10'>
                {t("authorizedUserOnly")}
            </div>
        )
    }

    if (collections.length === 0) {
        return (
            <h1 className='text-center dark:text-white py-5'> You haven't created collection yet. <br/>
                Wanna <a href='/create-collection' className='text-blue'> create </a> it?
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