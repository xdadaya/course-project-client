import React from 'react';
import Moment from "react-moment";

const Comment = ({comment}) => {
    return (
        <div className='w-full p-2 mt-2 mb-2 border-2 text-black dark:text-gray-300 dark:bg-gray-600 rounded-md'>
            <div className='justify-between items-center w-full flex text-2xl'>
                {comment.username}
                <Moment locale={window.localStorage.getItem('i18nextLng')} fromNow>{comment.createdAt}</Moment>
            </div>
            <div>{comment.text}</div>
        </div>
    );
};

export default Comment;