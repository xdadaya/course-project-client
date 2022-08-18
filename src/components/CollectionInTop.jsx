import React from 'react';
import {Link} from "react-router-dom";

const CollectionInTop = ({ collection }) => {
    return (
        <div className='bg-gray-600 my-1 px-2 hover:bg-gray-800 hover:scale-105'>
            <Link to={`collection/${collection._id}`}
                className='flex text-s p-2 text-gray-300  hover:text-white'>
                {collection.title} with {collection.items.length} items.
            </Link>
        </div>
    );
};

export default CollectionInTop;