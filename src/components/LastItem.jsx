import React from 'react';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const LastItem = ({item}) => {
    const {t} = useTranslation()
    return (
        <div className='text-gray-600 bg-gray-200 my-1 px-2 dark:bg-gray-800 dark:text-white hover:scale-105'>
            <Link to={`item/${item._id}`} className='flex text-s p-2'>
                {item.title} {t("fromCollection")} {item.collectionName}.
            </Link>
        </div>
    );
};

export default LastItem;