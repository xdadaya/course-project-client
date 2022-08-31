import React from 'react';
import Moment from "react-moment";
import {useNavigate} from "react-router-dom";

const ItemSearch = ({item}) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/item/${item._id}`)}
             className='flex px-3 py-2 w-full bg-gray-200 dark:bg-gray-800 hover:scale-105 mb-2 dark:text-white rounded-lg justify-between'>
            <div>{item.title}</div>
            <div>{item.collectionName}</div>
            <div><Moment date={item.createdAt} format='D MMM YYYY' locale={window.localStorage.getItem('i18nextLng')}/></div>
        </div>
    );
};

export default ItemSearch;