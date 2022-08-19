import React from 'react'
import Moment from 'react-moment'
import MDEditor from "@uiw/react-md-editor";
import {ThemeContext} from "./ThemeContext";
import {Link} from "react-router-dom";

const Collection = ({collection}) => {
    const { theme, setTheme } = React.useContext(ThemeContext);

    if (!collection) {
        return (
            <div className='text-xl text-center text-black py-10 dark:text-white'>
                Загрузка...
            </div>
        )
    }
    const imgUrl = (collection.imgUrl) ? `http://192.168.31.20:5000/${collection.imgUrl}` : `http://192.168.31.20:5000/default.jfif`
    return (
        <div data-color-mode={theme} className="mt-4 max-w-xl hover:scale-105">
            <Link to={`/collection/${collection._id}`}
               className="flex flex-col items-center bg-white rounded-lg border shadow-md  md:max-w-xl hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-900 p-2">
                <img className="object-cover w-full h-96 rounded-lg md:h-auto w-48"
                     src={imgUrl} alt="img"/>
                <div className="flex flex-col justify-between p-4 leading-normal w-full dark:text-white">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight">{collection.title}</h5>
                    <div className="flex justify-between w-full">
                        <div className="text-s opacity-50">{collection.username}</div>
                        <div className="text-s opacity-50">
                            <Moment date={collection.createdAt} format='D MMM YYYY'/>
                        </div>
                        <div className="text-s opacity-50">{collection.theme}</div>
                    </div>
                    <MDEditor.Markdown source={collection.description}/>
                </div>
            </Link>
        </div>
    );
};
export default Collection;