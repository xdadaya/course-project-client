import React from 'react';

const Tag = ({tag}) => {
    return (
        <div className='flex py-0.5 px-2 bg-gray-200 text-black dark:bg-gray-800 dark:text-white mx-2 my-2'>
            {tag.title}
        </div>
    );
};

export default Tag;