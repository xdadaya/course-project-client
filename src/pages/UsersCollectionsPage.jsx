import React, {useEffect, useState, useCallback} from 'react';
import axios from "../utils/axios";
import BCollection from "../components/BCollection";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

const UsersCollectionsPage = () => {
    const [collections, setCollections] = useState([])
    const {user} = useSelector(state => state.auth)
    const {t} = useTranslation()

    const fetchUsersCollections = useCallback(async () => {
        const {data} = await axios.get('/collection/user-posts')
        setCollections(data.list)
    }, [])

    useEffect(() => {
        fetchUsersCollections()
    }, [fetchUsersCollections])

    if (!user) {
        return (
            <div className='text-xl text-center text-black dark:text-white py-10'>
                {t("authorizedUserOnly")}
            </div>
        )
    }

    if (collections.length === 0) {
        return (
            <div className='text-xl text-center text-black dark:text-white py-10'>
                No collections
            </div>
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