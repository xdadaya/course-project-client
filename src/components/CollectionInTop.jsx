import React from 'react';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const CollectionInTop = ({ collection }) => {
    const {t} = useTranslation()
    return (
        <div className='text-gray-600 bg-gray-200 my-1 px-2 dark:bg-gray-800 dark:text-white hover:scale-105 rounded-lg'>
            <Link to={`collection/${collection._id}`}
                className='flex text-s p-2'>
                {collection.title} {t("with")} {collection.items.length} {t("items")}.
            </Link>
        </div>
    );
};

export default CollectionInTop;