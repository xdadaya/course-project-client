import React from 'react';
import {Link} from "react-router-dom";

const CollectionInTop = ({ collection }) => {
    return (
        <div className='text-gray-600 bg-gray-200 my-1 px-2 dark:bg-gray-800 dark:text-white hover:scale-105'>
            <Link to={`collection/${collection._id}`}
                className='flex text-s p-2'>
                {collection.title} with {collection.items.length} items.
            </Link>
        </div>
    );
};

export default CollectionInTop;