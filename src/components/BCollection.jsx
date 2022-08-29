import React from 'react'
import Moment from 'react-moment'
import {ThemeContext} from "./ThemeContext";
import {Link} from "react-router-dom";
import {API_URL} from "../config";

const getBackgroundColor = () => {
    const backgroundColors = ['#475c6c', '#8a8583', '#eed7a1', '#f7efd2', '#cd8b62']
    const random = Math.floor(Math.random() * backgroundColors.length);
    return backgroundColors[random];
}

const BCollection = ({collection, isVertical}) => {
    if (!collection) {
        return (<div className='text-xl text-center text-black py-10 dark:text-white'>
            Загрузка...
        </div>)
    }

    const backgroundStyle = (collection.imgUrl) ? {backgroundImage: `url('${API_URL}${collection.imgUrl}')`} : {backgroundColor: getBackgroundColor()}
    return (
        <Link to={`/collection/${collection._id}`}>
            <div style={backgroundStyle}
                  className={isVertical ? 'story story h-entry story_orientation_vertical': 'story story h-entry story_orientation_horizontal'}>

                <span className={isVertical ? 'ratio-2-3' : 'ratio-3-2'}></span>
                <span className="story__views">{collection.theme}</span>
                <span className="story__info">
                    <span className="story__title p-name">
                        {collection.title}</span>
                    <div className="clearfix10"></div>
                    <span className="story__subtitle p-summary"><Moment date={collection.createdAt} format='D MMM YYYY' locale={window.localStorage.getItem('i18nextLng')}/></span>
                </span>
            </div>
        </Link>);
};
export default BCollection;