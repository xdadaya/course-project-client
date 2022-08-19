import React from 'react'
import Moment from 'react-moment'
import MDEditor from "@uiw/react-md-editor";
import {ThemeContext} from "./ThemeContext";

const Collection = ({collection}) => {
    const { theme, setTheme } = React.useContext(ThemeContext);

    if (!collection) {
        return (
            <div className='text-xl text-center text-black py-10'>
                Загрузка...
            </div>
        )
    }
    const imgUrl = (collection.imgUrl) ? `http://192.168.31.20:5000/${collection.imgUrl}` : `http://192.168.31.20:5000/default.jfif`
    return (
        <div data-color-mode={theme} className="hover:scale-105 max-w-[400px]">
            <a href={`/collection/${collection._id}`}
               className="flex flex-col items-center bg-white rounded-lg border shadow-md  md:max-w-xl hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-900 p-2">
                <img className="object-cover w-full h-96 rounded-lg md:h-auto w-48"
                     src={imgUrl} alt="img"/>
                <div className="flex flex-col justify-between p-4 leading-normal w-full">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{collection.title}</h5>
                    <div className="flex justify-between w-full">
                        <div className="text-s opacity-50">{collection.username}</div>
                        <div className="text-s opacity-50">
                            <Moment date={collection.createdAt} format='D MMM YYYY'/>
                        </div>
                        <div className="text-s opacity-50">{collection.theme}</div>
                    </div>
                    <MDEditor.Markdown source={collection.description}/>
                </div>
            </a>
        </div>
    );
};
export default Collection;

// <Link to=>
//     <div className="flex flex-col basis-1/4 bg-gray-200 p-1 rounded-md hover:scale-105 shadow-2xl text-black
//             dark:bg-gray-800 dark:text-white">
//         <div className={collection.imgUrl ? 'flex rounded-lg h-80' : 'flex rounded-lg'}>
//             {collection.imgUrl && (
//                 <img src={`http://192.168.31.20:5000/${collection.imgUrl}`}
//                      alt='img' className='object-cover w-full'/>
//             )}
//             {!collection.imgUrl && (
//                 <img src={`http://192.168.31.20:5000/default.jfif`}
//                      alt='img' className='object-cover w-full'/>
//             )}
//         </div>
//         <div className="flex justify-center gap-8 items-center pt-2">
//             <div className="text-s opacity-50">{collection.username}</div>
//             <div className="text-s opacity-50">
//                 <Moment date={collection.createdAt} format='D MMM YYYY'/>
//             </div>
//             <div className="text-s opacity-50">{collection.theme}</div>
//         </div>
//         <div className="text-xl">{collection.title}</div>
//         <div className="text-s opacity-60 pt-4"></div>
//     </div>
// </Link>