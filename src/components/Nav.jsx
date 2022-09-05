import React, {useState} from 'react';
import {Navbar} from "flowbite-react";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAdmin, checkIsAuth, logout} from "../redux/features/auth/authSlice";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import Toggle from "./ThemeToggle";
import {useTranslation} from "react-i18next";

const Nav = () => {
    const isAuth = useSelector(checkIsAuth)
    const isAdmin = useSelector(checkIsAdmin)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {t, i18n} = useTranslation()
    const [searchText, setSearchText] = useState('')

    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    }

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast('Logged out')
        navigate('/')
    }

    const keyDownHandler = (key) => {
        if(key==='Enter') {
            navigate(`/search/${searchText}`)
            setSearchText('')
        }
    }

    return (
        <Navbar>
            <Navbar.Brand>
                <Link to="/" className={"flex align-center"}>
                    <img src="https://hotemoji.com/images/dl/7/memo-emoji-by-twitter.png" className="mr-3 h-6 sm:h-9"
                         alt="Logo"/>
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    I Have It!
                </span>
                </Link>

                <Toggle/>
                <button onClick={() => changeLanguage("en")} hidden={window.localStorage.getItem('i18nextLng')==='en'}><img src='https://cdn-icons-png.flaticon.com/512/197/197484.png' alt='eng' className='w-6 h-6'/></button>
                <button onClick={() => changeLanguage("ru")} hidden={window.localStorage.getItem('i18nextLng')==='ru'}><img src='https://cdn-icons-png.flaticon.com/512/4628/4628645.png' alt='ru' className='w-6 h-6' /></button>
            </Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse>
                <input type="text" value={searchText} onChange={(e)=>setSearchText(e.target.value)} onKeyDown={(e) => keyDownHandler(e.key)} maxLength='64'
                       className="sm:h-6 h-10  text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder={t("navbar.search")}/>

                {isAuth && <Navbar.Link href="/create-collection"> {t("navbar.createCollection")} </Navbar.Link>}
                {isAuth && <Navbar.Link href="/users-collections"> {t("navbar.myCollections")} </Navbar.Link>}
                {isAdmin && <Navbar.Link href="/admin-panel"> {t("navbar.adminPanel")} </Navbar.Link>}
                {!isAuth &&
                    <Navbar.Link href="/login">
                        <button
                            className={"text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-1 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}
                            style={{width: "100%"}}>{t("navbar.login")}
                        </button>
                    </Navbar.Link>
                }
                {isAuth &&
                    <Navbar.Link onClick={logoutHandler} style={{cursor: 'pointer'}}> {t("navbar.logout")} </Navbar.Link>
                }
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Nav;