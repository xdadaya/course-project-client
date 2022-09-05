import React from 'react';
import {useNavigate} from "react-router-dom";

const Tag = ({tag}) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/search/${tag.title}`)}
            className='flex py-0.5 px-2 bg-gray-200 text-black dark:bg-gray-800 dark:text-white mx-2 my-2 cursor-pointer rounded-sm'>
            {tag.title}
        </div>
    );
};

export default Tag;