import React from 'react'
import Moment from 'react-moment'
import {Link} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

const Collection = ({collection}) => {

    if (!collection) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Загрузка...
            </div>
        )
    }

    return (
        <Link to={`/collection/${collection._id}`}>
            <div className="flex flex-col basis-1/4 bg-gray-600 p-1 rounded-md hover:scale-105 shadow-2xl shadow-cyan-500/50">
                <div className={collection.imgUrl ? 'flex rouded-sm h-80' : 'flex rounded-sm'}>
                    {collection.imgUrl && (
                        <img src={`http://localhost:5000/${collection.imgUrl}`}
                             alt='img' className='object-cover w-full'/>
                    )}
                    {!collection.imgUrl && (
                        <img src={`http://localhost:5000/default.jfif`}
                             alt='img' className='object-cover w-full'/>
                    )}
                </div>
                <div className="flex justify-center gap-8 items-center pt-2">
                    <div className="text-s text-black opacity-50">{collection.username}</div>
                    <div className="text-s text-black opacity-50">
                        <Moment date={collection.createdAt} format='D MMM YYYY'/>
                    </div>
                    <div className="text-s text-black opacity-50">{collection.theme}</div>
                </div>
                <div className="text-white text-xl">{collection.title}</div>
                <div className="text-white text-s opacity-60 pt-4"><ReactMarkdown children={collection.description} remarkPlugins={[remarkGfm]}/></div>

            </div>
        </Link>
    );
};

export default Collection;